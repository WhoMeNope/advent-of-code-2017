fs = require('fs')

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  //parse input
  let input = data.split('').map((el) => el.charCodeAt(0));
  input.push(17, 31, 73, 47, 23);

  //create the hash
  let hash = Hash(256);

  //run the algo
  const maxRounds = 64;
  let currentPos = 0,
      skipSize = 0;
  for (let round = 0; round < maxRounds; round++) {
    for (l of input) {
      hash.round(currentPos, l);
      currentPos += l + skipSize;
      skipSize++;
    } 
  }

  let denseHash = hash.dense(16);

  //print the hash
  console.log(denseHash.map((el) => el.toString(16)).join(''));
});

const Hash = function(size) {
  const getLength = function(start, len) {
    start = start % hash.length;

    let segment = [];

    let pos = start;
    for (let i = len; i > 0; i--) {
      if (pos >= hash.length)
        pos -= hash.length;
      segment.push(hash[pos]);
      pos++;
    }

    return segment;
  }
  const reversePart = function(start, len) {
    start = start % hash.length;

    let segment = getLength(start, len);

    let pos = start;
    for (let i = len; i > 0; i--) {
      if (pos >= hash.length)
        pos -= hash.length;
      hash[pos] = segment.pop();
      pos++;
    }
  }
  const densify = function(size) {
    let hashes = [];
    let pos = 0;

    while (pos < hash.length) {
      let t = 0;
      for (let i = 0; i < size; i++) {
        if (i == 0)
          t = hash[pos];
        else
          t = t ^ hash[pos];

        pos++;
      }
      hashes.push(t);
    }

    return hashes;
  };

  var hash = [];
  const init = (size) => {
    for (let i = 0; i < size; i++)
      hash.push(i);
    return hash;
  }
  hash = init(size);

  return {
    round: reversePart,
    dense: densify,
    get: () => hash,
  };
}
