from flask import Blueprint, jsonify,request

from flask_login import login_required
from flask_login import current_user
from app.models.db import db
from app.models.profile import Profile
from app.forms.user_profile_form import UserProfileForm
from app.models import Profile

profiles_routes = Blueprint('profiles', __name__)


@profiles_routes.route('/<int:user_id>',methods=['POST'])
def create_user_profile(user_id):

    form=UserProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user:

      if form.validate_on_submit():



          user_id=form.data.get("user_id")
          condo_id=form.data.get("condo_id")
          profile_img=form.data.get("profile_img")
          age=form.data.get("age")
          work=form.data.get("work")
          education=form.data.get("education")
          hometown=form.data.get("hometown")
          tennis=form.data.get("tennis")
          padle=form.data.get("padle")
          pickleball=form.data.get("pickleball")
          golf=form.data.get("golf")
          gym=form.data.get("gym")
          boating=form.data.get("boating")
          jogging=form.data.get("jogging")
          dogs=form.data.get("dogs")
          kids_activities=form.data.get("kids_activities")
          soccer=form.data.get("soccer")
          cocktail_hour=form.data.get("cocktail_hour")
          philanthropy=form.data.get("philanthropy")
          basketball=form.data.get("basketball")
          art=form.data.get("art")
          spa=form.data.get("spa")
          fine_dining=form.data.get("fine_dining")
          polo=form.data.get("polo")
          scuba_diving=form.data.get("scuba_diving")
          horseback_riding=form.data.get("horseback_riding")
          yoga=form.data.get("yoga")
          boxing=form.data.get("boxing")



          new_profile=Profile(user_id=user_id,condo_id=condo_id,=comment)

          db.session.add(new_comment)
          db.session.commit()



          res_comment={
            "id":new_comment.id,
            "content":comment,
            "user_id":current_user.id,
            "author":current_user.username

          }


          return jsonify(res_comment)


      if form.errors:
          return jsonify(form.errors)
  return jsonify("Login please")




# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     user = User.query.get(id)
#     return user.to_dict()
