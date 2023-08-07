const path = require('path');
const walk = require('walk');

function start() {
  let hasError;
  const data = [];
  const rootDir = __dirname;
  const prefix = path.dirname(rootDir);

  walk.walkSync(rootDir, {
    listeners: {
      file(root, { name }, next) {
        if (path.extname(name) === '.css') {
          data.push(`${root.replace(prefix, '')}/${name}`);
        }
        next();
      },
      errors(root, nodeStatsArray, next) {
        hasError = true;
        nodeStatsArray.forEach(({ error }) => {
          console.log(error);
        });
        next();
      },
    },
  });
  return hasError || data;
}

console.log(start());
