use test;

-- delimiter //;

-- 创建存储过程
-- create procedure AvgFruitprice() 
--   begin
--     select avg(f_price) as avgprice from fruits;
--   end //

-- 创建存储函数

-- create function CountProc2 (sid int)
--   returns int
--   begin
--     return (select count(*) from fruits where s_id = sid);
--   end;
--   //

-- 视图

-- 创建基本表
-- create table t(
--   quantity int,
--   price int
-- );

-- insert into t values(3, 50);

-- create view view_t as select quantity, price, quantity * price as ab from t;

-- apps 表
create table apps (
  `id` int not null default 100000 primary key auto_increment,
  `appname` varchar(50) not null,
  `principal` varchar(50) not null,
  `description` varchar(255) not null
);

-- 有权限的人
create table user (

)