from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        print("************",current_user.to_dict())
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        user.is_online=True
        db.session.commit()

        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    user_id=current_user.id

    user = User.query.get(user_id)
    user.is_online=False
    db.session.commit()


    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/<int:condo_id>/signup', methods=['POST'])
def sign_up(condo_id):
    """
    Creates a new user and logs them in
    """


    form = SignUpForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(

            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data["first_name"],
            last_name=form.data["last_name"],
            condo_id=condo_id,
            has_profile="no",
            profile_id=0,
            is_online=True
        )
        print("$$$$$$$$$$$$$$$$$$$$$$$$$$",user)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401

@auth_routes.route('/has-profile-yes/<int:profile_id>', methods=['PUT'])
def change_has_profile(profile_id):
    print("*******************************************",profile_id)
    if current_user:
        print(current_user.id)
        user_id=current_user.id

        user = User.query.get(user_id)
        user.has_profile="yes"
        user.profile_id=profile_id

        db.session.commit()
        return user.to_dict()
    return {"message":"there has been an error with processing your request"}

@auth_routes.route('/has-profile-no', methods=['PUT'])
def change_has_no_profile():

    if current_user:
        print(current_user.id)
        user_id=current_user.id

        user = User.query.get(user_id)
        user.has_profile="no"
        user.profile_id=0

        db.session.commit()
        return user.to_dict()
    return {"message":"there has been an error with processing your request"}


# @auth_routes.route('/<int:condo_id>/signup', methods=['POST'])
# def sign_up(condo_id):
#     """
#     Creates a new user and logs them in
#     """


#     form = SignUpForm()

#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         user = User(

#             email=form.data['email'],
#             password=form.data['password'],
#             first_name=form.data["first_name"],
#             last_name=form.data["last_name"],
#             type=form.data["type"],
#             condo_id=condo_id,
#             has_profile="no",
#             profile_id=0,
#             is_online=True
#         )
#         print("$$$$$$$$$$$$$$$$$$$$$$$$$$",user)
#         db.session.add(user)
#         db.session.commit()
#         login_user(user)
#         return user.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
