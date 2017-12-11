fs = require('fs')

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let nums = data.split('\n').map((num) => parseInt(num));

  let steps = nums.trackIn(
    (index, array) => {
      let t = array[index];
      t >= 3 ? array[index] -= 1 : array[index] += 1;
      return index + t;
    }
  );

  console.log(steps);
});

Array.prototype.trackIn = function (operation) {
  return this.track(
    inArrayCurry(this.length),
    operation
  );
}
Array.prototype.track = function (condition, operation) {
  let steps = 0;
  let index = 0;

  while(condition(index)) {
    index = operation(index, this);
    steps++;
  }

  return steps;
}

function inArray(size, index) {
  if (index >= size)
    return false;
  if (index < 0)
    return false;

  return true;
}
function inArrayCurry(size) {
  return function (index) {
    return inArray(size, index);
  }
}
