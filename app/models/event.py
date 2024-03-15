from .db import db, environment, SCHEMA, add_prefix_for_prod




class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    organizer_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")))
    organizer_profile_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("profiles.id")))
    location=db.Column(db.String(40), nullable=False)
    details = db.Column(db.Text, nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    time_created=db.Column(db.DateTime,nullable=False)
    need_people_total=db.Column(db.Integer)
    left_room_for=db.Column(db.Integer)
    tennis=db.Column(db.Boolean)
    padel=db.Column(db.Boolean)
    pickleball=db.Column(db.Boolean)
    golf=db.Column(db.Boolean)
    gym=db.Column(db.Boolean)
    boating=db.Column(db.Boolean)
    jogging=db.Column(db.Boolean)
    dogs=db.Column(db.Boolean)
    kids_activities=db.Column(db.Boolean)
    soccer=db.Column(db.Boolean)
    cocktail_hour=db.Column(db.Boolean)
    philanthropy=db.Column(db.Boolean)
    basketball=db.Column(db.Boolean)
    art=db.Column(db.Boolean)
    spa=db.Column(db.Boolean)
    fine_dining=db.Column(db.Boolean)
    polo=db.Column(db.Boolean)
    scuba_diving=db.Column(db.Boolean)
    horseback_riding=db.Column(db.Boolean)
    yoga=db.Column(db.Boolean)
    boxing=db.Column(db.Boolean)
    other=db.Column(db.Boolean)


    user = db.relationship('User', back_populates='events')
    profile=db.relationship('Profile', back_populates='events')



    def to_dict(self):
        return {
            'id':self.id,
            'organizer_id':self.organizer_id,
            'organizer_profile_id':self.organizer_profile_id,
            'location':self.location,
            'details':self.details,
            'time':self.time,
            'time_created':self.time_created,
            'need_people_total':self.need_people_total,
            'left_room_for':self.left_room_for,
            'tennis':self.tennis,
            'padel':self.padel,
            'pickleball':self.pickleball,
            'golf':self.golf,
            'gym':self.gym,
            'boating':self.boating,
            'jogging':self.jogging,
            'dogs':self.dogs,
            'kids_activities':self.kids_activities,
            'soccer':self.soccer,
            'cocktail_hour':self.cocktail_hour,
            'philanthropy':self.philanthropy,
            'basketball':self.basketball,
            'art':self.art,
            'spa':self.spa,
            'fine_dining':self.fine_dining,
            'polo':self.polo,
            'scuba_diving':self.scuba_diving,
            'horseback_riding':self.horseback_riding,
            'yoga':self.yoga,
            'boxing':self.boxing,
            'other':self.other




        }
