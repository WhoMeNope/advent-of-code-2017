fs = require('fs')

const divisible = (a, b) => {
  if(a % b === 0) {
    return (a / b);
  } 
  else if (b % a === 0) {
    return (b / a);
  }
  else {
    return 0;
  }
};

const lineResult = (line) => {
	let cells = line.split('\t');

  //console.log(cells);

	for(var i = 0; i < cells.length; i++) {
    for(var j = i + 1; j < cells.length; j++) {
      let r = divisible(parseInt(cells[i]), parseInt(cells[j]));
      if(r > 0) 
        return r;
    } 
  }

  return 0;
};

fs.readFile('./input.csv', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  let sum = data.split('\n').reduce(
  	(acc, line) => acc + lineResult(line),
  	0
  );

  console.log(sum);
});
