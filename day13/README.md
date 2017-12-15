***SPOILERS AHEAD***

# day 13

Navigate through sequence of oscillating buffers

## challenge 1

```javascript
//simulate move
let time = 0, pos = 0;
let severinity = 0;
while(pos <= last)
{
  //if in layer and scanner at zeroeth index
  let range = layers[pos];
  if (range) {
    if(time % (range * 2 - 2) == 0) {
      severinity += range * pos;
    } 
  }

  time++;
  pos++;
}
```

## challenge 2

Find the smallest needed delay for no-collision pass through the whole thing

(zero severinity crashes still count)

```javascript
if ((time) % (range * 2 - 2) == 0) {
  severinity += Math.max(range * pos, 1);
}
``` 
