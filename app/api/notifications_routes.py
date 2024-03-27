from flask import Blueprint, jsonify,request

from flask_login import login_required
from flask_login import current_user
from app.models.db import db
from app.models.notification import Notification



notifications_routes = Blueprint('notifications', __name__)





@notifications_routes.route('/all')
def get_all_notifications():

  notifications=Notification.query.filter(Notification.user_profile_id == current_user.profile_id)
  user_notifications = [
    {
      'id': notification.id,
      'user_profile_id': notification.user_profile_id,
      'chat_room': notification.chat_room,
      'chat_initiated_by':notification.chat_initiated_by
    }
    for notification in notifications]
  return jsonify(user_notifications)

@notifications_routes.route('/add-notification/<int:room>/<int:id>')
def add_notification(room,id):
   new_notification=Notification(user_profile_id=id,chat_room=room,chat_initiated_by=current_user.profile_id)
   print(new_notification.chat_initiated_by)
   db.session.add(new_notification)
   db.session.commit()
   return new_notification.to_dict()
