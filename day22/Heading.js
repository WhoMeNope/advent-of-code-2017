const HEADING = module.exports = {
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4,

  turnRight: function(heading) {
    heading++;
    if(heading == 5) heading = 1;
    return heading;
  },
  turnLeft: function(heading) {
    heading--;
    if(heading == 0) heading = 4;
    return heading;
  },
  reverse: function(heading) {
    switch(heading) {
      case HEADING.UP:
        return HEADING.DOWN;
      case HEADING.DOWN:
        return HEADING.UP;
      case HEADING.LEFT:
        return HEADING.RIGHT;
      case HEADING.RIGHT:
        return HEADING.LEFT;
    }
  }
};
