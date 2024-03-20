from flask import Blueprint, jsonify,request

from flask_login import login_required
from flask_login import current_user
from app.models.db import db
from app.models.comment import Comment
from app.forms.comment_form import CommentForm


comments_routes = Blueprint('comments', __name__)
