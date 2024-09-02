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

fn main() {
  let mut s = String::from("hello, ");

  let r1 = &mut s;
  let r2 = &mut s;

  // 在下面增加一行代码人为制造编译错误：cannot borrow `s` as mutable more than once at a time
  // 你不能同时使用 r1 和 r2
  println!("{}", r2);
}
