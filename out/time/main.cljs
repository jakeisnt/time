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
(defn getTimes [ & [d]]
  (let [date (if d d (js/Date.))]
    (let [hrs (.getHours date)
          min (.getMinutes date)
          sec (.getSeconds date)]
      {:hrs hrs :mins min :secs sec})))

; get the current time
(defn getStandardTime []
  (let [date (getTimes)]
    (let [hrs (padTime 2 (:hrs date))
          min (padTime 2 (:mins date))
          sec (padTime 2 (:secs date))]
    (str hrs ":" min ":" sec))))

;; get the number of seconds that have passed
(defn getSeconds []
  (let [date (getTimes)]
    (let [hrs (:hours date)
          min (:mins date)
          sec (:secs date)]
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
(def CLOCKLIST (list (list "numclock" getStandardTime)
                     (list "numneralie" getNeralieTime)))

;; from https://medium.com/@abhi95.saxena/make-an-analog-clock-using-javascript-7c07580ea91b
(defn runClock []
  (let [hourhand (.querySelector js/document "#hour")
       minutehand (.querySelector js/document "#minute")
       secondhand (.querySelector js/document "#second")]
  (let [date (getTimes)]
    (let [hrs (:hrs date)
          min (:mins date)
          sec (:secs date)]
        (let [hrPos (+ (/ (* hrs 360) 12) (/ (/ (* min 360) 60) 12))
              minPos (+ (/ (* min 60) 60) (/ (/ (* sec 60) 60) 60))
              secPos (/ (* sec 360) 60)]
          (set! (.-transform (.-style hourhand)) (str "rotate(" hrPos "deg)"))
          (set! (.-transform (.-style minutehand)) (str "rotate(" minPos "deg)"))
          (set! (.-transform (.-style secondhand)) (str "rotate(" secPos "deg)"))
          (js/setTimeout runClock 1000))))))

;; given an element of the clocklist, make
(defn makeElement [ls]
  (let [elemId (first ls)
        elemTimeFunc (nth ls 1)]
    (setCurrentTime elemId elemTimeFunc)))

(run! makeElement CLOCKLIST)
(runClock)
