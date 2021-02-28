(ns time.main)

(defn foldr [fnc base lst]
  (if (empty? lst)
    base
    (fnc (first lst) (foldr fnc base (rest lst)))))

(defn foldl [fnc base lst]
  (if (empty? lst)
    base
    (foldl fnc (fnc (first lst) base) (rest lst))))

; truncate the time by prefixing it with a 0 as needed
(defn padTime [pad k]
  (foldl str k (repeat (- pad (.-length (str k))) 0)))

; get times from the javascript date object
(defn getTimes [& [d]]
  (let [date (if d d (js/Date.))
        hrs (.getHours date)
        min (.getMinutes date)
        sec (.getSeconds date)]
    {:hrs hrs :mins min :secs sec}))

; get the current time
(defn getStandardTime []
  (let [date (getTimes)
        hrs (padTime 2 (:hrs date))
        min (padTime 2 (:mins date))
        sec (padTime 2 (:secs date))]
    (str hrs ":" min ":" sec)))

;; get the number of seconds that have passed
(defn getSeconds []
  (let [date (getTimes)
        hrs (:hrs date)
        min (:mins date)
        sec (:secs date)]
    (+ sec (* 60 (+ min (* hrs 60))))))

; get the neralie time
(defn getNeralieTime []
  (let [pulses (/ (getSeconds) 86.4)
        beat (Math/floor pulses)
        pulse (.substring (str (Math/floor (* pulses 1000))) 3)]
    (str (padTime 3 beat) ":" (padTime 3 pulse))))

;; get the calendar date!
(defn getCalDate []
  (let [calstr (str (.format (js/Intl.DateTimeFormat. "en" #js {:dateStyle "full"}) (js/Date.)))]
    (.substr calstr (+ 1 (.indexOf calstr " ")))))

;; get number of days in month given year
(defn getDaysInMonth [month year]
  (.getDate (js/Date. year (+ month 1) 0)))

;; generate list (0, 1, 2 .. maxNum)
(defn genListTo [maxnum]
  (letfn [(genAcc [count]
            (if (= count maxnum)
              (list count)
              (cons count (genAcc (+ count 1)))))]
    (genAcc 0)))

(defn getArvelieDate []
  (let
   [date (js/Date.)
    year (- (.getFullYear date) 2020)
    daysInMon (.getDate date)
    daysSoFar (+ daysInMon
                 (foldl
                  (fn [cum month] (+ cum (getDaysInMonth month year)))
                  0
                  (genListTo (.getMonth date))))
    weekNum (Math/floor (/ daysSoFar 14))
    week (if (> weekNum 27) "+" (js/String.fromCharCode (+ weekNum 65)))
    day (rem daysSoFar 14)]
    (str (padTime 2 year) week (padTime 2 day))))

; update the website with the current time
(defn setCurrentTime [elementId getTimeFunc]
  (set! (.-innerText (.getElementById js/document elementId)) (getTimeFunc)))

;; from https://medium.com/@abhi95.saxena/make-an-analog-clock-using-javascript-7c07580ea91b
(defn runClock []
  (let [hourhand (.querySelector js/document "#hour")
        minutehand (.querySelector js/document "#minute")
        secondhand (.querySelector js/document "#second")
        date (getTimes)
        hrs (:hrs date)
        min (:mins date)
        sec (:secs date)
        hrPos (+ (/ (* hrs 360) 12) (/ (/ (* min 360) 60) 12))
        minPos (+ (/ (* min 60) 60) (/ (/ (* sec 60) 60) 60))
        secPos (/ (* sec 360) 60)]
    (set! (.-transform (.-style hourhand)) (str "rotate(" hrPos "deg)"))
    (set! (.-transform (.-style minutehand)) (str "rotate(" minPos "deg)"))
    (set! (.-transform (.-style secondhand)) (str "rotate(" secPos "deg)"))))

;; show age starting at the provided date
;; inspiration: https://github.com/neauoire/age/blob/master/index.html
(defn showAge [date]
  (set! (.-innerText (.getElementById js/document "numage"))
        (.toFixed (/ (- (js/Date.) (js/Date. date)) 31557600000) 9)))

;; start the show age function
(defn start []
  ;; if nothing is provided for the hash, set it to my birthday!
  (if (= "" (.-hash (.-location js/window)))
    (set! (.-hash (.-location js/window)) "1999-11-05") nil)

  (let [datehash (.replace (.-hash (.-location js/window)) "#" "")]
    (js/setTimeout
     (fn []
       (showAge datehash)
       (runClock)
       (setCurrentTime "numclock" getStandardTime)
       (setCurrentTime "numneralie" getNeralieTime)
       (setCurrentTime "caldate" getCalDate)
       (setCurrentTime "arveliedate" getArvelieDate)
       (js/requestAnimationFrame start))
     (/ 1000 30))))

;; start the application
(set! (.-onload js/window) start)
