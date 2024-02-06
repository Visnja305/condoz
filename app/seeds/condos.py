from app.models import db, Condo, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_condos():
    oasis = Condo(
        name='Oasis', main_image='https://asset.mansionglobal.com/editorial/new-launches-help-to-keep-the-miami-luxury-inventory-on-point/assets/GaRuehNMpd/shoreclub-private-collection-2279x1282.webp', amenities='pool,tennis,basketball',address='22 Coconut, Miami')
    cloud = Condo(
        name='Cloud', main_image='https://henrifrank.com/wp-content/uploads/2023/08/Alana-Bay-Harbor-Condo-Residences-The-high-end-brand-new-construction-condos-in-Miami-expected-for-2024.png', amenities='pool,cocktail-room,gym',address='333 Worth Ave, Miami')
    one = Condo(
        name='One', main_image='https://patch.com/img/cdn20/users/22924509/20210922/095652/styles/patch_image/public/image003___22094246955.jpg?width=1200', amenities='conference-room,tennis,gym',address='333 Worth Ave, Miami')

    db.session.add(oasis)
    db.session.add(cloud)
    db.session.add(one)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_condos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.condos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM condos"))

    db.session.commit()
