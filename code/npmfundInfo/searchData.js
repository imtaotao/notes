const search = require('libnpmsearch');

function getAllModuleName(data) {
  const names = [];
  for (const val of data) {
    names.push(`${val.name}@${val.version}`);
  }
  return names;
}

(async () => {
  const data = await search('garfish');
  console.log(getAllModuleName(data));
})();