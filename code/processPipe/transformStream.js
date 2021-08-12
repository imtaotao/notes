const { spawn } = require('child_process')
const { Transform } = require('stream')

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

class TitleStdout extends Transform {
  _transform(data, encode, next) {
    this.push(concatTittle(data))
    next()
  }
}

const titleStdout = new TitleStdout()
child.stdout.pipe(titleStdout)
titleStdout.pipe(process.stdout)

class TitleStderr extends Transform {
  _transform(data, encode, next) {
    this.push(concatTittle(data))
    next()
  }
}

const titleStderr = new TitleStderr()
child.stderr.pipe(titleStderr)
titleStderr.pipe(process.stderr)
