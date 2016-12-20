from invoke import task
import peewee
from models import Drops
@task
def create_db(ctx): 
	"""
	Create a DB
	"""

	db = peewee.SqliteDatabase('staticmeta/drops.db')
	db.connect()
	db.create_tables([Drops])
