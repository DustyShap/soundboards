import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, desc


db = SQLAlchemy()

class Drop(db.Model):
    __tablename__ = 'drops'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String, nullable=False)
    speaker = db.Column(db.String, nullable=False)
    tags = db.Column(db.String, nullable=False)
    transcription = db.Column(db.String, nullable=False)
