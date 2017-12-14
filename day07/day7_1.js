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

  let candidate = input[0];
  while(candidate != undefined) {
    console.log(candidate.name);
    candidate = childOf(input, candidate);
  }
});

function childOf(array, elem) {
  for (let e of array) {

    for (let i = 0; i < e.children.length; i++) {
      if (e.children[i] == elem.name)
        return e;
    }

  }

  return undefined;
}

function line2Obj(line) {
  let out = {};

  let [part1, part2] = line.split(' -> ');

  let nameWeight = part1.split(' ');
  out.name = nameWeight[0];
  out.weight = parseInt(nameWeight[1].slice(1, -1));

  out.children = [];
  if(part2) {
    out.children = part2.split(', ');
  }

  return out;
}
