const fs = require('fs');
const path = require('path');
const cmdShim1 = require('cmd-shim');
const cmdShim2 = require('@zkochan/cmd-shim');

;(async () => {
  const pkg = {
    bin: {
      test: './test.js',
    }
  }
  const binName = 'test';
  const thisDest = __dirname;
  const binDest = `${thisDest}/.bin`;
  const src = path.resolve(thisDest, pkg.bin[binName]);
  
  if (fs.existsSync(src)) {
    fs.chmodSync(src, 0o755);
  }
  if (!fs.existsSync(binDest)) {
    fs.mkdirSync(binDest, { recursive: true });
  }

  await cmdShim2.ifExists(src, `${binDest}/${binName}`, { createPwshFile: false, createCmdFile: true });
  // await cmdShim1.ifExists(src, `${binDest}/${binName}`, { createPwshFile: false });
})();