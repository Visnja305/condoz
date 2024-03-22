from flask_wtf import FlaskForm
from flask_wtf.file import DataRequired
from wtforms import StringField


class EditCommentForm(FlaskForm):

    content = StringField('content', validators=[DataRequired()])
