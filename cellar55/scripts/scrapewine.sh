#!/bin/sh
# Runs wine scriping job

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
rootdir="$(dirname $(dirname $dir))"
"$rootdir/bin/python" "$rootdir/cellar55/scrape_job.py"
