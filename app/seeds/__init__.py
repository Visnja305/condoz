from flask.cli import AppGroup
from .users import seed_users, undo_users
from .condos import seed_condos, undo_condos
from .profiles import seed_profiles,undo_profiles
from .events import seed_events,undo_events

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        db.session.execute(f"TRUNCATE table {SCHEMA}.condos RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.profiles RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")



        db.session.commit()
        undo_events()
        undo_profiles()
        undo_users()
        undo_condos()
    seed_condos()
    seed_users()
    seed_profiles()
    seed_events()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_events()
    undo_profiles()
    undo_users()
    undo_condos()
    # Add other undo functions here
