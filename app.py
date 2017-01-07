from flask import Flask, render_template, request, jsonify
from flask.ext.uploads import UploadSet, configure_uploads, AUDIO
from models import Drops, initialize_db
import os

#Results number
#Look into cursor
#JS Popover?
#Hashable anchors / director.js
#Check Browser
#https://www.youtube.com/playlist?list=WL

app = Flask(__name__)
initialize_db()
audio = UploadSet('audio', AUDIO)
app.config['UPLOADED_AUDIO_DEST'] = 'static/audio' #os.environ['UPLOAD_PATH']
configure_uploads(app, audio)


@app.route('/')
def home():
    return render_template("index.html")



@app.route('/upload', methods=['GET','POST'])
def upload():


    filename = audio.save(request.files['audio'])
    speaker = request.form['speaker'].lower().strip()
    tags = request.form['tags'].lower()
    transcription = request.form['transcription'].lower().replace("'","")

    Drops.create(

         filename=filename,
        speaker=speaker,
        tags=tags,
        transcription=transcription
    )

    return jsonify({'file':filename})




@app.route('/process', methods=['POST', 'GET'])
def process():
    search_term = request.form['tags'].lower().strip()
    chosen = request.form['chosen'].lower()

    if chosen == 'search_drops':
        drops = Drops.select().where(
            Drops.speaker.is_null(False),
            Drops.tags.contains(search_term)
        )

    else:
        drops = Drops.select().where(Drops.speaker == chosen)


    drops_as_list = []

    if drops:
        for drop in drops:

            drop_as_dict = drop.as_dict()
            drop_as_dict['search_term'] = search_term
            #Search term passed to server, why?
            drops_as_list.append(drop_as_dict)

        return jsonify({'filename':drops_as_list})

    return jsonify({'filename': drops_as_list})




if __name__ == "__main__":
    app.run(debug=True)
