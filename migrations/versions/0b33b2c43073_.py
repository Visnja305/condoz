"""empty message

Revision ID: 0b33b2c43073
Revises:
Create Date: 2024-03-25 11:04:49.461776

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '0b33b2c43073'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('condos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('main_image', sa.Text(), nullable=False),
    sa.Column('address', sa.String(length=40), nullable=False),
    sa.Column('amenities', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_online', sa.Boolean(), nullable=True),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('type', sa.String(length=40), nullable=False),
    sa.Column('condo_id', sa.Integer(), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('has_profile', sa.String(length=40), nullable=False),
    sa.Column('profile_id', sa.Integer(), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['condo_id'], ['condos.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('condo_id', sa.Integer(), nullable=True),
    sa.Column('profile_img', sa.UnicodeText(), nullable=False),
    sa.Column('age', sa.String(length=40), nullable=False),
    sa.Column('work', sa.Text(), nullable=False),
    sa.Column('education', sa.String(length=40), nullable=False),
    sa.Column('hometown', sa.String(length=40), nullable=False),
    sa.Column('tennis', sa.Boolean(), nullable=True),
    sa.Column('padel', sa.Boolean(), nullable=True),
    sa.Column('pickleball', sa.Boolean(), nullable=True),
    sa.Column('golf', sa.Boolean(), nullable=True),
    sa.Column('gym', sa.Boolean(), nullable=True),
    sa.Column('boating', sa.Boolean(), nullable=True),
    sa.Column('jogging', sa.Boolean(), nullable=True),
    sa.Column('dogs', sa.Boolean(), nullable=True),
    sa.Column('kids_activities', sa.Boolean(), nullable=True),
    sa.Column('soccer', sa.Boolean(), nullable=True),
    sa.Column('cocktail_hour', sa.Boolean(), nullable=True),
    sa.Column('philanthropy', sa.Boolean(), nullable=True),
    sa.Column('basketball', sa.Boolean(), nullable=True),
    sa.Column('art', sa.Boolean(), nullable=True),
    sa.Column('spa', sa.Boolean(), nullable=True),
    sa.Column('fine_dining', sa.Boolean(), nullable=True),
    sa.Column('polo', sa.Boolean(), nullable=True),
    sa.Column('scuba_diving', sa.Boolean(), nullable=True),
    sa.Column('horseback_riding', sa.Boolean(), nullable=True),
    sa.Column('yoga', sa.Boolean(), nullable=True),
    sa.Column('boxing', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['condo_id'], ['condos.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('organizer_id', sa.Integer(), nullable=True),
    sa.Column('organizer_profile_id', sa.Integer(), nullable=True),
    sa.Column('location', sa.String(length=40), nullable=False),
    sa.Column('location_name', sa.String(length=40), nullable=False),
    sa.Column('details', sa.Text(), nullable=False),
    sa.Column('time', sa.DateTime(), nullable=False),
    sa.Column('time_created', sa.DateTime(), nullable=False),
    sa.Column('need_people_total', sa.Integer(), nullable=True),
    sa.Column('left_room_for', sa.Integer(), nullable=True),
    sa.Column('tennis', sa.Boolean(), nullable=True),
    sa.Column('padel', sa.Boolean(), nullable=True),
    sa.Column('pickleball', sa.Boolean(), nullable=True),
    sa.Column('golf', sa.Boolean(), nullable=True),
    sa.Column('gym', sa.Boolean(), nullable=True),
    sa.Column('boating', sa.Boolean(), nullable=True),
    sa.Column('jogging', sa.Boolean(), nullable=True),
    sa.Column('dogs', sa.Boolean(), nullable=True),
    sa.Column('kids_activities', sa.Boolean(), nullable=True),
    sa.Column('soccer', sa.Boolean(), nullable=True),
    sa.Column('cocktail_hour', sa.Boolean(), nullable=True),
    sa.Column('philanthropy', sa.Boolean(), nullable=True),
    sa.Column('basketball', sa.Boolean(), nullable=True),
    sa.Column('art', sa.Boolean(), nullable=True),
    sa.Column('spa', sa.Boolean(), nullable=True),
    sa.Column('fine_dining', sa.Boolean(), nullable=True),
    sa.Column('polo', sa.Boolean(), nullable=True),
    sa.Column('scuba_diving', sa.Boolean(), nullable=True),
    sa.Column('horseback_riding', sa.Boolean(), nullable=True),
    sa.Column('yoga', sa.Boolean(), nullable=True),
    sa.Column('boxing', sa.Boolean(), nullable=True),
    sa.Column('other', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['organizer_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['organizer_profile_id'], ['profiles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=True),
    sa.Column('author_profile_id', sa.Integer(), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['author_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['author_profile_id'], ['profiles.id'], ),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE condos SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE profiles SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE events SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")



def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    op.drop_table('events')
    op.drop_table('profiles')
    op.drop_table('users')
    op.drop_table('condos')
    # ### end Alembic commands ###
