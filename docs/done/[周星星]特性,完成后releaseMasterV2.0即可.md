
周结算系统: 一个网页,文本生成;



排行会变的问题，用名字字母序号吧


---

only one week star:　这个特性等星星很多了再　上，先准备

活动中　使用 每周累计, 复利效果也

select u.id as userId, u.userface as userface, u.cname as username, count(s.id) as cnt 
        from (select * from user order by id) u
            left join 
            (select * from starrecord where yearweek(starDateTime,1)=yearweek(curdate(),1)) s
        on u.id=s.owner
        group by u.id
        order by cnt desc
        limit 10; 


select u.id as userId, u.userface as userface, u.cname as username, count(s.id) as cnt 
        from user u
            left join 
            (select * from starrecord where yearweek(starDateTime,1)=yearweek(curdate(),1)) s
        on u.id=s.owner
        group by u.id
        order by cnt desc, userId asc
        limit 10; 