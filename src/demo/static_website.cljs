(ns demo.static-website)

; truncate the time by prefixing it with a 0 as needed
(defn updateTime [k]
  (if (< k 10) (str "0" k) k))

; get the current time
(defn getStandardTime []
  (let [date (js/Date.)]
    (let [hrs (updateTime (.getHours date))
          min (updateTime (.getMinutes date))
          sec (updateTime (.getSeconds date))]
    (str hrs ":" min ":" sec))))

; update the website with the current time
(defn setCurrentTime [elementId getTimeFunc]
    (set! (.-innerText (.getElementById js/document elementId)) (getTimeFunc))
    (js/setTimeout (fn [] (setCurrentTime elementId getTimeFunc)) 1000))

;; start the code
(setCurrentTime "clock" getStandardTime)
