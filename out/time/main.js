// Compiled by ClojureScript 1.10.597 {}
goog.provide('time.main');
goog.require('cljs.core');
time.main.foldr = (function time$main$foldr(fnc,base,lst){
if(cljs.core.empty_QMARK_.call(null,lst)){
return base;
} else {
return fnc.call(null,cljs.core.first.call(null,lst),time.main.foldr.call(null,cljs.core.rest.call(null,lst)));
}
});
time.main.foldl = (function time$main$foldl(fnc,base,lst){
if(cljs.core.empty_QMARK_.call(null,lst)){
return base;
} else {
return time.main.foldl.call(null,fnc,fnc.call(null,cljs.core.first.call(null,lst),base),cljs.core.rest.call(null,lst));
}
});
time.main.padTime = (function time$main$padTime(pad,k){
return time.main.foldl.call(null,cljs.core.str,k,cljs.core.repeat.call(null,(pad - cljs.core.str.cljs$core$IFn$_invoke$arity$1(k).length),(0)));
});
time.main.getStandardTime = (function time$main$getStandardTime(){
var date = (new Date());
var hrs = time.main.padTime.call(null,(2),date.getHours());
var min = time.main.padTime.call(null,(2),date.getMinutes());
var sec = time.main.padTime.call(null,(2),date.getSeconds());
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(hrs),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(min),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sec)].join('');
});
time.main.getSeconds = (function time$main$getSeconds(){
var date = (new Date());
var hrs = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
return (sec + ((60) * (min + (hrs * (60)))));
});
time.main.getNeralieTime = (function time$main$getNeralieTime(){
var pulses = (time.main.getSeconds.call(null) / 86.4);
var beat = Math.floor(pulses);
var pulse = cljs.core.str.cljs$core$IFn$_invoke$arity$1(Math.floor((pulses * (1000)))).substring((3));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(time.main.padTime.call(null,(3),beat)),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(time.main.padTime.call(null,(3),pulse))].join('');
});
time.main.setCurrentTime = (function time$main$setCurrentTime(elementId,getTimeFunc){
(document.getElementById(elementId).innerText = getTimeFunc.call(null));

return setTimeout((function (){
return time.main.setCurrentTime.call(null,elementId,getTimeFunc);
}),(0));
});
time.main.CLOCKLIST = (new cljs.core.List(null,(new cljs.core.List(null,"numclock",(new cljs.core.List(null,time.main.getStandardTime,null,(1),null)),(2),null)),(new cljs.core.List(null,(new cljs.core.List(null,"numneralie",(new cljs.core.List(null,time.main.getNeralieTime,null,(1),null)),(2),null)),null,(1),null)),(2),null));
time.main.runClock = (function time$main$runClock(){
var hourhand = document.querySelector("#hour");
var minutehand = document.querySelector("#minute");
var secondhand = document.querySelector("#second");
var date = (new Date());
var hrs = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
var hrPos = (((hrs * (360)) / (12)) + (((min * (360)) / (60)) / (12)));
var minPos = (((min * (60)) / (60)) + (((sec * (60)) / (60)) / (60)));
var secPos = ((sec * (360)) / (60));
(hourhand.style.transform = ["rotate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(hrPos),"deg)"].join(''));

(minutehand.style.transform = ["rotate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(minPos),"deg)"].join(''));

(secondhand.style.transform = ["rotate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(secPos),"deg)"].join(''));

return setTimeout(time.main.runClock,(1000));
});
time.main.makeElement = (function time$main$makeElement(ls){
var elemId = cljs.core.first.call(null,ls);
var elemTimeFunc = cljs.core.nth.call(null,ls,(1));
return time.main.setCurrentTime.call(null,elemId,elemTimeFunc);
});
cljs.core.run_BANG_.call(null,time.main.makeElement,time.main.CLOCKLIST);
time.main.runClock.call(null);

//# sourceMappingURL=main.js.map
