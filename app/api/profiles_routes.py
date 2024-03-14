from flask import Blueprint, jsonify,request

from flask_login import login_required
from flask_login import current_user
from app.models.db import db
from app.models.profile import Profile
from app.forms.user_profile_form import UserProfileForm


profiles_routes = Blueprint('profiles', __name__)


@profiles_routes.route('/',methods=['POST'])
def create_user_profile():

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



          new_profile=Profile(user_id=user_id,condo_id=condo_id,profile_img=profile_img,age=age,work=work,education=education,hometown=hometown,tennis=tennis,padel=padel,pickleball=pickleball,golf=golf,gym=gym,boating=boating,jogging=jogging,dogs=dogs,kids_activities=kids_activities,soccer=soccer,cocktail_hour=cocktail_hour,philanthropy=philanthropy,basketball=basketball,art=art,spa=spa,fine_dining=fine_dining,polo=polo,scuba_diving=scuba_diving,horseback_riding=horseback_riding,yoga=yoga,boxing=boxing)

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


@profiles_routes.route('/<int:id>')
def get_user_profile(id):
    profile=Profile.query.filter_by(user_id=id).first()
    print("************",profile)
    if(profile):
        return profile.to_dict()
    return jsonify("Profile can't be found")

@profiles_routes.route('/delete/<int:id>',methods=['DELETE'])
def delete_user_profile(id):
    try:
        profile=Profile.query.filter_by(id=id).first()
        user_id=profile.user_id
        db.session.delete(profile)
        db.session.commit()
        return jsonify(user_id)
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred during deletion'}), 500



@profiles_routes.route('/edit/<int:id>',methods=['PUT'])
def edit_user_profile(id):
   

    form=UserProfileForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user:

      if form.validate_on_submit():

          user_profile = Profile.query.get(id)


          user_profile.user_id=form.data.get("user_id")
          user_profile.condo_id=form.data.get("condo_id")
          user_profile.profile_img=form.data.get("profile_img")
          user_profile.age=form.data.get("age")
          user_profile.work=form.data.get("work")
          user_profile.education=form.data.get("education")
          user_profile.hometown=form.data.get("hometown")
          user_profile.tennis=form.data.get("tennis")
          user_profile.padel=form.data.get("padel")
          user_profile.pickleball=form.data.get("pickleball")
          user_profile.golf=form.data.get("golf")
          user_profile.gym=form.data.get("gym")
          user_profile.boating=form.data.get("boating")
          user_profile.jogging=form.data.get("jogging")
          user_profile.dogs=form.data.get("dogs")
          user_profile.kids_activities=form.data.get("kids_activities")
          user_profile.soccer=form.data.get("soccer")
          user_profile.cocktail_hour=form.data.get("cocktail_hour")
          user_profile.philanthropy=form.data.get("philanthropy")
          user_profile.basketball=form.data.get("basketball")
          user_profile.art=form.data.get("art")
          user_profile.spa=form.data.get("spa")
          user_profile.fine_dining=form.data.get("fine_dining")
          user_profile.polo=form.data.get("polo")
          user_profile.scuba_diving=form.data.get("scuba_diving")
          user_profile.horseback_riding=form.data.get("horseback_riding")
          user_profile.yoga=form.data.get("yoga")
          user_profile.boxing=form.data.get("boxing")

          db.session.commit()

          return user_profile.to_dict()


      if form.errors:
          return jsonify(form.errors)
    return jsonify("Login please")






#   try:

#     comment= Comment.query.filter_by(id=commentId).first()
#     db.session.delete(comment)
#     db.session.commit()


#     return jsonify(comment.id), 200
#   except Exception as e:
#     db.session.rollback()
#     return jsonify({'error': 'An error occurred during deletion'}), 500










# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     user = User.query.get(id)
#     return user.to_dict()
