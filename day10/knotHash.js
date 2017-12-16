function Hasher(size) {
  this.getLength = function (start, len) {
    start = start % this.hash.length;

    let segment = [];

    let pos = start;
    for (let i = len; i > 0; i--) {
      if (pos >= this.hash.length)
        pos -= this.hash.length;
      segment.push(this.hash[pos]);
      pos++;
    }

    return segment;
  }
  this.reversePart = function (start, len) {
    start = start % this.hash.length;

    let segment = this.getLength(start, len);

    let pos = start;
    for (let i = len; i > 0; i--) {
      if (pos >= this.hash.length)
        pos -= this.hash.length;
      this.hash[pos] = segment.pop();
      pos++;
    }
  }
  this.densify = function (size) {
    let hashes = [];
    let pos = 0;

    while (pos < this.hash.length) {
      let t = 0;
      for (let i = 0; i < size; i++) {
        if (i == 0)
          t = this.hash[pos];
        else
          t = t ^ this.hash[pos];

        pos++;
      }
      hashes.push(t);
    }

    return hashes;
  };

  this.hash = [];
  this.init = function (size) {
    for (let i = 0; i < size; i++)
      this.hash.push(i);
    return this.hash;
  }
  this.hash = this.init(size);

  this.hashComplete = function (input) {
    //add default values
    input.push(17, 31, 73, 47, 23);

    const maxRounds = 64;

    //run the algo
    let currentPos = 0,
      skipSize = 0;

    for (let round = 0; round < maxRounds; round++) {
      for (let l of input) {
        this.reversePart(currentPos, l);
        currentPos += l + skipSize;
        skipSize++;
      }
    }

    let denseHash = this.densify(16);
    return denseHash;
  };
}

module.exports = Hasher;
