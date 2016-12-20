from flask import Flask, render_template, request, jsonify
from models import *


app = Flask(__name__)
initialize_db()



@app.route('/')
def home():
    return render_template("index.html")



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
        #drops = Drops.select().where(Drops.speaker.is_null(False))
        drops = Drops.select().where(Drops.speaker == chosen)


    drops_as_list = []

    if drops:

        for drop in drops:
            drop_as_dict = {

                'filename': drop.filename,
                'speaker': drop.speaker,
                'transcription': drop.transcription,
                'search_term': search_term
            }
            drops_as_list.append(drop_as_dict)


        return jsonify({'filename':drops_as_list})


    return jsonify({'filename': drops_as_list})




if __name__ == "__main__":
    app.run(debug=True)
