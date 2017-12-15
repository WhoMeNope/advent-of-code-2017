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
  let conns = {};
  function markConns(id) {
    conns[id] = undefined;
    for(let child of pipes[id]) {
      if(child != id && !(child in conns))
        markConns(child);
    }
  };
  markConns(0);

  let connCount = 0;
  for(let key in conns)
    connCount++;

  console.log(connCount);
});
