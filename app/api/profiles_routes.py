from flask import Blueprint, jsonify,request

from flask_login import login_required
from flask_login import current_user
from app.models.db import db
from app.models.profile import UserProfile
from app.forms.user_profile_form import UserProfileForm


profiles_routes = Blueprint('profiles', __name__)


@profiles_routes.route('/',methods=['POST'])
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
          padel=form.data.get("padel")
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



          new_profile=UserProfile(user_id=user_id,condo_id=condo_id,profile_img=profile_img,age=age,work=work,education=education,hometown=hometown,tennis=tennis,padel=padel,pickleball=pickleball,golf=golf,gym=gym,boating=boating,jogging=jogging,dogs=dogs,kids_activities=kids_activities,soccer=soccer,cocktail_hour=cocktail_hour,philanthropy=philanthropy,basketball=basketball,art=art,spa=spa,fine_dining=fine_dining,polo=polo,scuba_diving=scuba_diving,horseback_riding=horseback_riding,yoga=yoga,boxing=boxing)

          db.session.add(new_profile)
          db.session.commit()



          res_profile={
            "id":new_profile.id,
            "user_id":user_id,
            "condo_id":condo_id,
            "profile_img":profile_img,
            "age":age,
            "work":work,
            "education":education,
            "hometown":hometown,
            "tennis":tennis,
            "padel":padel,
            "pickleball":pickleball,
            "golf":golf,
            "gym":gym,
            "boating":boating,
            "jogging":jogging,
            "dogs":dogs,
            "kids_activities":kids_activities,
            "soccer":soccer,
            "cocktail_hour":cocktail_hour,
            "philanthropy":philanthropy,
            "basketball":basketball,
            "art":art,
            "spa":spa,
            "fine_dining":fine_dining,
            "polo":polo,
            "scuba_diving":scuba_diving,
            "horseback_riding":horseback_riding,
            "yoga":yoga,
            "boxing":boxing


          }


          return jsonify(res_profile)


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
