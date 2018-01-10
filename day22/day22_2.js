'use strict';

const fs = require('fs');
const HEADING = require('./Heading');
const InfiniteGrid = require('./InfiniteGrid');

let Sporifica = function(grid) {
  let x = 0, y = 0;
  let heading = HEADING.UP;

  let infections = 0;

  this.step = function() {
    //turn & modify
    switch(grid.get(x, y)) {
      case '.':
        heading = HEADING.turnLeft(heading);
        grid.set(x, y, 'W');
        break;

      case 'W':
        infections++;
        grid.set(x, y, '#');
        break;

      case '#':
        heading = HEADING.turnRight(heading);
        grid.set(x, y, 'F');
        break;

      case 'F':
        heading = HEADING.reverse(heading);
        grid.set(x, y, '.');
        break;
    }

    //move
    switch(heading) {
      case HEADING.UP:
        y--;
        break;
      case HEADING.DOWN:
        y++;
        break;
      case HEADING.LEFT:
        x--;
        break;
      case HEADING.RIGHT:
        x++;
        break;
    }
  }

  this.infections = function() {
    return infections;
  }
}

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let grid = new InfiniteGrid(data);
  let spor = new Sporifica(grid);

  // grid.print();

  for(let i = 0; i < 10000000; i++) {
    spor.step();
    // grid.print();
  }

  console.log(spor.infections());
});
