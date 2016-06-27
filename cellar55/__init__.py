import yaml
from os import environ, path

from flask import Flask as BaseFlask, Config as BaseConfig
from flask_sqlalchemy import SQLAlchemy

# yaml-based config snipper from: https://gist.github.com/mattupstate/2046115
################################################
class Config(BaseConfig):
    """Flask config enhanced with a `from_yaml` method."""

    def from_yaml(self, config_file):
        env = environ.get('FLASK_ENV', 'DEVELOPMENT')
        self['ENVIRONMENT'] = env.lower()

        with open(config_file) as f:
            conf = yaml.load(f)

        conf = conf.get(env, conf)

        for key in conf.iterkeys():
            if key.isupper():
                self[key] = conf[key]

class Flask(BaseFlask):
    """Extended version of `Flask` that implements custom config class"""

    def make_config(self, instance_relative=False):
        root_path = self.root_path
        if instance_relative:
            root_path = self.instance_path
        return Config(root_path, self.default_config)

################################################


app = Flask(__name__)
app.config.from_yaml(path.join(app.root_path, "..", "conf", "config.yml"))
db = SQLAlchemy(app)
import cellar55.views
