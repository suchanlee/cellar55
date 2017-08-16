from flask import jsonify, render_template, request, url_for
from sqlalchemy import or_
from werkzeug.exceptions import NotFound

from cellar55 import app
from cellar55.models import Wine

def get_api_route(subpath):
    return '/api/{0}'.format(subpath)

@app.route('/', methods=['GET'])
@app.route('/wine/<int:wineid>/<string:slug>', methods=['GET'])
def index(wineid=None, slug=None):
    return render_template('index.html', js_build=url_for('static', filename='build/bundle.js'))

@app.route(get_api_route('wine'), methods=['GET'])
def wines():
    if len(request.args.items()) == 0:
        wines = Wine.query.all()
    else:
        name = request.args.get('name')
        query = Wine.query
        query = add_filters_to_query(query, 'wine_type', request.args.getlist('wine_types'))
        query = add_filters_to_query(query, 'varietal', request.args.getlist('varietals'))
        query = add_filters_to_query(query, 'vintage', request.args.getlist('vintage'))
        query = add_region_filters_to_query(
            query,
            request.args.getlist('countries'),
            request.args.getlist('regions'),
            request.args.getlist('subregions'))
        if name is not None:
            query = query.filter(Wine.name.ilike('%{0}%'.format(name)))
        wines = query.all()
        wines = vintage_range_filter_wines(wines,request.args.get('vintage_from'), request.args.get('vintage_to'))
    return jsonify(count=len(wines), wines=[wine.json() for wine in wines])

@app.route(get_api_route('wine/<int:wineid>'), methods=['GET'])
def wine_detail(wineid):
    wine = Wine.query.get(wineid)
    if wine is None:
        # TODO: find out what the exception is and throw here
        raise NotFound
    return jsonify(wine=wine.json(), entry=wine.entry.json())

def add_filters_to_query(query, attr, items):
    filters = []
    if len(items) > 0:
        for item in items:
            filters.append(getattr(Wine, attr).ilike('%{0}%'.format(item.encode('utf-8'))))
    query = query.filter(or_(*filters))
    return query

def add_region_filters_to_query(query, countries, regions, subregions):
    filters = []
    for country in countries:
        filters.append(getattr(Wine, 'country').ilike('%{0}%'.format(country.encode('utf-8'))))
    for region in regions:
        filters.append(getattr(Wine, 'region').ilike('%{0}%'.format(region.encode('utf-8'))))
    for subregion in subregions:
        filters.append(getattr(Wine, 'subregion').ilike('%{0}%'.format(subregion.encode('utf-8'))))
    query = query.filter(or_(*filters))
    return query

def vintage_range_filter_wines(wines, vintage_from_str, vintage_to_str):
    try:
        vintage_from = int(vintage_from_str)
    except:
        vintage_from = None
    try:
        vintage_to = int(vintage_to_str)
    except:
        vintage_to = None
    if vintage_from is None and vintage_to is None:
        return wines
    filtered_wines = []
    for wine in wines:
        vintages = wine.vintage.split(',')
        if len(vintages) is 1:
            try:
                if is_within_range(int(vintages[0]), vintage_from, vintage_to):
                    filtered_wines.append(wine)
            except:
                pass
        elif len(vintages) > 1:
            is_included = False
            for vintage in vintages:
                try:
                    if is_within_range(int(vintage), vintage_from, vintage_to):
                        is_included = True
                except:
                    pass
            if is_included:
                filtered_wines.append(wine)
    return filtered_wines

def is_within_range(number, low, high):
    if low is None and high is None:
        return True
    elif low is None:
        return number <= high
    elif high is None:
        return number >= low
    else:
        return number >= low and number <= high
