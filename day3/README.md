***SPOILERS AHEAD***

# day 3

Spiraling sequence of numbers in 2d grid

## challenge 1

- find size of the square containing given number (vertical distance)
- find side containing given number and the distance from side center (horizontal distance)

## challenge 2

```javascript
function valAtIndex(index) {
	if(index <= precomputed)
		return sequence[index-1];

	let neighbours = adjacent(index);

	let val = 0;
	for(let n of neighbours)
		val += valAtIndex(n);

	return val;
}
```

But, no direct way to get element's filed neighbours..

- use corners as anchor points, keeping track of the current corner in this and previous squares
- handle special cases by itself (first and last two elements in a square)
