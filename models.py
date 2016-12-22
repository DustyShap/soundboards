from peewee import *
from playhouse.csv_loader import *

db = SqliteDatabase('staticmeta/drops.db')
#db = SqliteDatabase('/home/DustyShapiro/soundboards/staticmeta/drops.db')


class Drops(Model):

    _auto_pk = PrimaryKeyField()
    filename = TextField()
    speaker = TextField()
    tags = TextField()
    transcription = TextField()

    class Meta:
        database = db


def initialize_db():
    db.connect()
    db.create_tables([Drops], safe=True)

'''
def csv_to_db():

    load_csv(db, 'staticmeta/drops.csv')

'''
