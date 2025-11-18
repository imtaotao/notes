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
  pub attributes: HashMap<String, String>,
}

impl Node {
  pub fn text(data: String) -> Self {
    Node {
      children: vec![],
      node_type: NodeType::Text(data),
    }
  }

  pub fn elem(name: String, attrs: HashMap<String, String>, children: Vec<Node>) -> Self {
    Node {
      children,
      node_type: NodeType::Element(ElementData {
        tag_name: name,
        attributes: attrs,
      }),
    }
  }
}

// 简单的 HTML 解析器
pub struct Parser {
  pos: usize,
  input: String,
}

impl Parser {
  pub fn new(input: String) -> Self {
    Parser { pos: 0, input }
  }

  fn starts_with(&self, s: &str) -> bool {
    self.input[self.pos..].starts_with(s)
  }

  fn eof(&self) -> bool {
    self.pos >= self.input.len()
  }

  fn next_char(&self) -> char {
    self.input[self.pos..].chars().next().unwrap()
  }

  fn consume_char(&mut self) -> char {
    let mut iter = self.input[self.pos..].char_indices();
    let (_, ch) = iter.next().unwrap();
    let (next_pos, _) = iter.next().unwrap_or((1, ' '));
    self.pos += next_pos;
    ch
  }

  fn consume_while<F>(&mut self, test: F) -> String
  where
    F: Fn(char) -> bool,
  {
    let mut result = String::new();
    while !self.eof() && test(self.next_char()) {
      result.push(self.consume_char());
    }
    result
  }

  fn consume_whitespace(&mut self) {
    self.consume_while(char::is_whitespace);
  }

  fn parse_node(&mut self) -> Node {
    if self.next_char() == '<' {
      self.parse_element()
    } else {
      self.parse_text()
    }
  }

  fn parse_text(&mut self) -> Node {
    let text = self.consume_while(|c| c != '<');
    Node::text(text)
  }

  fn parse_element(&mut self) -> Node {
    // Parse opening tag
    assert_eq!(self.consume_char(), '<');
    let tag_name = self.parse_tag_name();
    let attrs = self.parse_attributes();
    self.consume_whitespace();
    assert_eq!(self.consume_char(), '>');
    // Parse children
    let children = self.parse_nodes();
    // Parse closing tag
    assert_eq!(self.consume_char(), '<');
    assert_eq!(self.consume_char(), '/');
    let closing_tag_name = self.parse_tag_name();
    assert_eq!(tag_name, closing_tag_name);
    self.consume_whitespace();
    assert_eq!(self.consume_char(), '>');
    Node::elem(tag_name, attrs, children)
  }

  fn parse_tag_name(&mut self) -> String {
    self.consume_while(|c| c.is_alphanumeric())
  }

  fn parse_attributes(&mut self) -> HashMap<String, String> {
    let mut attributes = HashMap::new();
    loop {
      self.consume_whitespace();
      if self.next_char() == '>' {
        break;
      }
      let name = self.parse_tag_name();
      self.consume_whitespace();
      assert_eq!(self.consume_char(), '=');
      self.consume_whitespace();
      let value = self.parse_attr_value();
      attributes.insert(name, value);
    }
    attributes
  }

  fn parse_attr_value(&mut self) -> String {
    let open_quote = self.consume_char();
    assert!(open_quote == '"' || open_quote == '\'');
    let value = self.consume_while(|c| c != open_quote);
    assert_eq!(self.consume_char(), open_quote);
    value
  }

  fn parse_nodes(&mut self) -> Vec<Node> {
    let mut nodes = Vec::new();
    loop {
      self.consume_whitespace();
      if self.eof() || self.starts_with("</") {
        break;
      }
      nodes.push(self.parse_node())
    }
    nodes
  }
}

fn main() {
  let html = r#"
        <div class="container">
            <h1>Hello, Rust!</h1>
            <p>This is a <b>simple</b> HTML parser demo.</p>
        </div>
    "#;

  let mut parser = Parser::new(html.to_string());
  let dom = parser.parse_nodes();

  println!("{:#?}", dom);
}
