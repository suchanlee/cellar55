import sys
import re
from sets import Set

import requests
from bs4 import BeautifulSoup

from cellar55.models import Wine, Winery, Entry
from cellar55.logger import job_logger
from cellar55.classifier import WineTypeClassifier
from cellar55.geolocator import GeoLocator

base_url = 'https://www.sommselect.com'
geolocator = GeoLocator()

class WineScraper:

    re_main_image = r'background\: url\(\/\/(\S*)\)'
    base_url = base_url

    def __init__(self, url=''):
        self.url = url
        self.request()

    def request(self):
        try:
            job_logger.info("Requesting GET from {0}{1}".format(self.base_url, self.url))
            res = requests.get('{0}{1}'.format(self.base_url, self.url), verify=False)
            job_logger.info("Received GET from {0}{1}".format(self.base_url, self.url))
            self.soup = BeautifulSoup(res.content, 'html.parser')
        except requests.exceptions.RequestException as error:
            job_logger.error("Failed GET from {0}{1}".format(self.base_url, self.url), error)
            sys.exit(0)

    def get_wine(self):
        tech_notes = self._get_tech_notes()
        wine_specs = self._get_wine_specs()
        try:
            return Wine(
                name = self._get_name(),
                country = tech_notes['Country'],
                region = tech_notes['Region'],
                subregion = tech_notes['Sub-Region'],
                vintage = ','.join(self._get_vintages()),
                varietal = tech_notes['Varietal'],
                production = tech_notes['Production'],
                alcohol = tech_notes['Alcohol'],
                oak = tech_notes['Oak'],
                soil = tech_notes['Soil'],
                farming = tech_notes['Farming'],
                wine_type = self._get_type(),
                fruit_rating = wine_specs['Fruit'],
                earth_rating = wine_specs['Earth'],
                body_rating = wine_specs['Body'],
                tannin_rating = wine_specs['Tannin'],
                acid_rating = wine_specs['Acid'],
                alcohol_rating = wine_specs['Alcohol'],
                main_image_url = self._get_main_image_url(),
                alt_image_url = self._get_alt_image_url())
        except Exception as error:
            job_logger.error(u'Failed to fetch and parse wine: {0}'.format(self._get_name()).encode('utf-8'), error)
            return None

    def get_entry(self, wine):
        try:
            return Entry(
                quote = self._get_quote(),
                lead = self._get_lead(),
                description = self._get_description(),
                wine = wine)
        except Exception as error:
            job_logger.error(u'Failed to fetch and parse entry: {0}'.format(self._get_name()).encode('utf-8'), error)
            return None

    def _get_name(self):
        return self.soup.h1.find(text=True, recursive=False).strip()

    def _get_main_image_url(self):
        match = re.search(self.re_main_image, self.soup.style.string)
        if match is None:
            return None
        return match.group(1)

    def _get_alt_image_url(self):
        try:
            return self.soup.find('div', class_='pricing').table.find('img', class_='visible-phone')['src'].strip('//')
        except:
            alt_image_url = self.soup.find('div', class_='span3').img['src'].strip('//')
            if len(alt_image_url.strip()) > 0:
                return alt_image_url
            return None

    def _get_lead(self):
        return self.soup.find('p', class_='lead').text.strip()

    def _get_quote(self):
        ems = [em.text for em in self.soup.find_all('em') if em.find('p', class_='text-center') is not None]
        quote = ems[0].strip('\n')
        return quote[1:len(quote)-1] # remove the quotation marks

    def _get_description(self):
        divs = self.soup.find(class_='product-description').findAll('div')
        full_text = self.soup.find(class_='product-description').text
        paragraphs = filter(lambda x: len(x.replace(u'\xa0', '').strip()) > 0, map(lambda x: x.text.strip(), divs))
        for paragraph in paragraphs:
            full_text = full_text.replace(paragraph, '')
        last_paragraph = full_text.strip()
        paragraphs.append(last_paragraph)
        return '\n'.join(paragraphs)

    def _get_tech_notes(self):
        tech_notes = {}
        for tech_note in self.soup.find(class_='tech-notes').find_all(class_='tech-note'):
            title = tech_note.find('span', class_='title').text.strip()
            data = tech_note.find('span', class_='data').text.strip()
            tech_notes[title] = data
        return tech_notes

    def _get_wine_specs(self):
        wine_specs = {}
        for spec in self.soup.find(class_='wine-specs').find_all('td'):
            title = spec.img['alt']
            data = len(spec.find_all(class_='icon-circle')) + 0.5 * len(spec.find_all(class_='icon-adjust'))
            wine_specs[title] = data
        return wine_specs

    def _get_type(self):
        name = self._get_name()
        lead = self._get_lead()
        description = self._get_description()
        varietal = self._get_tech_notes()['Varietal']
        classifier = WineTypeClassifier(name, lead, description, varietal)
        return classifier.classify()

    def _get_vintages(self):
        subtitle = self.soup.h1.small.text
        name = self._get_name()
        search_text = u'{0} {1}'.format(subtitle, name)
        vintages = re.findall(r'\d{4}|NV', search_text)
        vintage_set = Set()
        for vintage in vintages:
            vintage_set.add(vintage)
        return list(vintage_set)


class WineryScraper:

    def __init__(self, wine):
        self.wine = wine

    def get_winery(self):
        location = self._get_location()
        if location is not None:
            return Winery(
                name=location.name,
                formatted_address=location.formatted_address,
                lat=location.lat,
                lon=location.lon,
                website=self._get_website(location.place_id)
            )
        return None

    def _get_location(self):
        winery_name = self.wine.name.split(',')[0].strip()
        region = self.wine.region
        return geolocator.query_location(u'{0} {1}'.format(winery_name, region).encode('utf-8'))

    def _get_website(self, place_id):
        return geolocator.query_website(place_id)

