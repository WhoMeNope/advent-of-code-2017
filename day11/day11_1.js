let fs = require('fs')

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  //parse input
  let input = data.split(',');

  //get number of steps in all directions
  let steps = input.reduce(
    (acc, val) => {
      acc[val] += 1;
      return acc;
    },
    {
      'n': 0,
      's': 0,
      'nw': 0,
      'sw': 0,
      'ne': 0,
      'se': 0,
    }
  );
  //console.log(steps);

  let stepsN = Math.abs(steps.n - steps.s);
  let stepsNE = Math.abs(steps.ne - steps.sw);
  let stepsNW = Math.abs(steps.nw - steps.se);
  // console.log(stepsNE, stepsN, stepsNW);

  while(Math.min(stepsNE, stepsNW) > 0) {
    stepsN++;
    stepsNE--;
    stepsNW--;
  }
  // console.log(stepsNE, stepsN, stepsNW);

  console.log(stepsN + stepsNE + stepsNW);
});
