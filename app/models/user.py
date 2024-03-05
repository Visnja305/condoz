from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .condo import Condo


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    type=db.Column(db.String(40), nullable=False)
    condo_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("condos.id")))
    email = db.Column(db.String(255), nullable=False, unique=True)
    has_profile=db.Column(db.String(40), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    condo = db.relationship('Condo', back_populates='users')

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
            'first_name': self.first_name,
            'last_name':self.last_name,
            'type':self.type,
            'condo_id':self.condo_id,
            'email': self.email
        }
