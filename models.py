import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, desc

db = SQLAlchemy()

class User(db.model):
    __tablename__ = 'users'
