from flask_wtf import FlaskForm
from flask_wtf.file import DataRequired
from wtforms import StringField,IntegerField


class CommentForm(FlaskForm):
    author_id=IntegerField('author_id',validators=[DataRequired()])
    author_profile_id=IntegerField('author_profile_id',validators=[DataRequired()])
    event_id=IntegerField('event_id',validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
