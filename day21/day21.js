const fs = require('fs');

fs.readFile('./input', 'utf8', function (err, data) {
  if (err) {
    return console.error(err);
  }

  let rules = data.split('\n').map((line) => {
    let parts = line.split(' => ');
    return {
      input: parts[0],
      output: parts[1],
    }
  });

  let grid = ['.#./..#/###'];

  for(let i = 0; i < 18; i++) {
    grid = grid.reduce(
      (acc, val) => {
        let t = transformStep(val, rules);
        acc.push(...t);
        return acc;
      },
      []
    );

    //redivide grid
    if((grid.length % 2 == 0) && (grid[0].split('/').length % 2 != 0)) {
      console.log(grid, countOn(grid));
      console.log('redivide');
      grid = redivide(grid);
    }

    console.log(grid, countOn(grid));
  }
});

function redivide(grid) {
  let out = [];

  grid = grid.map((g) => g.split('/'));

  for(let i = 0; i < grid.length; i += 4) {
    let tg = [
      grid[i + 0][0] + grid[i + 1][0],
      grid[i + 0][1] + grid[i + 1][1],
      grid[i + 0][2] + grid[i + 1][2],
      grid[i + 2][0] + grid[i + 3][0],
      grid[i + 2][1] + grid[i + 3][1],
      grid[i + 2][2] + grid[i + 3][2],
    ];
    tg = tg.reduce(
      (acc, val) => {
        acc.push([val.slice(0, 2), val.slice(2, 4), val.slice(4, 6)]);
        return acc;
      },
      []
    );
    out.push(
      tg[0][0] + '/' + tg[1][0],
      tg[0][1] + '/' + tg[1][1],
      tg[0][2] + '/' + tg[1][2],
      tg[2][0] + '/' + tg[3][0],
      tg[2][1] + '/' + tg[3][1],
      tg[2][2] + '/' + tg[3][2],
      tg[4][0] + '/' + tg[5][0],
      tg[4][1] + '/' + tg[5][1],
      tg[4][2] + '/' + tg[5][2]
    );
  }

  return out;
}

function countOn(grid) {
  let out = 0;
  grid.map(
    (sg) => sg.split('').map(
      (c) => {
        if(c == '#') out++;
      }
    )
  )
  return out;
}

function transformStep(grid, rules) {
  let gridSize = grid.split('/').length;

  //split
  if(gridSize == 4) {
    grid = breakToSquare(grid);
    return grid.map(
      (g) => transformStep(g, rules)[0]
    );
  }
  else if (gridSize > 4) {
    throw 'grid size bigger than 4';
  }

  //transform
  return [
    matchRule(grid, rules)
  ];
}

function matchRule(grid, rules) {
  for(let rule of rules) {
    if(symmetricMatch(grid, rule))
      return rule.output;
  }
  return 'not found';
}
function symmetricMatch(grid, rule) {
  if(rule.input == grid)
    return true;

  if(flip(rule.input) == grid)
    return true;
  if(reverse(rule.input) == grid)
    return true;
  if(rotate(rule.input) == grid)
    return true;

  if(reverse(flip(rule.input)) == grid)
    return true;
  if(reverse(rotate(rule.input)) == grid)
    return true;
  if(flip(reverse(rule.input)) == grid)
    return true;
  if(flip(rotate(rule.input)) == grid)
    return true;
  if(rotate(flip(rule.input)) == grid)
    return true;
  if(rotate(reverse(rule.input)) == grid)
    return true;

  if(rotate(reverse(flip(rule.input))) == grid)
    return true;
  if(rotate(flip(reverse(rule.input))) == grid)
    return true;
  if(flip(reverse(rotate(rule.input))) == grid)
    return true;
  if(flip(rotate(reverse(rule.input))) == grid)
    return true;
  if(reverse(flip(rotate(rule.input))) == grid)
    return true;
  if(reverse(rotate(flip(rule.input))) == grid)
    return true;

  return false;
}
function flip(grid) {
  let parts = grid.split('/');
  let out = [];
  for(let i = parts.length - 1; i >= 0; i--) {
    out.push(parts[i]);
  }
  return out.join('/');
}
function reverse(grid) {
  let parts = grid.split('/');
  let out = [];
  for(let i = 0; i < parts.length; i++) {
    out.push(parts[i].split('').reverse().join(''));
  }
  return out.join('/');
}
function rotate(grid) {
  let parts = grid.split('/');
  let out = [];
  for(let j = 0; j < parts.length; j++) {
    let t = '';
    for(let i = 0; i < parts.length; i++) {
      t += parts[i][j];
    }
    out.push(t);
  }
  return out.join('/');
}

function breakToSquare(grid) {
  grid = grid.split('/');
  return [
    grid[0].slice(0, 2) + '/' + grid[1].slice(0, 2),
    grid[0].slice(2, 4) + '/' + grid[1].slice(2, 4),
    grid[2].slice(0, 2) + '/' + grid[3].slice(0, 2),
    grid[2].slice(2, 4) + '/' + grid[3].slice(2, 4),
  ];
}
