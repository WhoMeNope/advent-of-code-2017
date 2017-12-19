const offset = 329;

let current = 0;
let index = 0;
let length = 1;

let value = 0;

for(let i = 0; i < 50e6; i++) {
  index = (index + 1 + offset) % length;

  current++;

  if(index + 1 == 1) {
    value = current;
  }

  length++;  
}

console.log(value);
