from .db import db, environment, SCHEMA, add_prefix_for_prod




class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")))
    author_profile_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("profiles.id")))
    event_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("events.id")))
    content=db.Column(db.String(255), nullable=False)



    user = db.relationship('User', back_populates='comments')
    profile=db.relationship('Profile', back_populates='comments')
    event=db.relationship('Events', back_populates='comments')



    def to_dict(self):
        return {
            'id':self.id,
            'author_id':self.author_id,
            'author_profile_id':self.author_profile_id,
            'event_id':self.event_id,
            'content':self.content

        }
