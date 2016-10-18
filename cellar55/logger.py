import logging
import logging.handlers
import datetime
import os

from cellar55 import app

LOG_DIR = app.config["LOG_DIR"]
LOG_FILENAME = "job.log"
LOG_FILE_MAX_BYTES = 1000 * 1000 * 50
BACKUP_COUNT = 5

LOG_PATH = os.path.join(LOG_DIR, LOG_FILENAME)

class Logger:

    def __init__(self):
        self._init_log_file_if_not_exists()
        self.logger = logging.getLogger("JobLogger")
        self.logger.setLevel(logging.INFO)
        self.logger.addHandler(logging.handlers.RotatingFileHandler(
            LOG_PATH, maxBytes=LOG_FILE_MAX_BYTES, backupCount=BACKUP_COUNT))

    def info(self, action):
        self.logger.info(self._format_log(action))

    def error(self, action, error=''):
        self.logger.error(self._format_log(action, error))

    def _format_log(self, action, error=None):
        time = str(datetime.datetime.now())
        if error is None:
            return "{0}: {1}".format(time, action)
        return "{0}: {1}, {2}".format(time, action, error)

    def _init_log_file_if_not_exists(self):
        if not os.path.exists(LOG_PATH):
            os.mkdir(LOG_DIR)
            with open(LOG_PATH, "a"):
                os.utime(LOG_PATH, None)

job_logger = Logger()
