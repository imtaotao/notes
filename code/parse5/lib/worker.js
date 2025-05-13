const html = `
 <body>
  <div id="content"></div>
  <script>document.getElementById("content").append(document.createElement("hr"));</script>
</body>
`;

function parse5() {
  const { parse } = require('parse5');

  const document = parse(html, {
    scriptingEnabled: false,
    sourceCodeLocationInfo: false,
    treeAdapter(...args) {
      console.log(args);
    },
  });

  const htmlNode = document.childNodes[0];

  console.log(htmlNode);
  debugger;
}

function jsdom() {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM(html);
  const document = dom.window.document;
  console.log(document);
  debugger;
}

jsdom();
