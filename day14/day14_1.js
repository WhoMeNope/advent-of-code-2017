const Hasher = require('../day10/knotHash');

const input = 'hwlqcszp';

function usedMemory(key) {
  let total = 0;

  for(let i = 0; i < 128; i++) {
    let seed = key + '-' + i.toString(10);
    seed = seed.split('').map((el) => el.charCodeAt(0));

    let hasher = new Hasher(256);
    let hash = hasher.hashComplete(seed);
    let used = hash
      .map((el) => el.toString(2))
      .join('').split('')
      .reduce((acc, c) => c == '1' ? acc + 1 : acc, 0);

    //print
    // console.log(
    //   hash
    //     .map((el) => pad(el.toString(16), 2))
    //     .join('').split('')
    //     .map((el) => pad(parseInt(el, 16).toString(2), 4))
    //     .join('').split('')
    //     .map((el) => el == '1' ? "#" : ".")
    //     .join('')
    // );

    total += used;
  }

  console.log(total);
}

usedMemory(input);
