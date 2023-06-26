控制台太多关于 fly 的log
想要少一些

如同sixlog 一样，可以随页面请求，只请求一个页面的（而非全部条目）

---

具体代码，请从 getAllItemsForUser （mapper code） 开始

---

或许我们希望不再返回大量的 fly 内容，而是让fly 代表一种 图示，表达用户的进步；那么我们可以把这个表，变为 github 那样的 commit graph

---

2023-06-26 08:54:56

now i want to use vue-heat-map-calendar(to replace table of fly), [github src](https://github.com/cargovova/vue-hm-calendar)

the data it needs, like:(this data must provide by the backend)

```json
:eventsDays="{
        '2022-12-31': 10,
        '2022-01-01': 2,
        '2022-03-23': 1,
        '2022-03-24': 1,
        '2022-03-25': 2,
        '2022-03-26': 1000,
        '2022-01-05': 2,
        '2022-08-05': 1,
        '2022-08-06': 2,
        '2022-08-07': 3,
      }"
```

after we have the data, we provide the webui here(in this frontend project)

the ui located in first page