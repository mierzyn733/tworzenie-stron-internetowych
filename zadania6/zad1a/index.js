
const chalk = require('chalk');

for (let i = 1; i <= 100; i++) {
  let output;
  
  if (i % 15 === 0) {
    output = chalk.magenta(i);
  } else if (i % 3 === 0) {
    output = chalk.red(i);
  } else if (i % 5 === 0) {
    output = chalk.blue(i);
  } else {
    output = chalk.white(i);
  }
  
  console.log(output);
}