import requests
from bs4 import BeautifulSoup

from cellar55 import db
from cellar55.logger import Logger
from cellar55.models import Wine
from cellar55.scrapers import WineScraper


base_url = 'https://www.sommselect.com'
job_logger = Logger()

def scrape_current_wine():
    job_logger.info("Starting scrape_current_wine")
    scraper = WineScraper()
    name = scraper.get_name()
    if Wine.query.filter_by(name=name).first() is None:
        scraper.save(db)
        job_logger.info("Finished scrape_current_wine")
    else:
        job_logger.info("Aborted scrape_current_wine: wine {0} already exists".format(name.encode('ascii', 'ignore')))

def scrape_archived_wines():
    countries = ['United%20States', 'Italy', 'France']
    for country in countries:
        url = '{0}/product/listing.html?country={1}&group=region&sort=alpha&vintage='.format(base_url, country)
        request = requests.get(url)
        soup = BeautifulSoup(request.content, 'html.parser')
        for anchor in soup.find_all('a', class_='product-block-link-info'):
            scraper = WineScraper(anchor['href'])
            scraper.save(db)
