const fs = require('fs');
const Register = require('./Register');

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let input = data.split('\n'); 

  let lastPlayed = 0;
  let regs = new Register();
  
  for(let i = 0; i < input.length; ) {
    let parts = input[i].split(' ');

    switch(parts[0]) {
      case 'snd':
        lastPlayed = regs.get(parts[1]);
        i++;
        break;

      case 'rcv':
        let t = regs.get(parts[1]);
        if(t != 0)
          return console.log(lastPlayed);

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
});
