
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

2023-01-21 22:53:15

- [ ] add username in sixlog list page
- [x] register page code
- [x] register page test
- [ ] sixlog 1,2,3,4 button for mobile update 2023-01-22 21:25:26

2023-01-04 14:48:20

- [x] add axios post to finish login 2023-01-04 14:48:20 done(many days ago) 

2023-01-04 14:49:04:

- [x] 100% sixlog ui 
- [x] add UI layout update: submit text box, then, img, then ok, final: refresh
- [ ] timer at user page

0105 todo? yes doing

- [ ] jiapu, family tree

https://blog.csdn.net/ZYS10000/article/details/107601130

howto visit family tree
http://101.43.166.211:8091/#/jiapu


family tree operation ui:
http://101.43.166.211:8091/#/jiapuoperation



