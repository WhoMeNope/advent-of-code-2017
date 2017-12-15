***SPOILERS AHEAD***

# day 14

Loose continuation of day 10 - knot hashing

## challenge 1

Count binary 1s in a range of hashes

```javascript
let used = hash
  .map(
    (el) => el.toString(2)
  )
  .join('').split('')
  .reduce(
    (acc, c) => c == '1' ? acc + 1 : acc,
    0
  );
```

Mind the padding :/

## challenge 2

Count number of regions of adjacent filled squares

Floodfill 
