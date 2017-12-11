***SPOILERS AHEAD***

# day 4

Multi-word strings filtering

full frontal functional style (clojure was an absolute perfection for this)

## challenge 1

Duplicate word detection

```javascript
function getLineValidity(line) {
  let words = line.split(' ');
  let uniques = unique(words);

  return words.length === uniques.length ? 1 : 0;
}
```

```clojure
(defn uniqueWords? [line]
  (let [words (clojure.string/split line #"\s")
        uniques (set words)]
    (= (count words) (count uniques))))
```

## challenge 2

Anagram detection

sort the letters

```clojure
(defn uniqueWords? [line]
  (let [words (clojure.string/split line #"\s")
        uniques (set (map sort words))]
    (= (count words) (count uniques))))
```
