const fs = require('fs');

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  //parse input
  let input = data.split(',');

  //setup
  let dancers = [];
  for(let i = 0; i < 16; i++)
    dancers.push(String.fromCharCode('a'.charCodeAt(0)  + i));

  console.log(dancers.join(''));

  //execute moves
  for(let move of input) {
    let type = move.slice(0, 1);
    let params = move.slice(1, move.length);
    switch(type) {
      case 's':
        //spin
        let num = parseInt(params);
        let end = dancers.splice(dancers.length - num, dancers.length);
        dancers.splice(0, 0, ...end);
        break;

      case 'x':
        //switch places
        let pos = params.split('/');
        pos = pos.map((el) => parseInt(el, 10));
        
        let t = dancers[pos[0]];
        dancers[pos[0]] = dancers[pos[1]];
        dancers[pos[1]] = t;
        break;

      case 'p':
        //switch elems
        let elems = params.split('/');
        let locs = [
          dancers.indexOf(elems[0]),
          dancers.indexOf(elems[1]),
        ];

        let t2 = dancers[locs[0]];
        dancers[locs[0]] = dancers[locs[1]];
        dancers[locs[1]] = t2;

        break;
    }
  }

  console.log(dancers.join(''));

});
