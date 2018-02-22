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

    db.execute("INSERT INTO drops (filename,speaker,tags,transcription)\
        VALUES (:filename,:speaker,:tags,:transcription)",
        {"filename":filename,"speaker":speaker,"tags":tags,"transcription":transcription})

    db.commit()
<<<<<<< HEAD
=======

>>>>>>> 27a0edd4942b87c7fe02360efb038a84e6c2aaf1

    return jsonify({'file': filename})




@app.route('/process', methods=['POST', 'GET'])
def process():
    search_term = request.form['tags'].lower().strip()
    # This is either the name of the speaker or search_drops
    chosen = request.form['chosen'].lower()

    if chosen == 'search_drops':
        drops = db.execute(
            "SELECT * \
        FROM drops \
        WHERE speaker IS NOT NULL \
        AND tags LIKE :tags",
            {"tags": add_wildcard(search_term)}).fetchall()

    elif chosen == 'last_twenty':
        drops = db.execute(
            "SELECT * \
        FROM drops \
        ORDER BY id \
        DESC LIMIT 20").fetchall()

    else:  # if a name was clicked
        drops = db.execute(
            "SELECT * \
        FROM drops \
        WHERE speaker = :chosen",
            {"chosen": chosen}).fetchall()

    return jsonify({"drops": process_drop_results(drops)})



<<<<<<< HEAD
=======

>>>>>>> 27a0edd4942b87c7fe02360efb038a84e6c2aaf1
# @app.route('/swope')
# def swope():
#     return render_template('swope.html')
#
#
# @app.route('/swopeprocess', methods=['GET', 'POST'])
# def swope_process():
#
#     keyword = request.form['keyword'].lower().strip()
#     drops = Drops.select().where(Drops.transcription.contains(keyword))
<<<<<<< HEAD
#     return jsonify({"keyword":process_drop_results(drops)})
#



def add_wildcard(string):
    return "%" + string + "%"


def process_drop_results(drops):
    drops_list = []
    for drop in drops:
        drop_as_dict = {
            'filename': drop.filename,
            'speaker': drop.speaker,
            'transcription': drop.transcription.upper()[0:110]
        }
        drops_list.append(drop_as_dict)
    return drops_list


if __name__ == "__main__":
    app.run(debug=True)
