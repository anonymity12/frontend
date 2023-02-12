
# frontend for `gww` project

`gww` stands for chinese: 乖娃娃（GuaiWaWa)

Originally, it's a Android app for my nephew and niece

looks like:

![2023-02-12-19-45-06](https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-02-12-19-45-06.png)

However, for fast development(work together with the [backend](https://github.com/anonymity12/backend.git)), I use [Vue.js](https://vuejs.org/guide/introduction.html) to write a web version, so here is the repository.

## UI

- home page:

![2023-02-12-19-59-11](https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-02-12-19-59-11.png)

- life log(浮生六记):

an idea from [沈复](https://zh.wikipedia.org/wiki/%E6%B2%88%E5%BE%A9)

![2023-02-12-20-15-25](https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-02-12-20-15-25.png)

![2023-02-12-20-16-23](https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-02-12-20-16-23.png)

- rank:

![2023-02-12-20-18-24](https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-02-12-20-18-24.png)




## feature & ideas

- finish task, to win butterfly, compete with others, to get top 1 in rank list
- write life-log, reading notes
- cherishing each day we live in this world: use life indicator to see how many days passed for your life, and how many days remind
- more ideas to implements:
    - chat
    - records for exercise/habits
    - family album
    - eisenhower martix
    - daily review
    - world map log
    - Android&iOS version!!

## tech

- Vue.js
- Node.js
- ElementUI
- Linux/CentOs
- Shell Script
- Nginx

---

below just is my own notes for working proceeding, don't bother
---

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

- [x] add username in sixlog list page 2023-01-22 23:08:16 2023-01-22 23:52:29
- [x] register page code
- [x] register page test
- [x] sixlog 1,2,3,4 button for mobile update 2023-01-22 21:25:26

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

## task panel

related with butterfly

here is the butterfly egg pic:


![2023-02-02-22-57-45](https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-02-02-22-57-45.png)

## register page

new background

![2023-02-06-13-17-14](https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-02-06-13-17-14.png)

