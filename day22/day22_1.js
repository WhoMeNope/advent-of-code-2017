'use strict';

const fs = require('fs');
const HEADING = require('./Heading');
const InfiniteGrid = require('./InfiniteGrid');

let Sporifica = function(grid) {
  let x = 0, y = 0;
  let heading = HEADING.UP;

  let infections = 0;

  this.step = function() {
    //turn
    if(grid.get(x, y) === '#')
      heading = HEADING.turnRight(heading);
    else
      heading = HEADING.turnLeft(heading);

    //flip
    if(grid.get(x, y) === '#')
      grid.set(x, y, '.');
    else {
      grid.set(x, y, '#');
      infections++;
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

  for(let i = 0; i < 10000; i++) {
    spor.step();
    // grid.print();
  }

  console.log(spor.infections());
});
