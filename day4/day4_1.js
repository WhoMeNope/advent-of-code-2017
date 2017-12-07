fs = require('fs')

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

function getLineValidity(line) {
  let words = line.split(' ');
  let uniques = unique(words);

  return words.length === uniques.length ? 1 : 0;
}

function unique(words) {
  let seen = {};
  return words.filter((w) => {
    if(w in seen) {
      return false;
    }
    seen[w] = undefined;
    return true;
  });
}
