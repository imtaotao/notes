const { spawn } = require('child_process')

const child = spawn(`node ${__dirname}/output.js`, {
  shell: true,
  windowsHide: true,
});

let stdout = ''
let stderr = ''
let combined = ''
const title = 'Child'

const concatTittle = (data) => {
  data = String(data)
  return data.split('\n').reduce((p, c) => `${p}\n${title} ${c}`, '')
}

process.stdout.on( 'drain', () => child.stdout.resume());
child.stdout.on('data', data => {
  stdout += data;
  combined += data;
  if( !process.stdout.write(concatTittle(data)) ) {
    child.stdout.pause();
  };
})

process.stderr.on( 'drain', () => child.stderr.resume());
child.stderr.on('data', data => {
  stderr += data;
  combined += data;
  if( !process.stdout.write(concatTittle(data)) ) {
    child.stderr.pause();
  };
})
