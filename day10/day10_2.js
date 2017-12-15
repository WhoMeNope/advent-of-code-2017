let fs = require('fs')
let Hasher = require('./knotHash');

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  //parse input
  let input = data.split('').map((el) => el.charCodeAt(0));
  
  //create the hash
  let hasher = new Hasher(256);
  let denseHash = hasher.hash(input);

  console.log(denseHash.map((el) => el.toString(16)).join(''));
});
