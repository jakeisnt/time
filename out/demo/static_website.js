// Compiled by ClojureScript 1.10.597 {}
goog.provide('demo.static_website');
goog.require('cljs.core');
demo.static_website.foldr = (function demo$static_website$foldr(fnc,base,lst){
if(cljs.core.empty_QMARK_.call(null,lst)){
return base;
} else {
return fnc.call(null,cljs.core.first.call(null,lst),demo.static_website.foldr.call(null,cljs.core.rest.call(null,lst)));
}
});
demo.static_website.foldl = (function demo$static_website$foldl(fnc,base,lst){
if(cljs.core.empty_QMARK_.call(null,lst)){
return base;
} else {
return demo.static_website.foldl.call(null,fnc,fnc.call(null,cljs.core.first.call(null,lst),base),cljs.core.rest.call(null,lst));
}
});
demo.static_website.padTime = (function demo$static_website$padTime(pad,k){
return demo.static_website.foldl.call(null,cljs.core.str,k,cljs.core.repeat.call(null,(pad - cljs.core.str.cljs$core$IFn$_invoke$arity$1(k).length),(0)));
});
demo.static_website.getTimes = (function demo$static_website$getTimes(){
var date = (new Date());
var hrs = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [hrs,min,sec], null);
});
demo.static_website.getStandardTime = (function demo$static_website$getStandardTime(){
var date = (new Date());
var hrs = demo.static_website.padTime.call(null,(2),date.getHours());
var min = demo.static_website.padTime.call(null,(2),date.getMinutes());
var sec = demo.static_website.padTime.call(null,(2),date.getSeconds());
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(hrs),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(min),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sec)].join('');
});
demo.static_website.getSeconds = (function demo$static_website$getSeconds(){
var date = (new Date());
var hrs = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
return (sec + ((60) * (min + (hrs * (60)))));
});
demo.static_website.getNeralieTime = (function demo$static_website$getNeralieTime(){
var pulses = (demo.static_website.getSeconds.call(null) / 86.4);
var beat = Math.floor(pulses);
var pulse = cljs.core.str.cljs$core$IFn$_invoke$arity$1(Math.floor((pulses * (1000)))).substring((3));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(demo.static_website.padTime.call(null,(3),beat)),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(demo.static_website.padTime.call(null,(3),pulse))].join('');
});
demo.static_website.setCurrentTime = (function demo$static_website$setCurrentTime(elementId,getTimeFunc){
(document.getElementById(elementId).innerText = getTimeFunc.call(null));

return setTimeout((function (){
return demo.static_website.setCurrentTime.call(null,elementId,getTimeFunc);
}),(0));
});
demo.static_website.setCurrentTime.call(null,"clock",demo.static_website.getNeralieTime);

//# sourceMappingURL=static_website.js.map
