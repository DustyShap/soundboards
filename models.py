from peewee import Model, PrimaryKeyField, TextField, SqliteDatabase
import os

db = SqliteDatabase('staticmeta/drops.db')   #os.environ['DB_PATH']

class Drops(Model):

    _auto_pk = PrimaryKeyField()
    filename = TextField()
    speaker = TextField()
    tags = TextField()
    transcription = TextField()


    def as_dict(self):

        return  {
                'filename': self.filename,
                'speaker': self.speaker,
                'transcription': self.transcription.upper()[0:110]
            }

    class Meta:
        database = db

def initialize_db():
    db.connect()
    db.create_tables([Drops], safe=True)



'''
def csv_to_db():

    load_csv(db, 'staticmeta/drops.csv')

'''
