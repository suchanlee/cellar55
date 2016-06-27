#!/bin/sh
# Runs wine scriping job

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
rootdir="$(dirname $(dirname $dir))"

cd "$rootdir/cellar55"
"$rootdir/bin/python" scrape_job.py
