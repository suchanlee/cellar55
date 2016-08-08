import googlemaps

from cellar55 import app
from cellar55.logger import job_logger

API_KEY = app.config['GOOGLEMAPS_API_KEY']

STATUS_OK = 'OK'
STATUS_ZERO_RESULTS = 'ZERO_RESULTS'


class Location:

    def __init__(self, name, formatted_address, lat, lon, place_id):
        self.name = name
        self.formatted_address = formatted_address
        self.lat = lat
        self.lon = lon
        self.place_id = place_id

class GeoLocator:

    def __init__(self):
        self.client = googlemaps.Client(key=API_KEY)

    def query_location(self, query):
        query_result = self.client.places(query)
        if query_result['status'] == STATUS_OK:
            if len(query_result['results']) > 0:
                place = query_result['results'][0]
                return Location(
                    name=place['name'],
                    formatted_address=place['formatted_address'],
                    lat=place['geometry']['location']['lat'],
                    lon=place['geometry']['location']['lng'],
                    place_id=place['place_id'])
        elif query_result['status'] == STATUS_ZERO_RESULTS:
            job_logger.info('No place found with query string: "{}"'.format(query))
        else:
            job_logger.error('Error querying for place with query string: "{}"'.format(query))
        return None

    def query_website(self, place_id):
        query_result = self.client.place(place_id)
        if query_result['status'] == STATUS_OK:
            result = query_result['result']
            if 'website' in result:
                return result['website']
        job_logger.error('No place detail found with place_id: "{}"'.format(place_id))
        return None

