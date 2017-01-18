from peewee import Model, PrimaryKeyField, TextField, SqliteDatabase, DateTimeField, IntegerField
import datetime
import os

db = SqliteDatabase(os.environ['DB_PATH'])


class Drops(Model):

    _auto_pk = PrimaryKeyField()
    filename = TextField()
    speaker = TextField()
    tags = TextField()
    transcription = TextField()
    added_date = DateTimeField(default=datetime.datetime.now)
    count = IntegerField()

    def return_count(self):

        return self.count

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
