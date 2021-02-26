(ns demo.static-website)

(js/console.log "Hello, Github Pages!")

; truncate the time by prefixing it with a 0 as needed
(defn updateTime [k]
  (if (< k 10) (str "0" k) k))

; get the current time
(defn getCurrentTime []
  (let [date (js/Date.)]
    (let [hrs (updateTime (.getHours date))
          min (updateTime (.getMinutes date))
          sec (updateTime (.getSeconds date))]
    (str hrs ":" min ":" sec))))

; update the website with the current time
(defn setCurrentTime []
    (set! (.-innerText (.getElementById js/document "clock")) (getCurrentTime))
    (js/setTimeout setCurrentTime 1000))

;; start the code
(setCurrentTime)
