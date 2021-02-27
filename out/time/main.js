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
time.main.getTimes = (function time$main$getTimes(var_args){
var args__4795__auto__ = [];
var len__4789__auto___531 = arguments.length;
var i__4790__auto___532 = (0);
while(true){
if((i__4790__auto___532 < len__4789__auto___531)){
args__4795__auto__.push((arguments[i__4790__auto___532]));

var G__533 = (i__4790__auto___532 + (1));
i__4790__auto___532 = G__533;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return time.main.getTimes.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(time.main.getTimes.cljs$core$IFn$_invoke$arity$variadic = (function (p__527){
var vec__528 = p__527;
var d = cljs.core.nth.call(null,vec__528,(0),null);
var date = (cljs.core.truth_(d)?d:(new Date()));
var hrs = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"hrs","hrs",-1479098314),hrs,new cljs.core.Keyword(null,"mins","mins",467369676),min,new cljs.core.Keyword(null,"secs","secs",1532330091),sec], null);
}));

(time.main.getTimes.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(time.main.getTimes.cljs$lang$applyTo = (function (seq526){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq526));
}));

time.main.getStandardTime = (function time$main$getStandardTime(){
var date = time.main.getTimes.call(null);
var hrs = time.main.padTime.call(null,(2),new cljs.core.Keyword(null,"hrs","hrs",-1479098314).cljs$core$IFn$_invoke$arity$1(date));
var min = time.main.padTime.call(null,(2),new cljs.core.Keyword(null,"mins","mins",467369676).cljs$core$IFn$_invoke$arity$1(date));
var sec = time.main.padTime.call(null,(2),new cljs.core.Keyword(null,"secs","secs",1532330091).cljs$core$IFn$_invoke$arity$1(date));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(hrs),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(min),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sec)].join('');
});
time.main.getSeconds = (function time$main$getSeconds(){
var date = time.main.getTimes.call(null);
var hrs = new cljs.core.Keyword(null,"hours","hours",58380855).cljs$core$IFn$_invoke$arity$1(date);
var min = new cljs.core.Keyword(null,"mins","mins",467369676).cljs$core$IFn$_invoke$arity$1(date);
var sec = new cljs.core.Keyword(null,"secs","secs",1532330091).cljs$core$IFn$_invoke$arity$1(date);
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
var date = time.main.getTimes.call(null);
var hrs = new cljs.core.Keyword(null,"hrs","hrs",-1479098314).cljs$core$IFn$_invoke$arity$1(date);
var min = new cljs.core.Keyword(null,"mins","mins",467369676).cljs$core$IFn$_invoke$arity$1(date);
var sec = new cljs.core.Keyword(null,"secs","secs",1532330091).cljs$core$IFn$_invoke$arity$1(date);
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
if(cljs.core.not.call(null,window.location.hash)){
(window.location.hash = "1999-11-05");
} else {
}
time.main.datehash = window.location.hash.replace("#","");
time.main.showAge = (function time$main$showAge(){
return (document.getElementById("numage").innerText = (((new Date()) - (new Date("1999-11-05"))) / (31557600000)).toFixed((9)));
});
time.main.start = (function time$main$start(){
return setTimeout((function (){
time.main.showAge.call(null);

return requestAnimationFrame(time.main.start);
}),((1000) / (30)));
});
time.main.start.call(null);

//# sourceMappingURL=main.js.map
