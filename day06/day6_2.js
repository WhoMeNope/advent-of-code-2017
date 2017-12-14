fs = require('fs')

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let containers = data.split('\t').map(function (num) { return parseInt(num); });

  let steps = 0;

  states = [];
  while (states.indexOf(containers.toString()) == -1) {

    //save state
    states.push(containers.toString());
    
    //find the container with most elems
    let index = 0;
    let most = containers.reduce(
      (acc, val) => {
        index++;
        if(val > acc.val) {
          return { index: index - 1, val: val }
        }
        return acc;
      },
      { index: 0, val: 0 }
    );

    //distribute
    let toDivide = most.val;
    let i = most.index + 1;
    containers[most.index] = 0;

    while(toDivide > 0) {
      if(i >= containers.length)
        i -= containers.length;

      containers[i] += 1;
      toDivide--;

      i++;
    }

    steps++;
  }

  console.log(steps);

  let distance = states.length - states.indexOf(containers.toString());

  console.log(distance);
});
