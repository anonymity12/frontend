2023-09-24 22:19:03 
I'd love to have more statistics to show me
like:
    how many tomato I have finished today?
    how many I finished all the time?

---

the data structure:

1. in redis:
    counter function by Redis:
        set today_finish 0
        incr today_finish 
        incr total_finish
        ---
        string total_finish = user.getName() + ":" + "alltime"
        string today = Date().getTodayString();
        string today_finish = user.getName() + ":" + today;
        // today_finish = "tt:2023-09-24"
        
        // backend: called when a tomato is finished
        if get(today_finish) == null:
            set today_finish = 0
        else // already have today_finish key
            incr today_finish
            incr total_finish
        
        // frontend:
        apiFinishOneTomato().then(resp=>{"send to backend msg ok"});
        apiUpdateTomatoCounts().then(resp=>{this.tomatoCount...})
2. in db
    username:2023-09-01
    username:alltime

    tt:alltime
    tt:2021-09-02
    tt:2021-09-03
    tt:2021-09-04

    yy:alltime
    yy:2023-08-18
    yy:2023-08-19
    yy:2023-08-17
    yy:2023-08-10


x. maybe long time after

add start time, end time to form more charts for the user