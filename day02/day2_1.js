fs = require('fs')

const maxReducer = (acc, val) => acc > parseInt(val) ? acc : val;
const minReducer = (acc, val) => acc < parseInt(val) ? acc : val;

const getLineDiff = (line) => {
	cells = line.split('\t');

	let max = cells.reduce(maxReducer, parseInt(cells[0]));
	let min = cells.reduce(minReducer, parseInt(cells[0]));

	return max - min;
};

fs.readFile('./input.csv', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  let sum = data.split('\n').reduce(
  	(acc, line) => acc + getLineDiff(line),
  	0
  );

  console.log(sum);
});
