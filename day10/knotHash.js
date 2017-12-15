function Hasher(size) {
  const getLength = function (start, len) {
    start = start % hash.length;

    let segment = [];

    let pos = start;
    for (let i = len; i > 0; i--) {
      if (pos >= hash.length)
        pos -= hash.length;
      segment.push(hash[pos]);
      pos++;
    }

    return segment;
  }
  const reversePart = function (start, len) {
    start = start % hash.length;

    let segment = getLength(start, len);

    let pos = start;
    for (let i = len; i > 0; i--) {
      if (pos >= hash.length)
        pos -= hash.length;
      hash[pos] = segment.pop();
      pos++;
    }
  }
  const densify = function (size) {
    let hashes = [];
    let pos = 0;

    while (pos < hash.length) {
      let t = 0;
      for (let i = 0; i < size; i++) {
        if (i == 0)
          t = hash[pos];
        else
          t = t ^ hash[pos];

        pos++;
      }
      hashes.push(t);
    }

    return hashes;
  };

  var hash = [];
  const init = function (size) {
    for (let i = 0; i < size; i++)
      hash.push(i);
    return hash;
  }
  hash = init(size);

  const hashComplete = function (input) {
    //add default values
    input.push(17, 31, 73, 47, 23);

    const maxRounds = 64;

    //run the algo
    let currentPos = 0,
      skipSize = 0;

    for (let round = 0; round < maxRounds; round++) {
      for (let l of input) {
        reversePart(currentPos, l);
        currentPos += l + skipSize;
        skipSize++;
      }
    }

    let denseHash = densify(16);
    return denseHash;
  };

  return {
    round: reversePart,
    dense: densify,
    get: () => hash,
    hash: hashComplete
  };
}

module.exports = Hasher;
