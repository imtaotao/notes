use std::collections::HashMap;

#[derive(Debug)]
pub enum NodeType {
  Element(ElementData),
  Text(String),
}
#[derive(Debug)]
pub struct Node {
  pub children: Vec<Node>,
  pub node_type: NodeType,
}

#[derive(Debug)]
pub struct ElementData {
  pub tag_name: String,
  pub attributes: Attrs,
}

type Attrs = HashMap<String, String>;

// 创建节点
impl Node {
  pub fn text(data: String) -> Self {
    Node {
      children: vec![],
      node_type: NodeType::Text(data),
    }
  }

  pub fn elem(name: String, attrs: Attrs, children: Vec<Node>) -> Self {
    let node_type = NodeType::Element(ElementData {
      tag_name: name,
      attributes: attrs,
    });
    Node {
      children,
      node_type,
    }
  }
}

pub struct Parser {
  idx: usize,
  input: String,
}

impl Parser {
  pub fn new(input: String) -> Parser {
    return Parser { idx: 0, input };
  }

  fn current_str(&self) -> &str {
    return &self.input[self.idx..];
  }

  fn next_char(&self) -> Option<char> {
    return self.current_str().chars().next();
  }

  fn starts_with(&self, s: &str) -> bool {
    return self.current_str().starts_with(s);
  }

  fn eof(&self) -> bool {
    return self.idx >= self.input.len();
  }

  fn consume_char(&self) {}

  fn parse_nodes(&mut self) -> Vec<Element> {
    let mut nodes = Vec::new();

    return nodes;
  }
}

fn main() {
  println!(r#"Hello world"#);
}
