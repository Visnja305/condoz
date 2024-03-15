"""empty message

Revision ID: 43a6b5b51f44
Revises: 
Create Date: 2024-03-14 15:19:42.998497

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '43a6b5b51f44'
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
    sa.Column('details', sa.Text(), nullable=False),
    sa.Column('time', sa.DateTime(), nullable=False),
    sa.Column('time_created', sa.DateTime(), nullable=False),
    sa.Column('need_people_total', sa.Integer(), nullable=True),
    sa.Column('left_room_for', sa.String(length=40), nullable=True),
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
    sa.ForeignKeyConstraint(['organizer_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['organizer_profile_id'], ['profiles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('events')
    op.drop_table('profiles')
    op.drop_table('users')
    op.drop_table('condos')
    # ### end Alembic commands ###