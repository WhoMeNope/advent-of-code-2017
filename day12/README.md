***SPOILERS AHEAD***

# day 12

Backtrack interconnected graphs

## challenge 1

Determine number of connections in a group

```javascript
let conns = {};
function markConns(id) {
  conns[id] = undefined;
  for(let child of pipes[id]) {
    if(child != id && !(child in conns))
      markConns(child);
  }
};
markConns(0);
```

## challenge 2

Count number of groups in the whole data set

```javascript
function markConns(id, groupId) {
  if(!(id in pipes))
    return;

  if(groupId === undefined)
    groupId = inGroup(id);
  else
    groups[groupId][id] = undefined;

  let children = pipes[id];
  delete pipes[id];
  for(let child of children) {
    if(child != id && !(child in groups[groupId]))
      markConns(child, groupId);
  }
};
```
