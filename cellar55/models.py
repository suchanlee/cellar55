from cellar55 import db


class Wine(db.Model):

    __tablename__ = 'wine'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, index=True, nullable=False)
    country = db.Column(db.String, index=True, nullable=False)
    region = db.Column(db.String, index=True, nullable=False)
    subregion = db.Column(db.String, nullable=True)
    vintage = db.Column(db.String, index=True, nullable=False)
    varietal = db.Column(db.String, index=True, nullable=False)
    production = db.Column(db.String, nullable=False)
    alcohol = db.Column(db.String, nullable=False)
    oak = db.Column(db.String, nullable=False)
    soil = db.Column(db.String, nullable=False)
    farming = db.Column(db.String, nullable=False)
    service_temperature = db.Column(db.String, nullable=False, server_default='')
    glassware = db.Column(db.String, nullable=False, server_default='')
    drinking_window = db.Column(db.String, nullable=False, server_default='')
    decanting = db.Column(db.String, nullable=False, server_default='')
    wine_type = db.Column(db.String, index=True, nullable=False)
    fruit_rating = db.Column(db.Numeric, index=True, nullable=False)
    earth_rating = db.Column(db.Numeric, index=True, nullable=False)
    body_rating = db.Column(db.Numeric, index=True, nullable=False)
    tannin_rating = db.Column(db.Numeric, index=True, nullable=False)
    acid_rating = db.Column(db.Numeric, index=True, nullable=False)
    alcohol_rating = db.Column(db.Numeric, index=True, nullable=False)
    main_image_url = db.Column(db.String, nullable=True)
    alt_image_url = db.Column(db.String, nullable=True)
    entry = db.relationship('Entry', backref='wine', uselist=False)
    created = db.Column(db.DateTime, default=db.func.now())
    winery_id = db.Column(db.Integer, db.ForeignKey('winery.id'), nullable=True)
    winery = db.relationship('Winery', back_populates="wines")

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
            'service_temperature': self.service_temperature,
            'glassware': self.glassware,
            'drinking_window': self.drinking_window,
            'decanting': self.decanting,
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
        return '<Wine: {0}>'.format(self.name.encode('utf-8'))


class Entry(db.Model):

    __tablename__ = 'entry'

    id = db.Column(db.Integer, primary_key=True)
    wine_id = db.Column(db.Integer, db.ForeignKey('wine.id'))
    quote = db.Column(db.String, nullable=False)
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


class Winery(db.Model):

    __tablename__ = 'winery'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, index=True, nullable=False)
    formatted_address = db.Column(db.String, nullable=False)
    lat = db.Column(db.Numeric, nullable=False)
    lon = db.Column(db.Numeric, nullable=False)
    website = db.Column(db.String, nullable=True)
    wines = db.relationship('Wine', back_populates="winery")

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'formatted_address': self.formatted_address,
            'lat': self.lat,
            'lon': self.lon,
            'website': self.website
        }
