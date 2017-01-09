import logging
import logging.handlers
import datetime
import os

from cellar55 import app

LOG_DIR = app.config["LOG_DIR"]
LOG_FILE_MAX_BYTES = 1000 * 1000 * 50
BACKUP_COUNT = 5

INFO_LOG_FILE_NAME = "cellar55-job.log"
ERROR_LOG_FILE_NAME = "cellar55-error.log"


class Logger:

    def __init__(self):
        info_log_path = os.path.join(LOG_DIR, INFO_LOG_FILE_NAME)
        error_log_path = os.path.join(LOG_DIR, ERROR_LOG_FILE_NAME)
        self._init_log_file_if_not_exists(info_log_path)
        self._init_log_file_if_not_exists(error_log_path)
        self.info_logger = self._make_logger("INFO_LOGGER", "INFO", info_log_path)
        self.error_logger = self._make_logger("ERROR_LOGGER", "ERROR", error_log_path)

    def info(self, action):
        self.info_logger.info(self._format_log(action))

    def error(self, action, error=''):
        self.error_logger.error(self._format_log(action, error))

    def _format_log(self, action, error=None):
        time = str(datetime.datetime.now())
        if error is None:
            return "INFO [{0}]: {1}".format(time, action)
        return "ERROR [{0}]: {1}, {2}".format(time, action, error)

    def _init_log_file_if_not_exists(self, path):
        if not os.path.exists(path):
            try:
                os.mkdir(LOG_DIR)
            except:
                pass
            with open(path, "a"):
                os.utime(path, None)

    def _make_logger(self, name, logging_level, path):
        logger = logging.getLogger(name)
        logger.addHandler(logging.handlers.RotatingFileHandler(path, maxBytes=LOG_FILE_MAX_BYTES, backupCount=BACKUP_COUNT))
        if logging_level == "INFO":
            logger.setLevel(logging.INFO)
        elif logging_level == "ERROR":
            logger.setLevel(logging.ERROR)
        return logger


job_logger = Logger()
