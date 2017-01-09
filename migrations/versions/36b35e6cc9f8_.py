"""empty message

Revision ID: 36b35e6cc9f8
Revises: e0e6c4b2e673
Create Date: 2017-01-08 22:54:36.918442

"""

# revision identifiers, used by Alembic.
revision = '36b35e6cc9f8'
down_revision = 'e0e6c4b2e673'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('wine', sa.Column('decanting', sa.String(), server_default='', nullable=False))
    op.add_column('wine', sa.Column('drinking_window', sa.String(), server_default='', nullable=False))
    op.add_column('wine', sa.Column('glassware', sa.String(), server_default='', nullable=False))
    op.add_column('wine', sa.Column('service_temperature', sa.String(), server_default='', nullable=False))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('wine', 'service_temperature')
    op.drop_column('wine', 'glassware')
    op.drop_column('wine', 'drinking_window')
    op.drop_column('wine', 'decanting')
    ### end Alembic commands ###
