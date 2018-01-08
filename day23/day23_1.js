const fs = require('fs');
const Register = require('./Register');

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {  
    return console.log(err);
  }

  let input = data.split('\n');
  let regs = new Register();

  let multiplies = 0;

  for(let i = 0; i < input.length; ) {
    let parts = input[i].split(' ');

    switch(parts[0]) {
      case 'set':
        regs.set(parts[1], parts[2]);
        i++;
        break;

      case 'sub':
        regs.sub(parts[1], parts[2]);
        i++;
        break;

      case 'mul':
        multiplies++;
        regs.mul(parts[1], parts[2]);
        i++;
        break;

      case 'jnz':
        let cond = regs.get(parts[1]), 
            val  = regs.get(parts[2]);
        i += cond != 0 ? val : 1;
        break;

      default:
        i++;
        break;
    }
  }

  console.log(multiplies);
});
