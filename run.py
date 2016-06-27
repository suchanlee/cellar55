import psycopg2
import psycopg2.extensions

from cellar55 import app

psycopg2.extensions.register_type(psycopg2.extensions.UNICODE)
psycopg2.extensions.register_type(psycopg2.extensions.UNICODEARRAY)

if __name__ == '__main__':
    app.run()
