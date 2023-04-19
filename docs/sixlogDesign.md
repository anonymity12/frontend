2023-04-19 21:23:35

# 排序功能

- 希望看到排序，根据likeCounts进行排序

## 排序里可能遇到的问题

某些 likeCounts 的数量就是 0，那么应该按照时间从新到旧 排序。

我们可以从 redis 里面获得 likeCounts 。然后从 db 里面获得每个 sixlog 的时间序列。

# 轻量编辑发送功能

希望 汇总到 一个dialog，dialog 的 主体包含

1. articleTitle（后端的字数限制是：varchar 255）
2. articleCover（后端的字数限制是：varchar 255）
3. articlePrice (这个应该新加到另外一个表里)

旧 的 sixlog 模型： 应 ： article.articleTitle <- article.articleAbstract 

# 重量编辑功能

长文编辑

在 dialog 添加一个按钮：编辑长文 
进入一个编辑器的页面（在未来，这个页面甚至支持直接 control+v 贴图片）
