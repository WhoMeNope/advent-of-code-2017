***SPOILERS AHEAD***

# day 4

Duplicate word detection

## challenge 1

```javascript
let words = line.split(' ');
```

```javascript
function countInstances(string, word) {
  var substrings = string.split(' ' + word);
  return substrings.length - 1;
}
```
