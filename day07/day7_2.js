const fs = require('fs');

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

  for (let j = 0; j < 100; j++) {

    for (let i = 0; i < input.length; ) {
      let el = input[i];

      //is leaf -> delete if all leaves equal
      if(el.children.length == 0) {
        let parent = findParent.call(input, el);

        if(!childrenEqual.call(input, parent)) {
          i++;
        }
        else {
          parent.weight += el.weight;
          parent.children.splice(parent.children.indexOf(el.name), 1);
          input.splice(i, 1);
        }
      }
      //inside of tree -> skip
      else {
        i++;
      }
    }

  }

  console.log(input);
});

function childrenEqual(elem) {
  if(!elem.children || elem.children.length < 2)
    return true;

  let childWeight = findElem.call(this, elem.children[0]).weight;
  for(let i = 1; i < elem.children.length; i++) {
    let t = findElem.call(this, elem.children[i]).weight;
    if(t != childWeight)
      return false;
  }

  return true;
}

function findParent(elem) {
  for (let e of this) {
    for (let i = 0; i < e.children.length; i++) {
      if (e.children[i] == elem.name)
        return e;
    }
  }
  return undefined;
}
function findElem(name) {
  for (let e of this) {
    if (e.name == name)
      return e;
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
