#!/bin/sh

dir=$( cd $(dirname $0) ; pwd -P )
rootdir="$(dirname $(dirname $dir))"

export FLASK_ENV=PRODUCTION
nohup "$rootdir/bin/python" "$rootdir/cellar55/run.py" &
