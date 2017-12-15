let fs = require('fs');

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  //parse input
  let input = data.split('\n');
  let pipes = input.reduce(
    (acc, val) => {
      let [id, children] = val.split(' <-> ');
      acc[parseInt(id)] = children.split(', ').map((el) => parseInt(el));
      return acc;
    },
    {}
  );

  //get connections
  let groups = [];

  function inGroup(id) {
    let group = 0;
    for (let g of groups) {
      if (id in g) {
        return group;
      }
      group++;
    }
    let g = {};
    g[id] = undefined;
    groups.push(g);
    return group;
  }

  function markConns(id, groupId) {
    if(!(id in pipes))
      return;

    if(groupId === undefined)
      groupId = inGroup(id);
    else
      groups[groupId][id] = undefined;

    let children = pipes[id];
    delete pipes[id];
    for(let child of children) {
      if(child != id && !(child in groups[groupId]))
        markConns(child, groupId);
    }
  };

  while(Object.keys(pipes).length > 0) {
    markConns(Object.keys(pipes)[0]);
  }
  console.log(groups);
  console.log(groups.length);
});
