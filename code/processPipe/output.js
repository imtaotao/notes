let i = 0;
setInterval(() => {
  console.clear();
  console.log(i++);
  console.log(`I'm child \nprocess output.`.repeat(20));
}, 1000);
