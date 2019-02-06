module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("prop-types")},function(e,t,n){e.exports=n(3)},function(e,t,n){"use strict";n.r(t),n.d(t,"createReactComponent",function(){return b});var r=n(0),o=n.n(r),u=n(1),i=n.n(u);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,u=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,u=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw u}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(e){return function(t){return o.a.createElement(d,{component:e,elmProps:t})}},m=function(e,t){return Object.entries(t).reduce(function(t,n){return e(n[1])?function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){y(e,t,n[t])})}return e}({},t,y({},n[0],n[1])):t},{})},d=function(e){function t(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=new Array(r),u=0;u<r;u++)o[u]=arguments[u];return y(s(s(n=function(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?s(e):t}(this,(e=p(t)).call.apply(e,[this].concat(o))))),"storeNode",function(e){n.node=e}),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(t,o.a.Component),function(e,t,n){t&&a(e.prototype,t),n&&a(e,n)}(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,n=t.component,r=t.elmProps;this.app=n.Elm.Main.init({node:this.node,flags:{props:r}});var o=m(function(e){return!!e.subscribe},this.app.ports);this.commandSubscriptions=Object.entries(o).map(function(t){var n=f(t,2),r=n[0],o=n[1];return o.subscribe(function(t){e.props.elmProps[r]&&e.props.elmProps[r](t)}),o.unsubscribe})}},{key:"componentDidUpdate",value:function(){this.app.ports.propsUpdated.send(this.props.elmProps)}},{key:"componentWillUnmount",value:function(){this.commandSubscriptions.forEach(function(e){e()})}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{ref:this.storeNode}))}}]),t}();d.propTypes={component:i.a.object.isRequired,elmProps:i.a.object.isRequired}}]);
//# sourceMappingURL=index.js.map