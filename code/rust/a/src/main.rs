// fn greet_world() {
//   let regions = ["Grüß Gott!", "世界，你好", "World, hello"];
//   for region in regions.iter() {
//     println!("{}", &region);
//   }
// }

// fn main() {
//   greet_world();
// }

// fn main() {
//   let penguin_data = "\
//   common name,length (cm)
//   Little penguin,33
//   Yellow-eyed penguin,65
//   Fiordland penguin,60
//   Invalid,data
//   ";

//   let records = penguin_data.lines();

//   for (i, record) in records.enumerate() {
//     if i == 0 || record.trim().len() == 0 {
//       continue;
//     }

//     // 声明一个 fields 变量，类型是 Vec
//     // Vec 是 vector 的缩写，是一个可伸缩的集合类型，可以认为是一个动态数组
//     // <_>表示 Vec 中的元素类型由编译器自行推断，在很多场景下，都会帮我们省却不少功夫
//     let fields: Vec<_> = record.split(',').map(|field| field.trim()).collect();
//     if cfg!(debug_assertions) {
//       // 输出到标准错误输出
//       eprintln!("debug: {:?} -> {:?}", record, fields);
//     }

//     let name = fields[0];
//     // 1. 尝试把 fields[1] 的值转换为 f32 类型的浮点数，如果成功，则把 f32 值赋给 length 变量
//     //
//     // 2. if let 是一个匹配表达式，用来从=右边的结果中，匹配出 length 的值：
//     //   1）当=右边的表达式执行成功，则会返回一个 Ok(f32) 的类型，若失败，则会返回一个 Err(e) 类型，if let 的作用就是仅匹配 Ok 也就是成功的情况，如果是错误，就直接忽略
//     //   2）同时 if let 还会做一次解构匹配，通过 Ok(length) 去匹配右边的 Ok(f32)，最终把相应的 f32 值赋给 length
//     //
//     // 3. 当然你也可以忽略成功的情况，用 if let Err(e) = fields[1].parse::<f32>() {...}匹配出错误，然后打印出来，但是没啥卵用
//     if let Ok(length) = fields[1].parse::<f32>() {
//       // 输出到标准输出
//       println!("{}, {}cm", name, length);
//     }
//   }
// }

// fn main() {
//   let _x = 5;
//   let y = 10;
// }

// 修复错误
// fn main() {
//   let mut s = String::from("hello, ");

//   borrow_object(&s)
// }

// fn borrow_object(s: &String) {}

// // 修复错误
// fn main() {
//   let mut s = String::from("hello, ");

//   push_str(&mut s)
// }

// fn push_str(s: &mut String) {
//   s.push_str("world")
// }

// fn main() {
//   let mut s = String::from("hello, ");

//   // 填写空白处，让代码工作
//   let p = &mut s;

//   p.push_str("world");
// }

// fn main() {
//   let c = '中';

//   let r1 = &c;
//   // 填写空白处，但是不要修改其它行的代码
//   let ref r2 = c;

//   assert_eq!(*r1, *r2);

//   // 判断两个内存地址的字符串是否相等
//   assert_eq!(get_addr(r1), get_addr(r2));
// }

// // 获取传入引用的内存地址的字符串形式
// fn get_addr(r: &char) -> String {
//   format!("{:p}", r)
// }

// 移除代码某个部分，让它工作
// 你不能移除整行的代码！
// fn main() {
//   let mut s = String::from("hello");

//   let r1 = &s;
//   let r2 = &s;

//   println!("{}, {}", r1, r2);
// }

// fn main() {
//   // 通过修改下面一行代码来修复错误
//   let mut s = String::from("hello, ");

//   borrow_object(&mut s)
// }

// fn borrow_object(_s: &mut String) {}

// // 注释掉一行代码让它工作
// fn main() {
//   let mut s = String::from("hello, ");

//   let r1 = &mut s;
//   r1.push_str("world");
//   let r2 = &mut s;
//   r2.push_str("!");

//   // println!("{}", r1);
// }

// fn main() {
//   let mut s = String::from("hello, ");

//   let r1 = &mut s;
//   let r2 = &mut s;

//   // 在下面增加一行代码人为制造编译错误：cannot borrow `s` as mutable more than once at a time
//   // 你不能同时使用 r1 和 r2
//   println!("{}", r2);
// }

// 修复错误，不要新增代码行
// fn main() {
//   let s: &str = "hello, world";
//   println!("{}", s);
// }

// 使用至少两种方法来修复错误
// fn main() {
//   let s: Box<&str> = "hello, world".into();
//   greetings(&s)
// }

// fn greetings(s: &str) {
//   println!("{}", s)
// }

// 填空
// fn main() {
//   let mut s = __;
//   s.push_str("hello, world");
//   s.push('!');

//   assert_eq!(s, "hello, world!");
// }

// enum Action {
//   Say(String),
//   MoveTo(i32, i32),
//   ChangeColorRGB(u16, u16, u16),
// }

// fn main() {
//   let actions = [
//     Action::Say("Hello Rust".to_string()),
//     Action::MoveTo(1, 2),
//     Action::ChangeColorRGB(255, 255, 0),
//   ];
//   for action in actions {
//     match action {
//       Action::Say(s) => {
//         println!("{}", s);
//       }
//       Action::MoveTo(x, y) => {
//         println!("point from (0, 0) move to ({}, {})", x, y);
//       }
//       Action::ChangeColorRGB(r, g, _b) => {
//         println!(
//           "change color into '(r:{}, g:{}, b:0)', 'b' has been ignored",
//           r, g,
//         );
//       }
//     }
//   }
// }

// enum Direction {
//   East,
//   West,
//   North,
//   South,
// }

// fn main() {
//   let dire = Direction::South;
//   match dire {
//     Direction::East => println!("East"),
//     Direction::North | Direction::South => {
//       println!("South or North");
//     }
//     _ => {}
//   };

//   let some_u8_value = 0u8;
//   match some_u8_value {
//     1 => println!("one"),
//     3 => println!("three"),
//     5 => println!("five"),
//     7 => println!("seven"),
//     _ => (),
//   }
// }

// fn main() {
//   let age = Some(30);
//   println!("在匹配前，age是{:?}", age);

//   if let Some(age1) = age {
//     println!("匹配出来的age是{}", age1);
//     println!("匹配出来的age是{:?}", age);
//   }

//   println!("在匹配后，age是{:?}", age);
// }

// enum MyEnum {
//   Foo,
//   Bar,
// }

// fn main() {
//   let mut count = 0;

//   let v = vec![MyEnum::Foo, MyEnum::Bar, MyEnum::Foo];
//   for e in v {
//     if matches!(e, MyEnum::Foo) {
//       // 修复错误，只能修改本行代码
//       count += 1;
//     }
//   }

//   assert_eq!(count, 2);
// }

// fn main() {
//   let o = Some(7);

//   // 移除整个 `match` 语句块，使用 `if let` 替代
//   // match o {
//   //   Some(i) => {
//   //     println!("This is a really long string and `{:?}`", i);
//   //   }
//   //   _ => {}
//   // };
//   if let Some(i) = o {
//     println!("This is a really long string and `{:?}`", i)
//   }
// }

// 填空
// enum Foo {
//   Bar(u8),
// }

// fn main() {
//   let a = Foo::Bar(1);

//   if let Foo::Bar(i) = a {
//     println!("foobar 持有的值是: {}", i);
//   }
// }

// #[derive(Debug)]
// enum Foo {
//   Bar,
//   Baz,
//   Qux(u32),
// }

// fn main() {
//   let a = Foo::Qux(10);

//   match a {
//     Foo::Bar => {
//       println!("match foo::bar")
//     }
//     Foo::Baz => {
//       println!("match foo::baz")
//     }
//     _ => {
//       println!("match others {:?}", a)
//     }
//   }
// }

// 就地修复错误
// fn main() {
//   let age = Some(30);
//   if let Some(age) = age {
//     // 创建一个新的变量，该变量与之前的 `age` 变量同名
//     assert_eq!(age, 30);
//   } // 新的 `age` 变量在这里超出作用域

//   match age {
//     // `match` 也能实现变量遮蔽
//     Some(age) => println!("age 是一个新的变量，它的值是 {}", age),
//     _ => (),
//   }
// }

// fn main() {
//   fn plus_one(x: Option<i32>) -> Option<i32> {
//     match x {
//       None => None,
//       Some(i) => Some(i + 1),
//     }
//   }

//   let six = plus_one(Some(5));
//   let none = plus_one(None);

//   println!("{:?}", six);
//   println!("{:?}", none);
// }
// use std::collections::HashMap;
// use std::hash::Hash;

// #[derive(Clone)]
// struct Pair<X, Y>(X, Y);

// fn main() {
//   fn pairs_to_map<X: Eq + Hash + Clone, Y: Clone>(pairs: &[Pair<X, Y>]) -> HashMap<X, Y> {
//     let mut map = HashMap::with_capacity(pairs.len());

//     for p in pairs {
//       map.insert(p.0.clone(), p.1.clone());
//     }
//     map
//   }
// }

// struct Point<T, U> {
//   x: T,
//   y: U,
// }

// impl<T, U> Point<T, U> {
//   fn mixup<V, W>(self, other: Point<V, W>) -> Point<T, W> {
//     Point {
//       x: self.x,
//       y: other.y,
//     }
//   }
// }

// fn main() {
//   let p1 = Point { x: 5, y: 10.4 };
//   let p2 = Point { x: "Hello", y: 'c' };

//   let p3 = p1.mixup(p2);

//   println!("p3.x = {}, p3.y = {}", p3.x, p3.y);
// }

// use std::vec;

// pub struct Post {
//   pub title: String,   // 标题
//   pub author: String,  // 作者
//   pub content: String, // 内容
// }

// pub struct Weibo {
//   pub username: String,
//   pub content: String,
// }

// pub trait Summary {
//   fn summarize(&self) -> String;
// }

// impl Summary for Post {
//   fn summarize(&self) -> String {
//     format!("文章{}, 作者是{}", self.title, self.author)
//   }
// }

// impl Summary for Weibo {
//   fn summarize(&self) -> String {
//     format!("{}发表了微博{}", self.username, self.content)
//   }
// }

// fn main() {
//   let post = Post {
//     title: "Rust语言简介".to_string(),
//     author: "Sunface".to_string(),
//     content: "Rust棒极了!".to_string(),
//   };
//   let weibo = Weibo {
//     username: "sunface".to_string(),
//     content: "好像微博没Tweet好用".to_string(),
//   };

//   println!("{}", post.summarize());
//   println!("{}", weibo.summarize());

//   let a = vec![1, 2, 3, 4, 5];
// }

// use std::convert::TryInto;

// fn main() {
//   let a: i32 = 10;
//   let b: u16 = 100;

//   let b_ = b.try_into().unwrap();

//   if a < b_ {
//     println!("Ten is less than one hundred.");
//   }
// }

// use std::ops::Add;

// // 为Point结构体派生Debug特征，用于格式化输出
// #[derive(Debug)]
// struct Point<T: Add<T, Output = T>> {
//   //限制类型T必须实现了Add特征，否则无法进行+操作。
//   x: T,
//   y: T,
// }

// impl<T: Add<T, Output = T>> Add for Point<T> {
//   type Output = Point<T>;

//   fn add(self, p: Point<T>) -> Point<T> {
//     Point {
//       x: self.x + p.x,
//       y: self.y + p.y,
//     }
//   }
// }

// fn add<T: Add<T, Output = T>>(a: T, b: T) -> T {
//   a + b
// }

// fn main() {
//   let p1 = Point {
//     x: 1.1f32,
//     y: 1.1f32,
//   };
//   let p2 = Point {
//     x: 2.1f32,
//     y: 2.1f32,
//   };
//   println!("{:?}", add(p1, p2));

//   let p3 = Point { x: 1i32, y: 1i32 };
//   let p4 = Point { x: 2i32, y: 2i32 };
//   println!("{:?}", add(p3, p4));
// }

// #![allow(dead_code)]

// use std::fmt;
// use std::fmt::Display;

// #[derive(Debug, PartialEq)]
// enum FileState {
//   Open,
//   Closed,
// }

// #[derive(Debug)]
// struct File {
//   name: String,
//   data: Vec<u8>,
//   state: FileState,
// }

// impl Display for FileState {
//   fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//     match *self {
//       FileState::Open => write!(f, "OPEN"),
//       FileState::Closed => write!(f, "CLOSED"),
//     }
//   }
// }

// impl Display for File {
//   fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//     write!(f, "<{} ({})>", self.name, self.state)
//   }
// }

// impl File {
//   fn new(name: &str) -> File {
//     File {
//       name: String::from(name),
//       data: Vec::new(),
//       state: FileState::Closed,
//     }
//   }
// }

// fn main() {
//   let f6 = File::new("f6.txt");
//   //...
//   println!("{:?}", f6);
//   println!("{}", f6);
// }

// 填空
// struct A; // 具体的类型 `A`.
// struct S(A); // 具体的类型 `S`.
// struct SGen<T>(T); // 泛型 `SGen`.

// fn reg_fn(_s: S) {}

// fn gen_spec_t(_s: SGen<A>) {}

// fn gen_spec_i32(_s: SGen<i32>) {}

// fn generic<T>(_s: SGen<T>) {}

// fn main() {
//   // 使用非泛型函数
//   reg_fn(S(A)); // 具体的类型
//   gen_spec_t(SGen(A)); // 隐式地指定类型参数  `A`.
//   gen_spec_i32(SGen(1)); // 隐式地指定类型参数`i32`.

//   // 显式地指定类型参数 `char`
//   generic::<char>(SGen('a'));

//   // 隐式地指定类型参数 `char`.
//   generic(SGen(1));
// }

// use std::ops::Add;

// // 实现下面的泛型函数 sum
// fn sum<T: Add<Output = T>>(a: T, b: T) -> T {
//   return a + b;
// }

// fn main() {
//   assert_eq!(5, sum(2i8, 3i8));
//   assert_eq!(50, sum(20, 30));
//   assert_eq!(2.46, sum(1.23, 1.23));
// }

// 实现一个结构体 Point 让代码工作

// struct Point<T> {
//   x: T,
//   y: T,
// }

// fn main() {
//   let integer = Point { x: 5, y: 10 };
//   let float = Point { x: 1.0, y: 4.0 };
// }

// 修改以下结构体让代码工作
// #![warn(unused_variables)]

// struct Point<T> {
//   _x: T,
//   _y: String,
// }

// fn main() {
//   // 不要修改这行代码！
//   let p: Point<u8> = Point {
//     _x: 5,
//     _y: "hello".to_string(),
//   };
// }

// 为 Val 增加泛型参数，不要修改 `main` 中的代码
// struct Val<T> {
//   val: T,
// }

// impl<T> Val<T> {
//   fn value(&self) -> &T {
//     &self.val
//   }
// }

// fn main() {
//   let x = Val { val: 3.0 };
//   let y = Val {
//     val: "hello".to_string(),
//   };
//   println!("{}, {}", x.value(), y.value());
// }

// struct Point<T, U> {
//   x: T,
//   y: U,
// }

// impl<T, U> Point<T, U> {
//   // 实现 mixup，不要修改其它代码！
//   fn mixup<V, W>(self, p: Point<V, W>) -> Point<T, W> {
//     return Point { x: self.x, y: p.y };
//   }
// }

// fn main() {
//   let p1 = Point { x: 5, y: 10 };
//   let p2 = Point {
//     x: "Hello",
//     y: '中',
//   };

//   let p3 = p1.mixup(p2);

//   assert_eq!(p3.x, 5);
//   assert_eq!(p3.y, '中');
// }

// 修复错误，让代码工作
// struct Point<T> {
//   x: T,
//   y: T,
// }

// impl Point<f32> {
//   fn distance_from_origin(&self) -> f32 {
//     (self.x.powi(2) + self.y.powi(2)).sqrt()
//   }
// }

// fn main() {
//   let p = Point { x: 5.1, y: 10.1 };
//   println!("{}", p.distance_from_origin())
// }

// 完成两个 `impl` 语句块
// 不要修改 `main` 中的代码
// trait Hello {
//   fn say_hi(&self) -> String {
//     String::from("hi")
//   }

//   fn say_something(&self) -> String;
// }

// struct Student {}

// impl Hello for Student {
//   fn say_something(&self) -> String {
//     return "I'm a good student".to_string();
//   }
// }

// struct Teacher {}
// impl Hello for Teacher {
//   fn say_hi(&self) -> String {
//     return "Hi, I'm your new teacher".to_string();
//   }

//   fn say_something(&self) -> String {
//     return "I'm not a bad teacher".to_string();
//   }
// }

// fn main() {
//   let s = Student {};
//   assert_eq!(s.say_hi(), "hi");
//   assert_eq!(s.say_something(), "I'm a good student");

//   let t = Teacher {};
//   assert_eq!(t.say_hi(), "Hi, I'm your new teacher");
//   assert_eq!(t.say_something(), "I'm not a bad teacher");

//   println!("Success!")
// }

// `Centimeters`, 一个元组结构体，可以被比较大小
// #[derive(PartialEq, PartialOrd)]
// struct Centimeters(f64);

// // `Inches`, 一个元组结构体可以被打印
// #[derive(Debug)]
// struct Inches(i32);

// impl Inches {
//   fn to_centimeters(&self) -> Centimeters {
//     let &Inches(inches) = self;

//     Centimeters(inches as f64 * 2.54)
//   }
// }

// // 添加一些属性让代码工作
// // 不要修改其它代码！
// #[derive(Debug, PartialEq, PartialOrd)]
// struct Seconds(i32);

// fn main() {
//   let _one_second = Seconds(1);

//   println!("One second looks like: {:?}", _one_second);
//   let _this_is_true = _one_second == _one_second;
//   let _this_is_false = _one_second > _one_second;

//   let foot = Inches(12);

//   println!("One foot equals {:?}", foot);

//   let meter = Centimeters(100.0);

//   let cmp = if foot.to_centimeters() < meter {
//     "smaller"
//   } else {
//     "bigger"
//   };

//   println!("One foot is {} than one meter.", cmp);
// }

// struct Post {}

// struct Weibo {}

// trait Summary {}

// impl Summary for Post {}

// fn returns_summarizable(switch: bool) -> impl Summary {
//   if switch {
//     Post {
//          // ...
//       }
//   } else {
//     Weibo {
//           // ...
//       }
//   }
// }

// fn main() {}

// trait Bird {
//   fn quack(&self) -> String;
// }

// struct Duck;
// impl Duck {
//   fn swim(&self) {
//     println!("Look, the duck is swimming")
//   }
// }
// struct Swan;
// impl Swan {
//   fn fly(&self) {
//     println!("Look, the duck.. oh sorry, the swan is flying")
//   }
// }

// impl Bird for Duck {
//   fn quack(&self) -> String {
//     "duck duck".to_string()
//   }
// }

// impl Bird for Swan {
//   fn quack(&self) -> String {
//     "swan swan".to_string()
//   }
// }

// fn main() {
//   // 填空
//   let duck = Duck;
//   duck.swim();

//   let bird = hatch_a_bird(2);
//   // 变成鸟儿后，它忘记了如何游，因此以下代码会报错
//   // bird.swim();
//   // 但它依然可以叫唤
//   assert_eq!(bird.quack(), "duck duck");

//   let bird = hatch_a_bird(1);
//   // 这只鸟儿忘了如何飞翔，因此以下代码会报错
//   // bird.fly();
//   // 但它也可以叫唤
//   assert_eq!(bird.quack(), "swan swan");

//   println!("Success!")
// }

// // 实现以下函数
// fn hatch_a_bird(t: i32) -> Box<dyn Bird> {
//   if t == 1 {
//     Box::new(Swan {})
//   } else {
//     Box::new(Swan {})
//   }
// }

// trait Bird {
//   fn quack(&self);
// }

// struct Duck;
// impl Duck {
//   fn fly(&self) {
//     println!("Look, the duck is flying")
//   }
// }
// struct Swan;
// impl Swan {
//   fn fly(&self) {
//     println!("Look, the duck.. oh sorry, the swan is flying")
//   }
// }

// impl Bird for Duck {
//   fn quack(&self) {
//     println!("{}", "duck duck");
//   }
// }

// impl Bird for Swan {
//   fn quack(&self) {
//     println!("{}", "swan swan");
//   }
// }

// fn main() {
//   // 填空
//   let birds: [Box<dyn Bird>; 2] = [Box::new(Duck {}), Box::new(Swan {})];

//   for bird in birds {
//     bird.quack();
//     // 当 duck 和 swan 变成 bird 后，它们都忘了如何翱翔于天际，只记得该怎么叫唤了。。
//     // 因此，以下代码会报错
//     // bird.fly();
//   }
// }

// 填空
// trait Draw {
//   fn draw(&self) -> String;
// }

// impl Draw for u8 {
//   fn draw(&self) -> String {
//     format!("u8: {}", *self)
//   }
// }

// impl Draw for f64 {
//   fn draw(&self) -> String {
//     format!("f64: {}", *self)
//   }
// }

// fn main() {
//   let x = 1.1;
//   let y = 8;

//   // draw x
//   draw_with_box(Box::new(x));

//   // draw y
//   draw_with_ref(&y);

//   println!("Success!")
// }

// fn draw_with_box(x: Box<dyn Draw>) {
//   x.draw();
// }

// fn draw_with_ref(x: &dyn Draw) {
//   x.draw();
// }

// trait Foo {
//   fn method(&self) -> String;
// }

// impl Foo for u8 {
//   fn method(&self) -> String {
//     format!("u8: {}", *self)
//   }
// }

// impl Foo for String {
//   fn method(&self) -> String {
//     format!("string: {}", *self)
//   }
// }

// // 通过泛型实现以下函数
// fn static_dispatch<T: Foo>(n: T) {}

// // 通过特征对象实现以下函数
// fn dynamic_dispatch(ref_n: &dyn Foo) {}

// fn main() {
//   let x = 5u8;
//   let y = "Hello".to_string();

//   static_dispatch(x);
//   dynamic_dispatch(&y);

//   println!("Success!")
// }

// 填空

// 使用至少两种方法让代码工作
// 不要添加/删除任何代码行
// trait MyTrait {
//   fn f(&self) -> Box<dyn MyTrait>;
// }

// impl MyTrait for u32 {
//   fn f(&self) -> Box<dyn MyTrait> {
//     Box::new(42)
//   }
// }

// impl MyTrait for String {
//   fn f(&self) -> Box<dyn MyTrait> {
//     Box::new(self.clone())
//   }
// }

// fn my_function(x: Box<dyn MyTrait>) -> Box<dyn MyTrait> {
//   x.f()
// }

// fn main() {
//   my_function(Box::new(13_u32));
//   my_function(Box::new(String::from("abc")));

//   println!("Success!")
// }

// trait Pilot {
//   fn fly(&self);
// }

// trait Wizard {
//   fn fly(&self);
// }

// struct Human;

// impl Pilot for Human {
//   fn fly(&self) {
//     println!("This is your captain speaking.");
//   }
// }

// impl Wizard for Human {
//   fn fly(&self) {
//     println!("Up!");
//   }
// }

// impl Human {
//   fn fly(&self) {
//     println!("*waving arms furiously*");
//   }
// }

// fn main() {
//   let h = Human;

//   h.fly();
//   Pilot::fly(&h);
//   Wizard::fly(&h);
// }

// trait Animal {
//   fn baby_name() -> String;
// }

// struct Dog;

// impl Dog {
//   fn baby_name() -> String {
//     String::from("Spot")
//   }
// }

// impl Animal for Dog {
//   fn baby_name() -> String {
//     String::from("puppy")
//   }
// }

// fn main() {
//   println!("A baby dog is called a {}", <Dog as Animal>::baby_name());
// }

// use std::fmt;

// trait OutlinePrint: fmt::Display {
//   fn outline_print(&self) {
//     let output = self.to_string();
//     let len = output.len();
//     println!("{}", "*".repeat(len + 4));
//     println!("*{}*", " ".repeat(len + 2));
//     println!("* {} *", output);
//     println!("*{}*", " ".repeat(len + 2));
//     println!("{}", "*".repeat(len + 4));
//   }
// }

// struct Point {
//   x: i32,
//   y: i32,
// }

// impl OutlinePrint for Point {}

// impl fmt::Display for Point {
//   fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//     write!(f, "({}, {})", self.x, self.y)
//   }
// }
// fn main() {}

// use std::fmt;

// struct Wrapper(Vec<String>);

// impl fmt::Display for Wrapper {
//   fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//     write!(f, "[{}]", self.0.join(", "))
//   }
// }

// fn main() {
//   let w = Wrapper(vec![String::from("hello"), String::from("world")]);
//   println!("w = {}", w);
// }

// fn main() {
//   use std::collections::HashMap;

//   let teams_list = vec![
//     ("中国队".to_string(), 100),
//     ("美国队".to_string(), 10),
//     ("日本队".to_string(), 50),
//   ];

//   let mut teams_map = HashMap::new();
//   for team in &teams_list {
//     teams_map.insert(&team.0, team.1);
//   }

//   println!("{:?}", teams_map)
// }

// fn main() {
//   use std::collections::HashMap;

//   let teams_list = vec![
//     ("中国队".to_string(), 100),
//     ("美国队".to_string(), 10),
//     ("日本队".to_string(), 50),
//   ];

//   let teams_map: HashMap<_, _> = teams_list.into_iter().collect();

//   println!("{:?}", teams_map)
// }

// fn main() {
//   use std::collections::HashMap;

//   let name = String::from("Sunface");
//   let age = 18;

//   let mut handsome_boys = HashMap::new();
//   handsome_boys.insert(name.clone(), age);

//   println!("因为过于无耻，{}已经被从帅气男孩名单中除名", name);
//   println!("还有，他的真实年龄远远不止{}岁", age);
// }

// use std::collections::HashMap;

// fn main() {
//   let mut s = HashMap::new();

//   s.insert("b".to_string(), 10);
//   s.insert("c".to_string(), 20);

//   for (key, value) in s {
//     println!("{}: {}", key, value);
//   }
// }

// fn main() {
//   use std::collections::HashMap;

//   let mut s = HashMap::new();

//   s.insert("a", 1);

//   let o = s.insert("a", 2);

//   assert_eq!(o, Some(1));

//   let v = s.entry("b").or_insert(3);

//   assert_eq!(*v, 3);

//   let v = s.entry("Yellow").or_insert(50);

//   assert!(*v == 50)
// }

// fn main() {
//   use std::collections::HashMap;

//   let text = "hello world wonderful world";

//   let mut map = HashMap::new();
//   // 根据空格来切分字符串(英文单词都是通过空格切分)
//   for word in text.split_whitespace() {
//     let count = map.entry(word).or_insert(0);
//     *count += 1;
//   }

//   println!("{:?}", map);
// }
