from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Condo

condos_routes = Blueprint('condos', __name__)


@condos_routes.route('/')
def get_condos():

    users = Condo.query.all()
    return {'condos': [condo.to_dict() for condo in condos]}


# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     user = User.query.get(id)
#     return user.to_dict()
