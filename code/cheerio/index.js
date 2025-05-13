const cheerio = require('cheerio');

let html = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Infux Example</title>
    <infux-slot name="meta"></infux-slot>
    <!-- infux-slot name="meta"-->
  </head>
  <body>
    <infux-slot name="header"></infux-slot>
    <div id="root"></div>
    <!-- dsf -->
    <infux-slot name="footer"></infux-slot>
    <input checked/>
    <script type="module" src="/src/main.tsx"></script>
    <script>
      var a = "<!-- dsf -->"
      console.log('hello world');
    </script>
  </body>
</html>
`;

function replaceSlotToComment(code) {
  return code.replace(/<infux-slot(.*?)><\/infux-slot>/g, ($1, $2) => {
    return `<!--infux-slot ${$2}-->`;
  });
}

console.time('cheerio');
const $ = cheerio.load(replaceSlotToComment(html));
console.timeEnd('cheerio');

console.time('replace');
$.root()
  .find('*')
  .contents()
  .filter((i, ele) => {
    return ele.type === 'comment' && ele.data.trimStart().startsWith('infux-slot');
  })
  .each((i, elem) => {
    const name = elem.data.match(/name="(.*?)"/)?.[1];
    console.log(elem.data, name);
    const newDiv = $('<div>').text('This is a new div replacing a comment ' + name);
    $(elem).replaceWith(newDiv);
  });
const code = $.root().html();
console.timeEnd('replace');

console.log(code);
