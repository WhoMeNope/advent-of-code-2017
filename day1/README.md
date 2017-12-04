***SPOILERS AHEAD***

## day 1

All about strings of digits

### challenge 1

Sum of digits with the same following digit.

```javascript
input = input.replace(/(\d)(?!\1)/g, '');
```

then reduce to a sum

### challenge 2

Sum of digits that have the same digit at a position shifted by half the buffer size

```javascript
let input1 = input.slice(0, input.length / 2);
let input2 = input.slice(input.length / 2, input.length);
```

then filter the equal digits at the same postitions
then reduce to sum
then *2 (the buffer is circular)
