from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from flask_login import current_user

user_routes = Blueprint('users', __name__)


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
@user_routes.route('/search-by-profile/<int:id>')
def getUserByProfileId(id):
    """
    Query for a user by id and returns that user in a dictionary
    """

    user = User.query.filter_by(profile_id = id).first()

    return user.to_dict()

@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    all_users=[user.to_dict() for user in users]

    return jsonify(all_users)

@user_routes.route('/get-users')
def get_users():
    """
    Query for all users and returns them in a list of user dictionaries
    """

    users_online = User.query.filter(User.is_online == True)

    online_users=[user.to_dict() for user in users_online]

    users_offline = User.query.filter(User.is_online == False)
    offline_users=[user.to_dict() for user in users_offline]

    return jsonify({"online-users":online_users,
                   "offline-users":offline_users})
