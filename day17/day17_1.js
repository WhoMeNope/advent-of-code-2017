function CirclularBuff() {
  this.insert = function(index, val) {
    index = this.buff.length === 0 ? 0 : index % this.buff.length;
    this.buff.splice(index + 1, 0, val);
    return index + 1;
  }

  this.print = function() {
    console.log(this.buff);
  }

  this.getIndex = function(val) {
    return this.buff.indexOf(val);
  }

  this.valAt = function(index) {
    index = this.buff.length === 0 ? 0 : index % this.buff.length;
    if(this.buff.length === 0) {
      throw "Not inside...";
    }
    return this.buff[index];
  }

  this.buff = [];
}

let buff = new CirclularBuff();

const offset = 329;

let current = 0;
let index = 0;
for(let i = 0; i < 2018; i++) {
  index = buff.insert(index, current);

  index += offset;
  current++;
}

buff.print();
let endIndex = buff.getIndex(2017);
console.log(buff.valAt(endIndex + 1));
