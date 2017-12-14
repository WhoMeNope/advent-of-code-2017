let fs = require('fs')

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  //parse input
  let input = data.split(',');

  //take a step and calculate distance
  let stepsN = 0,
      stepsNE = 0,
      stepsNW = 0;
  let furthest = 0;
  input
    // .slice(0, 200)
    .map(
    (val) => {
      switch(val) {
        case 'n':
          stepsN++;
          break;
        case 's':
          stepsN--;
          break;
        case 'nw':
          stepsNW++;
          break;
        case 'se':
          stepsNW--;
          break;
        case 'ne':
          stepsNE++;
          break;
        case 'sw':
          stepsNE--;
          break;
      }

      let dist = calcDistace(stepsN, stepsNE, stepsNW);
      if (dist > furthest)
        furthest = dist;
    }
  );

  console.log(furthest);
});

function calcDistace(stepsN, stepsNE, stepsNW) {
  stepsN = Math.abs(stepsN);
  stepsNE = Math.abs(stepsNE);
  stepsNW = Math.abs(stepsNW);

  while (stepsNE > 0 && stepsNW > 0) {
    stepsN++;
    stepsNE--;
    stepsNW--;
  }

  return stepsN + stepsNE + stepsNW;
}
