from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .condo import Condo


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    is_online=db.Column(db.Boolean)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    condo_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("condos.id")))
    email = db.Column(db.String(255), nullable=False, unique=True)
    has_profile=db.Column(db.String(40), nullable=False)
    profile_id=db.Column(db.Integer,nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    condo = db.relationship('Condo', back_populates='users')
    profiles=db.relationship('Profile', back_populates='user',cascade="all, delete-orphan")
    events=db.relationship('Event',back_populates='user',cascade="all, delete-orphan")
    comments=db.relationship('Comment',back_populates='user',cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'is_online':self.is_online,
            'first_name': self.first_name,
            'last_name':self.last_name,
            'condo_id':self.condo_id,
            'email': self.email,
            'has_profile':self.has_profile,
            'profile_id':self.profile_id
        }


# class User(db.Model, UserMixin):
#     __tablename__ = 'users'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     is_online=db.Column(db.Boolean)
#     first_name = db.Column(db.String(40), nullable=False)
#     last_name = db.Column(db.String(40), nullable=False)
#     type=db.Column(db.String(40), nullable=False)
#     condo_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("condos.id")))
#     email = db.Column(db.String(255), nullable=False, unique=True)
#     has_profile=db.Column(db.String(40), nullable=False)
#     profile_id=db.Column(db.Integer,nullable=False)
#     hashed_password = db.Column(db.String(255), nullable=False)

#     condo = db.relationship('Condo', back_populates='users')
#     profiles=db.relationship('Profile', back_populates='user',cascade="all, delete-orphan")
#     events=db.relationship('Event',back_populates='user',cascade="all, delete-orphan")
#     comments=db.relationship('Comment',back_populates='user',cascade="all, delete-orphan")

#     @property
#     def password(self):
#         return self.hashed_password

#     @password.setter
#     def password(self, password):
#         self.hashed_password = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password, password)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'is_online':self.is_online,
#             'first_name': self.first_name,
#             'last_name':self.last_name,
#             'type':self.type,
#             'condo_id':self.condo_id,
#             'email': self.email,
#             'has_profile':self.has_profile,
#             'profile_id':self.profile_id
#         }
