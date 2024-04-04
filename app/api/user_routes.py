from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

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
