from flask import Blueprint, jsonify,request

from flask_login import login_required
from flask_login import current_user
from app.models.db import db
from app.models.comment import Comment
from app.models.user import User
from app.forms.comment_form import CommentForm


comments_routes = Blueprint('comments', __name__)

@comments_routes.route('/<int:event_id>')
def get_comments_by_event_id(event_id):
  comments = Comment.query.filter(Comment.event_id == event_id)
  event_comments=[comment.to_dict() for comment in comments]


  for comment in event_comments:
    user = User.query.get(comment['author_id'])
    comment['author_first_name'] = user.first_name
    comment['author_last_name']=user.last_name

  return jsonify(event_comments)

@comments_routes.route("/new", methods=['POST'])
def post_comment():
  form=CommentForm()

  form['csrf_token'].data = request.cookies['csrf_token']
  if current_user:

      if form.validate_on_submit():
          content=form.data.get("content")
          author_id=form.data.get("author_id")
          author_profile_id=form.data.get("author_profile_id")
          event_id=form.data.get("event_id")

          new_comment=Comment(author_id=author_id,author_profile_id=author_profile_id,event_id=event_id,content=content)

          db.session.add(new_comment)
          db.session.commit()

          res_comment={
            "id":new_comment.id,
            "author_id":new_comment.author_id,
            "author_profile_id":new_comment.author_profile_id,
            "event_id":new_comment.event_id,
            "content":new_comment.content,
            "author_first_name":current_user.first_name,
            "author_last_name":current_user.last_name

          }


          return jsonify(res_comment)


      if form.errors:
          return jsonify(form.errors)
  return jsonify("Login please")
