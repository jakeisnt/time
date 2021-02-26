// Compiled by ClojureScript 1.10.597 {}
goog.provide('demo.static_website');
goog.require('cljs.core');
console.log("Hello, Github Pages!");
demo.static_website.updateTime = (function demo$static_website$updateTime(k){
if((k < (10))){
return ["0",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join('');
} else {
return k;
}
});
demo.static_website.getCurrentTime = (function demo$static_website$getCurrentTime(){
var date = (new Date());
var hrs = demo.static_website.updateTime.call(null,date.getHours());
var min = demo.static_website.updateTime.call(null,date.getMinutes());
var sec = demo.static_website.updateTime.call(null,date.getSeconds());
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(hrs),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(min),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sec)].join('');
});
demo.static_website.setCurrentTime = (function demo$static_website$setCurrentTime(){
(document.getElementById("clock").innerText = demo.static_website.getCurrentTime.call(null));

console.log(demo.static_website.getCurrentTime.call(null));

return setTimeout(demo.static_website.setCurrentTime,(1000));
});
demo.static_website.setCurrentTime.call(null);

//# sourceMappingURL=static_website.js.map
