!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=require("path")},function(e,t){e.exports=require("os")},function(e,t,n){const r=n(0),o=n(3);(async()=>{const e=o.getInput("root-directory",{required:!0}),t=JSON.parse(o.getInput("changed-files",{required:!0})),n=new Set(t.map(t=>r.relative(e,t)).filter(e=>!e.startsWith("../")).map(e=>r.parse(e).root));console.log(n)})()},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,u)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const i=n(4),s=o(n(1)),u=o(n(0));var c;function a(e){i.issue("error",e instanceof Error?e.toString():e)}function f(e){i.issue("group",e)}function p(){i.issue("endgroup")}!function(e){e[e.Success=0]="Success",e[e.Failure=1]="Failure"}(c=t.ExitCode||(t.ExitCode={})),t.exportVariable=function(e,t){const n=i.toCommandValue(t);process.env[e]=n,i.issueCommand("set-env",{name:e},n)},t.setSecret=function(e){i.issueCommand("add-mask",{},e)},t.addPath=function(e){i.issueCommand("add-path",{},e),process.env.PATH=`${e}${u.delimiter}${process.env.PATH}`},t.getInput=function(e,t){const n=process.env["INPUT_"+e.replace(/ /g,"_").toUpperCase()]||"";if(t&&t.required&&!n)throw new Error("Input required and not supplied: "+e);return n.trim()},t.setOutput=function(e,t){i.issueCommand("set-output",{name:e},t)},t.setCommandEcho=function(e){i.issue("echo",e?"on":"off")},t.setFailed=function(e){process.exitCode=c.Failure,a(e)},t.isDebug=function(){return"1"===process.env.RUNNER_DEBUG},t.debug=function(e){i.issueCommand("debug",{},e)},t.error=a,t.warning=function(e){i.issue("warning",e instanceof Error?e.toString():e)},t.info=function(e){process.stdout.write(e+s.EOL)},t.startGroup=f,t.endGroup=p,t.group=function(e,t){return r(this,void 0,void 0,(function*(){let n;f(e);try{n=yield t()}finally{p()}return n}))},t.saveState=function(e,t){i.issueCommand("save-state",{name:e},t)},t.getState=function(e){return process.env["STATE_"+e]||""}},function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(1));function i(e,t,n){const r=new s(e,t,n);process.stdout.write(r.toString()+o.EOL)}t.issueCommand=i,t.issue=function(e,t=""){i(e,{},t)};class s{constructor(e,t,n){e||(e="missing.command"),this.command=e,this.properties=t,this.message=n}toString(){let e="::"+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";let n=!0;for(const r in this.properties)if(this.properties.hasOwnProperty(r)){const o=this.properties[r];o&&(n?n=!1:e+=",",e+=`${r}=${t=o,u(t).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}`)}}var t;return e+="::"+function(e){return u(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}(this.message),e}}function u(e){return null==e?"":"string"==typeof e||e instanceof String?e:JSON.stringify(e)}t.toCommandValue=u}]);