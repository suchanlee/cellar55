from cellar55 import db


class Wine(db.Model):

    __tablename__ = 'wine'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), index=True, nullable=False)
    country = db.Column(db.String(40), index=True, nullable=False)
    region = db.Column(db.String(70), index=True, nullable=False)
    subregion = db.Column(db.String(70), nullable=True)
    vintage = db.Column(db.String(20), index=True, nullable=False)
    varietal = db.Column(db.String(300), index=True, nullable=False)
    production = db.Column(db.String(300), nullable=False)
    alcohol = db.Column(db.String(20), nullable=False)
    oak = db.Column(db.String(70), nullable=False)
    soil = db.Column(db.String(70), nullable=False)
    farming = db.Column(db.String(70), nullable=False)
    wine_type = db.Column(db.String(20), index=True, nullable=False)
    fruit_rating = db.Column(db.Numeric, index=True, nullable=False)
    earth_rating = db.Column(db.Numeric, index=True, nullable=False)
    body_rating = db.Column(db.Numeric, index=True, nullable=False)
    tannin_rating = db.Column(db.Numeric, index=True, nullable=False)
    acid_rating = db.Column(db.Numeric, index=True, nullable=False)
    alcohol_rating = db.Column(db.Numeric, index=True, nullable=False)
    main_image_url = db.Column(db.String(500), nullable=True)
    alt_image_url = db.Column(db.String(500), nullable=True)
    entry = db.relationship('Entry', backref='wine', uselist=False)
    created = db.Column(db.DateTime, default=db.func.now())

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'country': self.country,
            'region': self.region,
            'subregion': self.subregion,
            'vintage': self.vintage,
            'varietal': self.varietal,
            'production': self.production,
            'alcohol': self.alcohol,
            'oak': self.oak,
            'soil': self.soil,
            'farming': self.farming,
            'wine_type': self.wine_type,
            'fruit_rating': self.fruit_rating,
            'earth_rating': self.earth_rating,
            'body_rating': self.body_rating,
            'tannin_rating': self.tannin_rating,
            'acid_rating': self.acid_rating,
            'alcohol_rating': self.alcohol_rating,
            'main_image_url': self.main_image_url,
            'alt_image_url': self.alt_image_url,
            'quote': self.entry.quote
        }

    def __repr__(self):
        return '<Wine: {0}>'.format(self.name)


class Entry(db.Model):

    __tablename__ = 'entry'

    id = db.Column(db.Integer, primary_key=True)
    wine_id = db.Column(db.Integer, db.ForeignKey('wine.id'))
    quote = db.Column(db.String(500), nullable=False)
    lead = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)

    def json(self):
        return {
            'id': self.id,
            'wine_id': self.wine_id,
            'quote': self.quote,
            'lead': self.lead,
            'description': self.description
        }

