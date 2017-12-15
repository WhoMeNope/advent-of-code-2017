let fs = require('fs');

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let last = 0;

  //parse input
  let input = data.split('\n');
  let layers = input.reduce(
    (acc, val) => {
      let [id, range] = val.split(': ');
      if(id > last)
        last = id;

      acc[parseInt(id)] = parseInt(range);
      return acc;
    },
    {}
  );

  //simulate move
  let delay = -1;
  let severinity = 1;
  while (severinity > 0) {
    delay++;

    let time = delay,
        pos = 0;
    severinity = 0;

    while (pos <= last) {
      //if in layer and scanner at zeroeth index
      let range = layers[pos];
      if (range) {
        if ((time) % (range * 2 - 2) == 0) {
          severinity += Math.max(range * pos, 1);
        }
      }

      time++; pos++;
    }
  } 

  console.log(delay);
});
