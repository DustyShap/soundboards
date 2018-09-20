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

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

class AdminUser(db.Model):
    __tablename__ = 'admin_user'
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String, nullable=False)
