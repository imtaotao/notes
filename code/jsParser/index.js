class Parser {
  constructor(options) {
    this.options = options;
  }

  parse() {
    console.log(this.code);
  }

  startNode() {

  }
}

export function parse(code) {
  const parser = new Parser({ code });
  return parser.parse()
}
