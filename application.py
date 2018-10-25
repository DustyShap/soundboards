import os
from flask import (Flask, session,
                   render_template, url_for, redirect, request, jsonify)
from flask_session import Session
from sqlalchemy import create_engine, desc
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import create_engine
from models import Drop, db, AdminUser, ClickStat
from create import create_app
import csv
import datetime
from pytz import timezone
from flask_uploads import UploadSet, configure_uploads, AUDIO

application = app = Flask(__name__)



app = create_app()
audio = UploadSet('audio', AUDIO)
app.config['UPLOADED_AUDIO_DEST'] = os.environ['UPLOAD_PATH']
configure_uploads(app, audio)
app.app_context().push()
TIMEZONE = timezone('America/Chicago')

@app.route('/')
def home():
    sa_time = datetime.datetime.now(TIMEZONE)
    return render_template("index.html")


@app.route('/upload_login', methods=['GET', 'POST'])
def upload_login():
    error_msg = ""
    if request.method == 'GET':
        return redirect(url_for('home'))
    password_attempt = request.form['upload_password']
    password = db.session.query(AdminUser.password).first()
    if password_attempt == password[0]:
        return jsonify({'password_correct': True})
    return jsonify({'password_correct': False})


@app.route('/upload', methods=['GET', 'POST'])
def upload():

    filename = audio.save(request.files['audio'])
    speaker = request.form['speaker'].lower().strip()
    tags = request.form['tags'].lower()
    transcription = request.form['transcription'].lower().replace("'", "")

    file_upload = Drop(
                filename=filename,
                speaker=speaker,
                tags=tags,
                transcription=transcription)

    db.session.add(file_upload)
    db.session.commit()

    return jsonify({'file': filename})


@app.route('/process', methods=['POST', 'GET'])
def process():
    search_term = request.form['tags'].lower().strip()
    # This is either the name of the speaker or search_drops
    chosen = request.form['chosen'].lower()

    if chosen == 'search_drops':
        search_method = 'search_value'
        drops = Drop.query.filter(
                Drop.speaker.isnot(None),
                Drop.tags.ilike("%"+search_term+"%")
        ).all()

    elif chosen == 'last_fifty':
        search_method = 'last_fifty'
        drops = db.session.query(Drop).order_by(desc(Drop.id)).limit(50)

    else:  # if a name was clicked
        search_method = 'name'
        drops = Drop.query.filter(
                Drop.speaker == chosen
        ).all()

    return process_drop_results(drops, search_method)

@app.route("/click_stat", methods=["POST"])
def click_stat():
    filename = request.form['filename']
    cell_clicked = request.form['cell_clicked']
    drop_id = Drop.id_lookup(filename)
    click = ClickStat(
    drop_id=drop_id,
    clicked_from_cell = False if cell_clicked == 'false' else True,
    click_time=datetime.datetime.now(TIMEZONE).strftime("%m-%d-%Y %I:%M:%S")
    )
    db.session.add(click)
    db.session.commit()
    return 'none'


@app.route('/robots.txt')
def robots_dot_txt():
	return "User-agent: *\nDisallow: /"

def add_wildcard(string):
    return "%" + string + "%"


def process_drop_results(drops, search_method):
    drops_list = []
    for drop in drops:
        drop_as_dict = drop.as_dict()
        drops_list.append(drop_as_dict)
    return jsonify({"drops": drops_list, "search_method": search_method})
