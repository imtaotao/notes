const { Worker } = require('worker_threads');

const runWorker = (workerData) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`stopped with ${code} exit code`));
    });
  });
};

const main = async () => {
  const result = await runWorker('hello worker threads');
  console.log(result);
};

main().catch((err) => console.error(err));
