fs = require('fs')

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let nums = data.split('\n').map(function(num) { return parseInt(num); });
  let size = nums.length;

  let steps = 0,
      index = 0;
  while (inArray(size, index)) {
    nums[index] += 1;
    index += nums[index] - 1;

    steps++;
  }

  console.log(steps);
});

function inArray(size, index) {
  if(index >= size)
    return false;
  if(index < 0)
    return false;

  return true;
}
