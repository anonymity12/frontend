#!/bin/bash
# quick build for front end

echo "now quick build and then deploy to nginx"

echo "back up old dist now..."

rm -rf dist-backup

mv dist/ dist-backup/

echo "ready to build new dist..."

npm run build

echo "build new dist done, move to nginx... (html/goodchild/)"

sudo cp -r dist/ /www/server/nginx/html/goodchild