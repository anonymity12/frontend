
# notice 

prod port =  8089

dev port = 8091

# how to build and move to nginx

first we need back up old dist

rm -rf dist-backup

mv dist/ dist-backup/

npm run build

sudo cp -r dist/ /www/server/nginx/html/goodchild


see:

ls /www/server/nginx/html/goodchild

should see dist
# next todo

add axios post to finish login 2022-01-05 16:54:08

# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
