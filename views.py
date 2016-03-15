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
        name = request.args.get('name')
        query = Wine.query
        query = add_filters_to_query(query, 'wine_type', request.args.getlist('wine_type'))
        query = add_filters_to_query(query, 'varietal', request.args.getlist('varietal'))
        query = add_filters_to_query(query, 'country', request.args.getlist('country'))
        query = add_filters_to_query(query, 'region', request.args.getlist('region'))
        query = add_filters_to_query(query, 'subregion', request.args.getlist('subregion'))
        query = add_filters_to_query(query, 'vintage', request.args.getlist('vintage'))
        if name is not None:
            query = query.filter(Wine.name.ilike('%{0}%'.format(name)))
        wines = query.all()
        wines = vintage_range_filter_wines(wines,request.args.get('vintage_from'), request.args.get('vintage_to'))
    return jsonify(count=len(wines), wines=[wine.json() for wine in wines])

def add_filters_to_query(query, attr, items):
    filters = []
    if len(items) > 0:
        for item in items:
            filters.append(getattr(Wine, attr).ilike('%{0}%'.format(item)))
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

@app.route('/wine/<id>', methods=['GET'])
def wine(id):
    wine = Wine.query.get_or_404(id)
    return jsonify(wine.json())

