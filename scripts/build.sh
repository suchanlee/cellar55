#!/bin/sh

curdir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
rootdir="$(dirname $(dirname $curdir))"

# install python dependencies
"$rootdir/bin/pip" install -r "$curdir/../requirements.txt"

# migrate db
cd "$rootdir/cellar55"
"$rootdir/bin/python" manage.py db init
"$rootdir/bin/python" manage.py db migrate

# build frontend resources
cd "$rootdir/cellar55/cellar55/frontend"
./node_modules/webpack/bin/webpack.js --optimize-minimize --optimize-dedupe --output-path "$rootdir/cellar55/static/build" --output-filename bundle.js
