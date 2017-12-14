fs = require('fs')

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  //parse input
  let input = data.split('\n').reduce(
    (acc, val) => {
      let o = line2Obj(val);
      acc.push(o);
      return acc;
    },
    []
  );

  let registers = {};
  for(inst of input) {
    //init condition reg if non existent
    if (!(inst.conditionRegister in registers))
      registers[inst.conditionRegister] = 0;

    let satisfies = resolveCondition(registers[inst.conditionRegister], inst.comparison, inst.conditionValue);

    if(satisfies) {
      //init reg if non existent
      if (!(inst.register in registers))
        registers[inst.register] = 0;

      if (inst.operation == 'inc')
        registers[inst.register] += inst.value;
      if (inst.operation == 'dec')
        registers[inst.register] -= inst.value;
    }
  }

  let highest = 0;
  for(key in registers) {
    let regVal = registers[key];
    if(regVal > highest)
      highest = regVal;
  }

  console.log(highest);
});

function resolveCondition(regVal, comparison, val) {
  switch(comparison) {
    case '==':
      return regVal == val;
    case '>=':
      return regVal >= val;
    case '<=':
      return regVal <= val;
    case '>':
      return regVal > val;
    case '<':
      return regVal < val;
    case '!=':
      return regVal != val;
  }
}

function line2Obj(line) {
  let out = {};

  let [instruction, condition] = line.split(' if ');

  [out.register, out.operation, out.value] = instruction.split(' ');
  out.value = parseInt(out.value);
  
  [out.conditionRegister, out.comparison, out.conditionValue] = condition.split(' ');
  out.conditionValue = parseInt(out.conditionValue);
  
  return out;
}
