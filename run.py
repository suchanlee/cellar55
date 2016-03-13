import psycopg2
import psycopg2.extensions

from app import app
import views

psycopg2.extensions.register_type(psycopg2.extensions.UNICODE)
psycopg2.extensions.register_type(psycopg2.extensions.UNICODEARRAY)

if __name__ == '__main__':
    app.debug = True
    app.run()
