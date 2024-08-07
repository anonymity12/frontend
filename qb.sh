#!/bin/bash
# quick build for front end

todayDate=$(date +%Y%m%d%H%M)
echo "今日日期是：${todayDate}"

echo "now quick build and then deploy to nginx"

echo "back up old dist now..."

rm -rf dist-backup

# mv dist/ dist-backup/

echo "ready to build new dist..."

npm run build

echo "build ok, making git tag"
git tag -a "${todayDate}" -m "make it online"

echo "build new dist done, ready to deploy on nginx... (html/goodchild/)"

echo "deploy(1): delete the old dist in goodchild first"
sudo rm -rf /www/server/nginx/html/goodchild/dist
echo "deploy(2): cp new dist into goodchild folder" 
sudo cp -r dist/ /www/server/nginx/html/goodchild
