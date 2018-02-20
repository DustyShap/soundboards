from flask import Flask, render_template, request, jsonify
from flask_uploads import UploadSet, configure_uploads, AUDIO
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
#from models import *
import os
import csv
import pytz


app = Flask(__name__)

engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

audio = UploadSet('audio', AUDIO)
app.config['UPLOADED_AUDIO_DEST'] = os.environ['UPLOAD_PATH']
configure_uploads(app, audio)

# def logger(play_type,search_term):
#     with open(os.environ['HOME_PATH'] + 'logs.csv','a') as searchFile:
#         searchFileWriter = csv.writer(searchFile)
#         searchFileWriter.writerow([play_type,search_term,datetime.datetime.now(
#             pytz.timezone('America/Chicago')).strftime("%A, %d. %B %Y %I:%M%p")])
#         searchFile.close()


# @app.before_request
# def before_request():
#     initialize_db()


# @app.teardown_request
# def teardown_request(exception):
#     db.close()


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/upload', methods=['GET', 'POST'])
def upload():

    filename = audio.save(request.files['audio'])
    speaker = request.form['speaker'].lower().strip()
    tags = request.form['tags'].lower()
    transcription = request.form['transcription'].lower().replace("'", "")

    Drops.create(
        filename=filename,
        speaker=speaker,
        tags=tags,
        transcription=transcription
    )

    return jsonify({'file': filename})


# @app.route('/count', methods=['GET', 'POST'])
# def count():
#
#     filename = request.form['filename']
#     element = request.form['element']
#
#     if filename != 'CLIP%20THAT%20OFF.mp3':
#
#         logger('Audio Clicked',filename)
#
#         c = Drops.select().where(Drops.filename == filename)
#         for drop in c:
#             dropcount = drop.return_count()
#             if dropcount:
#                 q = Drops.update(count=Drops.count +
#                                  1).where(Drops.filename == filename)
#             else:
#                 q = Drops.update(count=1).where(Drops.filename == filename)
#
#             q.execute()
#
#     return jsonify({'filename': filename})

#Refactoring here
@app.route('/process', methods=['POST', 'GET'])
def process():
    search_term = request.form['tags'].lower().strip()
    chosen = request.form['chosen'].lower() #This is either the name of the speaker or search_drops

    if chosen == 'search_drops':
        drops = db.execute("SELECT * FROM drops WHERE speaker IS NOT NULL AND tags LIKE :tags",{"tags":add_wildcard(search_term)}).fetchall()

        drops_list = []
        for drop in drops:
            drop_as_dict = as_dict(drop)
            drops_list.append(drop_as_dict)
        return jsonify({"drops":drops_list})


        # drops = Drops.select().where(
        #     Drops.speaker.is_null(False),
        #     Drops.tags.contains(search_term),
        #
        # )

    #     logger('Search Term ',search_term)
    #
    elif chosen == 'last_twenty':
        drops = db.execute("SELECT * FROM drops ORDER BY id DESC LIMIT 20").fetchall()
        drops_list = []
        for drop in drops:
            drop_as_dict = as_dict(drop)
            drops_list.append(drop_as_dict)
        return jsonify({"drops":drops_list})
    #     drops = Drops.select().where(Drops.added_date).order_by(
    #         Drops.added_date.desc()).limit(20)
    #
    # else:
    #     drops = Drops.select().where(Drops.speaker == chosen)
    #
    # drops_as_list = []
    #
    # if drops:
    #     for drop in drops:
    #         drop_as_dict = drop.as_dict()
    #         drops_as_list.append(drop_as_dict)
    #
    #     return jsonify({'drops': drops_as_list})
    #
    # return jsonify({'drops': drops_as_list})


@app.route('/swope')
def swope():
    return render_template('swope.html')


@app.route('/swopeprocess', methods=['GET', 'POST'])
def swope_process():

    keyword = request.form['keyword'].lower().strip()
    print(keyword)
    drops = Drops.select().where(Drops.transcription.contains(keyword))

    drops_as_list = []

    if drops:
        for drop in drops:
            drop_as_dict = drop.as_dict()
            drops_as_list.append(drop_as_dict)
        return jsonify({'keyword': drops_as_list})
    return jsonify({'keyword': drops_as_list})

def add_wildcard(string):
    return "%" + string + "%"

def as_dict(drops):
    return {
        'filename': drops.filename,
        'speaker': drops.speaker,
        'transcription': drops.transcription.upper()[0:110]
    }

if __name__ == "__main__":
    app.run(debug=True)
