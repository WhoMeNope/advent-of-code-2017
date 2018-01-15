const InfiniteTape = function () {
  this.buffer = [0];
  this.offset = 0;
  this.pos = 0;
}
InfiniteTape.prototype.get = function() {
  return this.buffer[this.pos + this.offset];
}
InfiniteTape.prototype.set = function(v) {
  this.buffer[this.pos + this.offset] = v;
}
InfiniteTape.prototype.right = function() {
  this.pos++;
  if(this.pos + this.offset >= this.buffer.length) {
    this.buffer.push(0);
  }
}
InfiniteTape.prototype.left = function() {
  this.pos--;
  if(this.pos + this.offset < 0) {
    this.buffer.splice(0, 0, 0);
    this.offset++;
  }
}
InfiniteTape.prototype.print = function() {
  let out = '';
  for(let n of this.buffer) {
    out += n + ', ';
  }
  console.log(out);
}
InfiniteTape.prototype.countOnes = function() {
  let out = 0;
  for(let n of this.buffer) {
    n == 1 ? out++ : out;
  }
  return out;
}

let tape = new InfiniteTape();
let state = 'A';

// tape.print();

const steps = 12302209;
for(let i = 0; i < steps; i++)
{
  switch(state) {
    case 'A':
      if(!tape.get()) {
        tape.set(1);
        tape.right();
        state = 'B';
      }
      else {
        tape.set(0);
        tape.left();
        state = 'D';
      }
      break;
      
    case 'B':
      if(!tape.get()) {
        tape.set(1);
        tape.right();
        state = 'C';
      }
      else {
        tape.set(0);
        tape.right();
        state = 'F';
      }
      break;

    case 'C':
      if(!tape.get()) {
        tape.set(1);
        tape.left();
        state = 'C';
      }
      else {
        tape.set(1);
        tape.left();
        state = 'A';
      }
      break;

    case 'D':
      if(!tape.get()) {
        tape.set(0);
        tape.left();
        state = 'E';
      }
      else {
        tape.set(1);
        tape.right();
        state = 'A';
      }
      break;

    case 'E':
      if(!tape.get()) {
        tape.set(1);
        tape.left();
        state = 'A';
      }
      else {
        tape.set(0);
        tape.right();
        state = 'B';
      }
      break;

    case 'F':
      if(!tape.get()) {
        tape.set(0);
        tape.right();
        state = 'C';
      }
      else {
        tape.set(0);
        tape.right();
        state = 'E';
      }
      break;
  }

  // tape.print();
}

console.log(tape.countOnes());
