***SPOILERS AHEAD***

# day 4

Multi-word strings filtering

full frontal functional style

## challenge 1

Duplicate word detection

```javascript
function getLineValidity(line) {
  let words = line.split(' ');
  let uniques = unique(words);

  return words.length === uniques.length ? 1 : 0;
}
```

## challenge 2

Anagram detection

sort the letters
