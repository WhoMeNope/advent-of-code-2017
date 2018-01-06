const fs = require('fs');

const HEADING = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3
};

let visited = [];

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let input = data.split('\n').map((line) => line.split(''));
  let y = 0, x = input[y].indexOf('|');
  let heading = HEADING.DOWN;
  let steps = 0;

  while(true) {
    //move
    if(heading === HEADING.DOWN)
      y++;
    else if(heading === HEADING.UP)
      y--;
    else if(heading === HEADING.LEFT)
      x--;
    else if(heading === HEADING.RIGHT)
      x++;

    steps++;
    
    //decide
    let current = input[y][x];
    if(current === '|' || current === '-')
      continue;
    else if(current === '+') {
      heading = findHeading(input, x, y, heading);
    }
    else if(current === ' ')
      break;
    else {
      visited.push(current);
    }
  }

  console.log(visited.join(''), steps);
});

function findHeading(diagram, x, y, heading) {
  if(heading !== HEADING.DOWN && (diagram[y-1][x] != ' '))
    return HEADING.UP;
  if(heading !== HEADING.UP && (diagram[y+1][x] != ' '))
    return HEADING.DOWN;
  if(heading !== HEADING.LEFT && (diagram[y][x+1] != ' '))
    return HEADING.RIGHT;
  if(heading !== HEADING.RIGHT && (diagram[y][x-1] != ' '))
    return HEADING.LEFT;
}
