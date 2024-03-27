from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.dialects.postgresql import ARRAY






class Notification(db.Model):
    __tablename__ = 'notifications'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_profile_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("profiles.id")))
    chat_room=db.Column(db.Integer)
    chat_initiated_by=db.Column(db.Integer)



    profile = db.relationship('Profile', back_populates='notifications')




    def to_dict(self):
        return {
            'id': self.id,
            'user_profile_id': self.user_profile_id,
            'chat_room':self.chat_room,
            'chat_initiated_by':self.chat_initiated_by






        }
