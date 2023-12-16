from flask_sqlalchemy import SQLAlchemy
from passlib.hash import pbkdf2_sha256 as sha256
from datetime import datetime
db = SQLAlchemy()

class User(db.Model):
    """User model for storing user related details"""
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    registration_date = db.Column(db.DateTime, default=datetime.utcnow) # to add in more information for the user

    favorites = db.relationship('Favorite', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = sha256.hash(password)

    def check_password(self, password):
        return sha256.verify(password, self.password_hash)

class Favorite(db.Model):
    """Favorite model for storing user's favorite games"""
    favorite_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    game_about = db.Column(db.String(255), nullable=False)
    date_favorited = db.Column(db.DateTime, default=datetime.utcnow)

def add_favorite(user_id, game_about):
    favorite = Favorite(user_id=user_id, game_about=game_about)
    db.session.add(favorite)
    db.session.commit()

def remove_favorite(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if favorite:
        db.session.delete(favorite)
        db.session.commit()

