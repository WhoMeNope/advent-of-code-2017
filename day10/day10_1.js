const fs = require('fs');

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  //parse input
  let input = data.split(',').map((el) => parseInt(el));

  //create the hash
  let hash = hashInit(256);

  //run the algo
  let currentPos = 0,
      skipSize = 0;
  for (let l of input) {
    hash = reversePart(hash, currentPos, l);
    currentPos += l + skipSize;
    currentPos = currentPos % hash.length;
    skipSize++;
  }

  //print the hash
  console.log(hash.toString());
});

function reversePart(hash, start, len) {
  start = start % hash.length;

  let segment = getLength(hash, start, len);

  let pos = start;
  for (let i = len; i > 0; i--) {
    if (pos >= hash.length)
      pos -= hash.length;
    hash[pos] = segment.pop();
    pos++;
  }

  return hash;
}

function getLength(hash, start, len) {
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

function hashInit(size) {
  let hash = [];
  for (let i = 0; i < size; i++)
    hash.push(i);
  return hash;
}
