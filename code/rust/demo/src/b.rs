fn main() {
  let mut x = 1;
  let mut y = 2;
  let z = xx(&x, &y);
  println!("z: {}", z); 
}

fn xx(x: &i32, y: &i32) -> i32 {
  x + y
}