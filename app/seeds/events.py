from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


demo_date_1 = datetime(2024, 4, 4, 10, 10, 10)
demo_date_2=datetime(2024, 5, 12, 11, 00, 00)
demo_date_3=datetime(2024, 7, 11, 13, 00, 00)
demo_date_4=datetime(2024, 6, 1, 11, 00, 00)


# Adds a demo user, you can add other users here if you want
def seed_events():
    demo_event_1 = Event(
        organizer_id=1,organizer_profile_id=1,location="1",location_name="Oasis",details="Cocktail party",time=demo_date_2,time_created=demo_date_1,need_people_total="",left_room_for="",tennis=False,padel=False,pickleball=False,golf=False,gym=False,boating=False,jogging=False,dogs=True,kids_activities=False,soccer=False,cocktail_hour=True,philanthropy=False,basketball=False,art=False,spa=False,fine_dining=False,polo=False,scuba_diving=False,horseback_riding=False,yoga=False,boxing=False )
    demo_event_2 = Event(
        organizer_id=1,organizer_profile_id=1,location="Margaret pace park",location_name="Margaret pace park",details="Picknik day for Moms and Dads,bring your dogs too!",time=demo_date_3,time_created=demo_date_1,need_people_total=10,left_room_for=10,tennis=False,padel=False,pickleball=False,golf=False,gym=False,boating=False,jogging=False,dogs=True,kids_activities=True,soccer=False,cocktail_hour=False,philanthropy=False,basketball=False,art=False,spa=False,fine_dining=False,polo=False,scuba_diving=False,horseback_riding=False,yoga=False,boxing=False )
    demo_event_3 = Event(
        organizer_id=1,organizer_profile_id=1,location="1",location_name="Oasis",details="Tennis match for pro players",time=demo_date_4,time_created=demo_date_1,need_people_total=3,left_room_for=3,tennis=True,padel=False,pickleball=False,golf=False,gym=False,boating=False,jogging=False,dogs=False,kids_activities=False,soccer=False,cocktail_hour=False,philanthropy=False,basketball=False,art=False,spa=False,fine_dining=False,polo=False,scuba_diving=False,horseback_riding=False,yoga=False,boxing=False )
    db.session.add(demo_event_1)
    db.session.add(demo_event_2)
    db.session.add(demo_event_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))

    db.session.commit()



    # demo = User(
        # first_name='demo',last_name='demoo',type='tenant',condo_id=1, email='demo@aa.io',has_profile="no",profile_id=0,is_online=False, password='password')

        # organizer_id=1,organizer_profile_id=1,location="1",location_name="Oasis",details="Cocktail party",time="2024-07-10T12:55",time_created="2024-04-05T11:54",need_people_total="",left_room_for="",tennis=False,padel=False,pickleball=False,golf=False,gym=False,boating=False,jogging=False,dogs=True,kids_activities=False,soccer=False,cocktail_hour=True,philanthropy=False,basketball=False,art=False,spa=False,fine_dining=False,polo=False,scuba_diving=False,horseback_riding=False,yoga=False,boxing=False )
