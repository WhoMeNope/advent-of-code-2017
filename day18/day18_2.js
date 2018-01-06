const fs = require('fs');
const Register = require('./Register');

let regs1 = new Register(), 
    regs2 = new Register();

let i1 = 0, 
    i2 = 0;

let sendQ1 = [];
let sendQ2 = [];

let sends = 0;

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let input = data.split('\n'); 

  regs1.set('p', 0);
  regs2.set('p', 1);

  for(let i = 0; i < 10e5; i++) {
    i1 = run(regs1, i1, input, sendQ1, sendQ2, false);
    i2 = run(regs2, i2, input, sendQ2, sendQ1, true);
  }

  console.log(sends);
});

function run(regs, i, instructions, sendQ, receiveQ, count) {
  for(; i < instructions.length; ) {
    let parts = instructions[i].split(' ');

    switch(parts[0]) {
      case 'snd':
        if(count) sends++;
        sendQ.push(regs.get(parts[1]));
        i++;
        break;

      case 'rcv':
        if(receiveQ.length == 0)
          return i;
        let freq = receiveQ[0];
        receiveQ.splice(0, 1);
        regs.set(parts[1], freq);
        i++;
        break;
      
      case 'set':
        regs.set(parts[1], parts[2]);
        i++;
        break;

      case 'add':
        regs.add(parts[1], parts[2]);
        i++;
        break;

      case 'mul':
        regs.mul(parts[1], parts[2]);
        i++;
        break;

      case 'mod':
        regs.mod(parts[1], parts[2]);
        i++;
        break;

      case 'jgz':
        let cond = regs.get(parts[1]), 
            val  = regs.get(parts[2]);
        i += cond > 0 ? val : 1;
        break;

      default:
        i++;
        break;
    }
  }

  return i;
}
