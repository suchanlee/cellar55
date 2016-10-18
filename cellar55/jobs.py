import requests
from bs4 import BeautifulSoup

from cellar55 import db
from cellar55.logger import job_logger
from cellar55.models import Wine, Winery
from cellar55.scrapers import WineScraper, WineryScraper

base_url = 'https://www.sommselect.com'

def scrape_archived_wines():
    countries = ['United%20States', 'Italy', 'France']
    for country in countries:
        url = '{0}/product/listing.html?country={1}&group=region&sort=alpha&vintage='.format(base_url, country)
        request = requests.get(url)
        soup = BeautifulSoup(request.content, 'html.parser')
        for anchor in soup.find_all('a', class_='product-block-link-info'):
            scrape_current_wine(anchor['href'])


def scrape_current_wine(url=''):
    job_logger.info(u"Starting to scrape wine: {0}/{1}".format(base_url, url))
    wine_scraper = WineScraper(url)
    wine = wine_scraper.get_wine()
    if Wine.query.filter_by(name=wine.name).first() is None:
        winery = _get_winery(wine)
        if winery is not None and winery.id is None:
            _save_winery(winery)
            wine.winery = winery
        _save_wine(wine, wine_scraper.get_entry(wine))
    else:
        job_logger.info(_encode_str(u'Aborted scrape_current_wine: wine {0} already exists'.format(wine.name)))

def scrape_wineries():
    job_logger.info("Starting scrape winery job")
    wines = Wine.query.filter_by(winery=None)
    for wine in wines:
        winery = _get_winery(wine)
        if winery is None:
            job_logger.info(_encode_str(u"Unable to find winery for {0}".format(wine.name)))
        else:
            job_logger.info(_encode_str(u"Found winery for {0}: {1}".format(wine.name, winery.name)))
            db.session.add(winery)
            wine.winery = winery
            db.session.commit()
            _save_winery(winery)
    job_logger.info("Finished scrape winery job")

def _get_winery(wine):
    winery_scraper = WineryScraper(wine)
    winery = winery_scraper.get_winery()
    if winery is None:
        return None
    saved_winery = Winery.query.filter_by(name=winery.name).first()
    if saved_winery is None:
        return winery
    else:
        return saved_winery

def _save_winery(winery):
    try:
        db.session.add(winery)
        db.session.commit()
        job_logger.info(_encode_str(u'Saved winery: {0}'.format(winery.name)))
    except Exception as error:
        db.session.rollback()
        job_logger.error(_encode_str(u'Failed to save winery: {0}'.format(winery.name)), error)


def _save_wine(wine, entry):
    try:
        db.session.add(wine)
        db.session.add(entry)
        db.session.commit()
        job_logger.info(_encode_str(u'Saved wine: {0}'.format(wine.name)))
        job_logger.info("Finished scrape_current_wine")
    except Exception as error:
        db.session.rollback()
        job_logger.error(_encode_str(u'Failed to save wine: {0}'.format(wine.name)), error)

def _encode_str(str):
    return u'{0}'.format(str).encode('utf-8')
