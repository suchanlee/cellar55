
class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = '0Z$3O<HKA#WDsCUM6hG^'
    SQLALCHEMY_DATABASE_URI = 'postgresql://localhost/cellar55?client_encoding=utf8'


class ProductionConfig(Config):
    DEBUG = False

class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
