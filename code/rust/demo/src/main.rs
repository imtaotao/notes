use std::env;
use std::path::Path;
use std::process::Command;

fn main() {
  let args: Vec<String> = env::args().collect();
  if args.len() < 2 {
    println!("Please provide a demo name.");
    return;
  }
  let demo_name = &args[1];
  let demo_path = format!("./src/{}.rs", demo_name);
  let output_path = format!("./src/{}.exe", demo_name);

  if Path::new(&demo_path).exists() {
    // Compile the source file
    if Command::new("rustc")
      .args(&[&demo_path, "-o", &output_path])
      .status()
      .expect("Failed to compile")
      .success()
    {
      // Execute the compiled file
      if let Err(e) = Command::new(&output_path).status() {
        eprintln!("Failed to execute {}: {}", demo_name, e);
      }
    } else {
      eprintln!("Compilation failed for {}", demo_name);
    }
  } else {
    println!("Demo file {} does not exist.", demo_name);
  }
}
