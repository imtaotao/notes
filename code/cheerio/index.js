const cheerio = require('cheerio')

const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <infux-slot name="meta"></infux-slot>
    <title>Infux Example</title>
  </head>
  <body>
    <infux-slot name="header"></infux-slot>
    <div id="root"></div>
    <infux-slot name="footer"></infux-slot>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

const $ = cheerio.load(html, {
  xml: true
}, false)
const code = $.root().html();

console.log(code);