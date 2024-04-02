from flask import Blueprint, jsonify,request

from flask_login import login_required
from flask_login import current_user
from app.models.db import db
from app.models.event import Event
from app.forms.event_form import EventForm


events_routes = Blueprint('events', __name__)


@events_routes.route('/',methods=['POST'])
def create_event():

    form=EventForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user:

      if form.validate_on_submit():

          organizer_id=form.data.get("organizer_id")
          organizer_profile_id=form.data.get("organizer_profile_id")
          location=form.data.get("location")
          location_name=form.data.get("location_name")
          details=form.data.get("details")
          time=form.data.get("time")
          time_created=form.data.get("time_created")
          need_people_total=form.data.get("need_people_total")
          left_room_for=form.data.get("left_room_for")
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
          other=form.data.get("other")

          new_event=Event(organizer_id=organizer_id,organizer_profile_id=organizer_profile_id,location=location,location_name=location_name,details=details,time=time,time_created=time_created,need_people_total=need_people_total,left_room_for=left_room_for,tennis=tennis,padel=padel,pickleball=pickleball,golf=golf,gym=gym,boating=boating,jogging=jogging,dogs=dogs,kids_activities=kids_activities,soccer=soccer,cocktail_hour=cocktail_hour,philanthropy=philanthropy,basketball=basketball,art=art,spa=spa,fine_dining=fine_dining,polo=polo,scuba_diving=scuba_diving,horseback_riding=horseback_riding,yoga=yoga,boxing=boxing,other=other)
          

          db.session.add(new_event)
          db.session.commit()

          return new_event.to_dict()


      if form.errors:
          return jsonify(form.errors)
    return jsonify("Login please")

@events_routes.route('/all')
def get_events():
    events = Event.query.all()
    all_events=[event.to_dict() for event in events]

    return jsonify(all_events)

@events_routes.route('/delete/<int:id>',methods=['DELETE'])
def delete_event(id):
    try:
        event=Event.query.filter_by(id=id).first()
        event_id=event.id
        db.session.delete(event)
        db.session.commit()
        return jsonify(event_id)
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred during deletion'}), 500


@events_routes.route('/edit/<int:id>',methods=['PUT'])
def edit_event(id):



    form=EventForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user:

      if form.validate_on_submit():

          event = Event.query.get(id)

          event.organizer_id=form.data.get("organizer_id")
          event.organizer_profile_id=form.data.get("organizer_profile_id")
          event.location=form.data.get("location")
          event.location_name=form.data.get("location_name")
          event.details=form.data.get("details")
          event.time=form.data.get("time")
          event.time_created=form.data.get("time_created")
          event.need_people_total=form.data.get("need_people_total")
          event.left_room_for=form.data.get("left_room_for")
          event.tennis=form.data.get("tennis")
          event.padel=form.data.get("padel")
          event.pickleball=form.data.get("pickleball")
          event.golf=form.data.get("golf")
          event.gym=form.data.get("gym")
          event.boating=form.data.get("boating")
          event.jogging=form.data.get("jogging")
          event.dogs=form.data.get("dogs")
          event.kids_activities=form.data.get("kids_activities")
          event.soccer=form.data.get("soccer")
          event.cocktail_hour=form.data.get("cocktail_hour")
          event.philanthropy=form.data.get("philanthropy")
          event.basketball=form.data.get("basketball")
          event.art=form.data.get("art")
          event.spa=form.data.get("spa")
          event.fine_dining=form.data.get("fine_dining")
          event.polo=form.data.get("polo")
          event.scuba_diving=form.data.get("scuba_diving")
          event.horseback_riding=form.data.get("horseback_riding")
          event.yoga=form.data.get("yoga")
          event.boxing=form.data.get("boxing")
          event.other=form.data.get("other")


          db.session.commit()


          return event.to_dict()


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
