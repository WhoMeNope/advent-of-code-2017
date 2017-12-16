const Hasher = require('../day10/knotHash');

const input = 'hwlqcszp';

function markMemory(key) {
  let memory = [];

  //generate memory from hash
  for(let i = 0; i < 128; i++) {
    let seed = key + '-' + i.toString(10);
    seed = seed.split('').map((el) => el.charCodeAt(0));

    let hasher = new Hasher(256);
    let hash = hasher.hashComplete(seed);

    hash = hash
      .map((el) => pad(el.toString(16), 2))
      .join('').split('')
      .map((el) => pad(parseInt(el, 16).toString(2), 4))
      .join('').split('')
      .map((el) => el == '1' ? "#" : ".");

    // console.log(hash.join(''));

    memory.push(hash);
  }

  //mark regions
  let regions = 0;
  function mark(y, x) {
    let current = memory[y][x];

    //if not part of a region - create new
    if (current == '#') {
      regions++;
      current = regions;
      memory[y][x] = current;
    }
    //if empty or already done ignore
    else if (current == '.' || current < regions)
      return;

    //set neigbors to the same region
    let recurses = [];
    if (x > 0)
      if (memory[y][x - 1] == '#') {
        memory[y][x - 1] = current;
        recurses.push([y, x - 1]);
      } 
    if (x < memory[y].length - 1)
      if (memory[y][x + 1] == '#') {
        memory[y][x + 1] = current;
        recurses.push([y, x + 1]);
      }
    if (y > 0)
      if (memory[y - 1][x] == '#') {
        memory[y - 1][x] = current; 
        recurses.push([y - 1, x]);
      }
    if (y < memory.length - 1)
      if (memory[y + 1][x] == '#') {
        memory[y + 1][x] = current;
        recurses.push([y + 1, x]);
      }

    //recurse for new neighbors
    for(let r of recurses) {
      mark(r[0], r[1]);
    }
  }
  for(let i = 0; i < memory.length; i++) {
    for (let j = 0; j < memory[i].length; j++) {
      mark(i, j);
    }
  }

  // for(let l of memory)
  //   console.log(l.join(''));
  // console.log('\n');

  console.log(regions);
}

markMemory(input);

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
