var InfiniteGrid = module.exports = function(data) {
  this.grid = data.split('\n').map(
    (line) => line.split('')
  );

  this.yOffset = (this.grid.length - 1) / 2;
  this.xOffset = (this.grid[0].length - 1) / 2;
};
InfiniteGrid.prototype.print = function() {
  for(let line of this.grid) {
    console.log(line.join(''));
  }
  console.log('');
}
InfiniteGrid.prototype.get = function(x, y) {
  //check bounds
  this.checkAndExpand(x, y);

  //get
  return this.grid[y + this.yOffset][x + this.xOffset];
}
InfiniteGrid.prototype.set = function(x, y, v) {
  //check bounds
  this.checkAndExpand(x, y);

  //set
  this.grid[y + this.yOffset][x + this.xOffset] = v;
}
InfiniteGrid.prototype.checkAndExpand = function(x, y) {
  if(y + this.yOffset < 0) {
    let n = [];
    for(let i = 0; i < this.grid[0].length; i++) {
      n.push('.');
    }
    this.grid.splice(0, 0, n);
    this.yOffset++;
  }
  if(y + this.yOffset >= this.grid.length) {
    let n = [];
    for(let i = 0; i < this.grid[this.grid.length - 1].length; i++) {
      n.push('.');
    }
    this.grid.push(n);
  }

  if(x + this.xOffset < 0) {
    for(let i = 0; i < this.grid.length; i++) {
      this.grid[i].splice(0, 0, '.');
    }
    this.xOffset++;
  }
  if(x + this.xOffset >= this.grid[y + this.yOffset].length) {
    for(let i = 0; i < this.grid.length; i++) {
      this.grid[i].push('.');
    }
  }
}
