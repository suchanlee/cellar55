#!/bin/sh
# Runs wine scriping job

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
rootdir="$(dirname $(dirname $dir))"

cd "$rootdir/cellar55"
ls
"$rootdir/bin/python" cellar55/scrape_job.py
