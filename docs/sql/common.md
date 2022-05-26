- 删除表中的所有记录 `truncate table table_name;`， truncate 将直接删除原来的表，并创建一个新的表，所以比 delete 快。

- 使用 ? 查看帮助文档
  + `? date and time functions` 查看所有的日期函数
  + `? year` 查看 year 函数的文档

- declare 声明的变量只能在存储过程和函数中使用，在其他地方直接用 `@a = 1` 这种语法;