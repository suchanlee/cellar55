#!/bin/sh

dir=$( cd $(dirname $0) ; pwd -P )
rootdir="$(dirname $(dirname $dir))"

install python dependencies
"$rootdir/bin/pip" install -r "$dir/../requirements.txt"

# migrate db
cd "$rootdir/cellar55"
"$rootdir/bin/python" manage.py db init
"$rootdir/bin/python" manage.py db migrate

# build frontend resources
cd "$rootdir/cellar55/cellar55/frontend"
npm install
typings install
./node_modules/webpack/bin/webpack.js --optimize-minimize --optimize-dedupe --output-path "$rootdir/cellar55/static/build" --output-filename bundle.js
