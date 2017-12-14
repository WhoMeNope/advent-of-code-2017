fs = require('fs');

var readable = fs.createReadStream("./input", {
  encoding: 'utf8',
  fd: null,
});
readable.on('readable', function () {
  var char;

  let inGarbage = false;
  let blockDepth = 0;
  let score = 0;

  while (null !== (char = readable.read(1))) 
  {
    switch(char) {
      case '{':
        if(!inGarbage) {
          blockDepth++;
        }
        else
          score++;

        break;

      case '}':
        if (!inGarbage) {
          blockDepth--;
        }
        else
          score++;

        break;

      case '!':
        //skip one character
        char = readable.read(1);
        break;

      case '<':
        if(inGarbage)
          score++
        else
          inGarbage = true;
        break;

      case '>':
        inGarbage = false;
        break;

      case ',':
        if(inGarbage)
          score++;
        break;

      default:
        score++;
        break;
    }
  }

  console.log(score);
});
