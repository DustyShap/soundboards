from flask import Flask, render_template, request, jsonify
from flask_uploads import UploadSet, configure_uploads, AUDIO
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import os
import csv
import pytz



app = Flask(__name__)

engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

audio = UploadSet('audio', AUDIO)
app.config['UPLOADED_AUDIO_DEST'] = os.environ['UPLOAD_PATH']
configure_uploads(app, audio)



@app.route('/')
def home():
    return render_template("index.html")


@app.route('/upload', methods=['GET', 'POST'])
def upload():

    filename = audio.save(request.files['audio'])
    speaker = request.form['speaker'].lower().strip()
    tags = request.form['tags'].lower()
    transcription = request.form['transcription'].lower().replace("'", "")

    db.execute("INSERT INTO drops \
    (filename,speaker,tags,transcription)\
    VALUES \
    (:filename,:speaker,:tags,:transcription)",
    {
        "filename":filename,
        "speaker":speaker,
        "tags":tags,
        "transcription":transcription})

    db.commit()


    return jsonify({'file': filename})




@app.route('/process', methods=['POST', 'GET'])
def process():
    search_term = request.form['tags'].lower().strip()
    # This is either the name of the speaker or search_drops
    chosen = request.form['chosen'].lower()

    if chosen == 'search_drops':
        search_method = 'search_value'
        drops = db.execute(
            "SELECT * \
        FROM drops \
        WHERE speaker IS NOT NULL \
        AND tags LIKE :tags",
            {"tags": add_wildcard(search_term)}).fetchall()

        #Inserting search term into the DB for stats
        db.execute("INSERT INTO search_stats\
        (search_string)\
        VALUES\
        (:search_string)",
        {"search_string":search_term})
        db.commit()


    elif chosen == 'last_twenty':
        search_method = 'last_twenty'
        drops = db.execute(
            "SELECT * \
        FROM drops \
        ORDER BY id \
        DESC LIMIT 20").fetchall()

    else:  # if a name was clicked
        search_method = 'name'
        drops = db.execute(
            "SELECT * \
        FROM drops \
        WHERE speaker = :chosen",
            {"chosen": chosen}).fetchall()

    return process_drop_results(drops,search_method)


@app.route("/drop_stats",methods=['POST'])
def drop_stats():
    filename = request.form['filename'].replace(" ", "%20")
    cell_clicked = request.form['cell_clicked']

    drop = db.execute(
     "SELECT id \
      FROM drops \
      WHERE filename = :filename",
      {"filename":filename}).fetchall()

    drop_id = drop[0][0]




    db.execute("INSERT INTO click_stats \
    (drop_id,clicked_from_cell,click_time)\
    VALUES \
    (:drop_id,:clicked_from_cell,now())",
    {
        "drop_id":drop_id,
        "clicked_from_cell":cell_clicked
    })

    db.commit()


    return ('', 204)


def add_wildcard(string):
    return "%" + string + "%"


def process_drop_results(drops,search_method):
    drops_list = []
    search_method = search_method
    for drop in drops:
        drop_as_dict = {
            'filename': drop.filename,
            'speaker': drop.speaker,
            'transcription': drop.transcription.upper()[0:110]
        }
        drops_list.append(drop_as_dict)
    return jsonify({"drops":drops_list,"search_method":search_method})


if __name__ == "__main__":
    app.run()
