(ns time.main)

(defn foldr [fnc base lst]
  (if (empty? lst)
    base
    (fnc (first lst) (foldr (rest lst)))))

(defn foldl [fnc base lst]
  (if (empty? lst)
    base
    (foldl fnc (fnc (first lst) base) (rest lst))))

; truncate the time by prefixing it with a 0 as needed
(defn padTime [pad k]
  ;; (js/console.log (str (repeat (- pad (.-length (str k))) 0)))
  (foldl str k (repeat (- pad (.-length (str k))) 0)))

; get times from the javascript date object
(defn getTimes []
  (let [date (js/Date.)]
    (let [hrs (.getHours date)
          min (.getMinutes date)
          sec (.getSeconds date)]
      [hrs, min, sec])))

; get the current time
(defn getStandardTime []
  (let [date (js/Date.)]
    (let [hrs (padTime 2 (.getHours date))
          min (padTime 2 (.getMinutes date))
          sec (padTime 2 (.getSeconds date))]
    (str hrs ":" min ":" sec))))

;; (defn remainder [x y] (* (Math/floor (/ y x)) y))

;; get the number of seconds that have passed
(defn getSeconds []
  (let [date (js/Date.)]
    (let [hrs (.getHours date)
          min (.getMinutes date)
          sec (.getSeconds date)]
      (+ sec (* 60 (+ min (* hrs 60)))))))

; get the neralie time
(defn getNeralieTime []
  (let [pulses (/ (getSeconds) 86.4)]
    (let [beat (Math/floor pulses)
          pulse (.substring (str (Math/floor (* pulses 1000))) 3)]
      (str (padTime 3 beat) ":" (padTime 3 pulse)))))

; update the website with the current time
(defn setCurrentTime [elementId getTimeFunc]
    (set! (.-innerText (.getElementById js/document elementId)) (getTimeFunc))
    (js/setTimeout (fn [] (setCurrentTime elementId getTimeFunc)) 0))

;; list of clocks to use and their names
(def CLOCKLIST (list (list "clock" getStandardTime)
                     (list "neralie" getNeralieTime)))

;; given an element of the clocklist, make
(defn makeElement [ls]
  (let [elem (.createElement js/document "div")
        elemId (first ls)
        elemTimeFunc (nth ls 1)]
    (.setAttribute elem "id" elemId)
    (.setAttribute elem "class" "site__title")
    (.appendChild (.-body js/document) elem)
    (setCurrentTime elemId elemTimeFunc)))

(run! makeElement CLOCKLIST)
