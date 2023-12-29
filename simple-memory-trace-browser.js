(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.trace_memory = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var cachedSetTimeout,cachedClearTimeout,process=module.exports={};function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(e){if(cachedSetTimeout===setTimeout)return setTimeout(e,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(e,0);try{return cachedSetTimeout(e,0)}catch(t){try{return cachedSetTimeout.call(null,e,0)}catch(t){return cachedSetTimeout.call(this,e,0)}}}function runClearTimeout(e){if(cachedClearTimeout===clearTimeout)return clearTimeout(e);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(e);try{return cachedClearTimeout(e)}catch(t){try{return cachedClearTimeout.call(null,e)}catch(t){return cachedClearTimeout.call(this,e)}}}!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var currentQueue,queue=[],draining=!1,queueIndex=-1;function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var e=runTimeout(cleanUpNextTick);draining=!0;for(var t=queue.length;t;){for(currentQueue=queue,queue=[];++queueIndex<t;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,t=queue.length}currentQueue=null,draining=!1,runClearTimeout(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}process.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];queue.push(new Item(e,t)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.prependListener=noop,process.prependOnceListener=noop,process.listeners=function(e){return[]},process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};

},{}],2:[function(require,module,exports){
const trace_memory_1=require("simple-memory-trace");async function trace_memory(e,r,...m){return await trace_memory_1(e,{memoryUsage:()=>performance.memory,force_gc:0,...r},...m)}window.trace_memory=module.exports=trace_memory;

},{"simple-memory-trace":4}],3:[function(require,module,exports){
const units_supported={B:0,KB:1,MB:2,GB:3,TB:4};function round_max(t,o){return Math.floor(t*Math.pow(10,o))/Math.pow(10,o)}function converter_units(t,o,u,n=3){if(o==u)return t+" "+u;if("B"==u){let u=0,n=units_supported[o];u<n&&(t*=Math.pow(1024,n-u))}else{let n=units_supported[o],r=units_supported[u];n<r?t/=Math.pow(1024,r-n):r<n&&(t*=Math.pow(1024,n-r))}return round_max(t,n)+" "+u}module.exports={converter_units:converter_units,units_supported:units_supported};

},{}],4:[function(require,module,exports){
(function (process){(function (){
const{converter_units:converter_units,units_supported:units_supported}=require("./convert_memory_units");function throw_error(e){throw new Error(e)}async function trace_memory(e,r,...o){const t={};try{1===(null==r.force_gc?1:r.force_gc)&&gc()}catch(e){throw e instanceof ReferenceError&&throw_error('Please add "--expose-gc" to your CLI options'),e}const n=(process.memoryUsage||r.memoryUsage)(),s=Date.now();await e(...o);const c=Date.now()-s,u=(process.memoryUsage||r.memoryUsage)(),a=(r.unit||"B").toUpperCase(),i=null==r.fix_decimal?3:r.fix_decimal;for(let e in u)t[e]=m(Math.abs(u[e]-n[e]));function m(e){return null==units_supported[a]&&throw_error(`Unit "${a}" not supported!`),converter_units(e,"B",a,i)}return t.time=c,r&&!0===r.verbose&&console.log(e.name+" memoryUsage:",t),t}module.exports=trace_memory;

}).call(this)}).call(this,require('_process'))
},{"./convert_memory_units":3,"_process":1}]},{},[2])(2)
});