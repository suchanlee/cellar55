#!/bin/sh

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
rootdir="$(dirname $(dirname $dir))"

export FLASK_ENV=PRODUCTION
nohup "$rootdir/bin/python" "$rootdir/cellar55/run.py" &
