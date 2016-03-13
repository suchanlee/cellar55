# import json

from flask import jsonify, render_template, request
from sqlalchemy import or_

from app import app
from models import Wine

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/wine', methods=['GET'])
def wines():
    if len(request.args.items()) == 0:
        wines = Wine.query.all()
    else:
        wine_types = request.args.getlist('wine_type')
        varietals = request.args.getlist('varietal')
        countries = request.args.getlist('country')
        regions = request.args.getlist('region')
        subregions = request.args.getlist('subregion')
        name = request.args.get('name')
        query = Wine.query
        wine_filters = []
        region_filters = []
        subregion_filters = []
        country_filters = []
        varietal_filters = []
        for wine_type in wine_types:
            wine_filters.append(Wine.wine_type.ilike(wine_type))
        query = query.filter(or_(*wine_filters))
        for varietal in varietals:
            varietal_filters.append(Wine.varietal.ilike('%{0}%'.format(varietal)))
        query = query.filter(or_(*varietal_filters))
        for country in countries:
            country_filters.append(Wine.country.ilike(country))
        query = query.filter(or_(*country_filters))
        for region in regions:
            region_filters.append(Wine.region.ilike('%{0}%'.format(region)))
        query = query.filter(or_(*region_filters))
        for subregion in subregions:
            subregion_filters.append(Wine.subregion.ilike('%{0}%'.format(subregion)))
        query = query.filter(or_(*subregion_filters))
        if name is not None:
            query = query.filter(Wine.name.ilike('%{0}%'.format(name)))
        wines = query.all()
    return jsonify(count=len(wines), wines=[wine.json() for wine in wines])

@app.route('/wine/<id>', methods=['GET'])
def wine(id):
    wine = Wine.query.get_or_404(id)
    return jsonify(wine.json())

