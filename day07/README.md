***SPOILERS AHEAD***

# day 7

Reconstruct tree data structure

## challenge 1

Find the topmost element.

1. pick random elem
2. find elems's parent
3. if none, it's the topmost, else goto 2

## challenge 2

Find the one element with incorrect weight

1. merge children into parents, where possible (correct weights)
2. repeat until all possible children are merged
3. find the deepest element in the merged structure
4. find its siblings
5. deduce the needed new weight
