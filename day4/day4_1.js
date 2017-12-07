fs = require('fs')

function countInstances(string, word) {
  var substrings = string.split(' ' + word);
  return substrings.length - 1;
}

function getLineValidity(line) {
  let elements = line.split(' ');
  let isFirst = true;

  for(el of elements) {
    let count = countInstances(line, el);

    if(!isFirst)
      count--;

    if(count > 0)
      return 0;

    isFirst = false;
  }

  return 1;
}

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let sum = data.split('\n').reduce(
    (acc, line) => acc + getLineValidity(line),
    0
  );

  console.log(sum);
});
