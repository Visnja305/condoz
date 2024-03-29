from .db import db, environment, SCHEMA, add_prefix_for_prod




class Condo(db.Model):
    __tablename__ = 'condos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    main_image = db.Column(db.Text, nullable=False)
    address=db.Column(db.String(40), nullable=False)
    amenities=db.Column(db.String(40), nullable=False)

    users=db.relationship('User', back_populates='condo',cascade="all, delete-orphan")
    profiles=db.relationship('Profile', back_populates='condo',cascade="all, delete-orphan")



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address':self.address,
            'amenities':self.amenities,
            'main_image':self.main_image

        }
