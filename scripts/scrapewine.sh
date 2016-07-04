#!/bin/sh
# Runs wine scriping job

export FLASK_ENV=PRODUCTION

dir=$( cd $(dirname $0) ; pwd -P )
rootdir="$(dirname $(dirname $dir))"
cd "$rootdir/cellar55"
"$rootdir/bin/python" scrape_job.py
