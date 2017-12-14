***SPOILERS AHEAD***

# day 5

Follow array indexes while mutating the array

## challenge 1

```javascript
let steps = 0,
    index = 0;
while (inArray(size, index)) {
  nums[index] += 1;
  index += nums[index] - 1;
  steps++;
}
```

## challenge 2

Let's generalize this type of operation as it is quite common for these types of challenges

```javascript
Array.prototype.track = function (condition, operation) {
  let steps = 0;
  let index = 0;

  while(condition(index)) {
    index = operation(index, this);
    steps++;
  }
  return steps;
}
```

Then, with a bit of currying magic, we get this decent-looking solution:

```javascript
let steps = nums.trackIn(
  (index, array) => {
    let t = array[index];
    t >= 3 ? array[index] -= 1 : array[index] += 1;
    return index + t;
  }
);
```