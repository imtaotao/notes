const Arborist = require('@npmcli/arborist');

(async () => {
  const arb = new Arborist();
  const data = await arb.buildIdealTree({
    add: ['garfish'],
  });

  console.log(Object.keys(data));
  console.log(data.children);
  debugger;
})();
