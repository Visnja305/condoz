from .db import db, environment, SCHEMA, add_prefix_for_prod




class Profile(db.Model):
    __tablename__ = 'profiles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")))
    condo_id=db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("condos.id")))
    profile_img=db.Column(db.UnicodeText, nullable=False)
    age = db.Column(db.String(40), nullable=False)
    work = db.Column(db.Text, nullable=False)
    education=db.Column(db.String(40), nullable=False)
    hometown=db.Column(db.String(40), nullable=False)
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


    user = db.relationship('User', back_populates='profiles')
    condo=db.relationship('Condo', back_populates='profiles')



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'profile_img':self.profile_img,
            'age':self.age,
            'work':self.work,
            'education':self.education,
            'hometown':self.hometown,
            'tenis':self.tennis,
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
            'scuba_diving':self.scuba_diving,
            'horseback_riding':self.horseback_riding,
            'yoga':self.yoga,
            'boxing':self.boxing




        }
