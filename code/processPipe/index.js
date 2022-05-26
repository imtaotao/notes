const { spawn } = require('child_process')

const child = spawn(`node ${__dirname}/output.js`, {
  shell: true,
  windowsHide: true,
});

const noTitle = true;
const title = 'Child'
const concatTittle = (data) => {
  if (!noTitle) return data;
  data = String(data)
  return data.split('\n').reduce((p, c, i) => {
    return `${p}${i ? '\n' : ''}${title} ${c}`
  }, '')
}

// 这种情况建议使用 transform 流，这样不用自己实现 pipe
child.stdout.on('data', data => {
  if(!process.stdout.write(concatTittle(data))) {
    child.stdout.pause();
    process.stdout.once('drain', () => child.stdout.resume());
  };
})

child.stderr.on('data', data => {
  if(!process.stdout.write(concatTittle(data))) {
    child.stderr.pause();
    process.stderr.once('drain', () => child.stderr.resume());;
  };
})
