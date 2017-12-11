(defn uniqueWords? [line]
  (let [words (clojure.string/split line #"\s")
        uniques (set words)]
    (= (count words) (count uniques))))

(count
 (with-open [rdr (clojure.java.io/reader "./input.txt")]
     (->> (line-seq rdr)
          (filter #(uniqueWords? %))
          (doall))))
