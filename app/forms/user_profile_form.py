from flask_wtf import FlaskForm
from flask_wtf.file import DataRequired
from wtforms import StringField,BooleanField,IntegerField,FileField


class UserProfileForm(FlaskForm):
    user_id=IntegerField('user_id',validators=[DataRequired()])
    condo_id=IntegerField('condo_id',validators=[DataRequired()])
    profile_img=FileField('profile_img')
    age = IntegerField('age', validators=[DataRequired()])
    work=StringField('work',validators=[DataRequired()])
    education=StringField('education',validators=[DataRequired()])
    hometown=StringField('hometown',validators=[DataRequired()])
    tennis=BooleanField('tennis')
    padel=BooleanField('padel')
    pickleball=BooleanField('pickleball')
    golf=BooleanField('golf')
    gym=BooleanField('gym')
    boating=BooleanField('boating')
    jogging=BooleanField('jogging')
    dogs=BooleanField('dogs')
    kids_activities=BooleanField('kids_activities')
    soccer=BooleanField('soccer')
    cocktail_hour=BooleanField('cocktail_hour')
    philanthropy=BooleanField('philanthropy')
    basketball=BooleanField('basketball')
    art=BooleanField('art')
    spa=BooleanField('spa')
    fine_dining=BooleanField('fine-dining')
    polo=BooleanField('polo')
    scuba_diving=BooleanField('scuba_diving')
    horseback_riding=BooleanField('horseback_riding')
    yoga=BooleanField('yoga')
    boxing=BooleanField('boxing')
