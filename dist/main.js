!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e){t.exports=require("path")},function(t,e,n){"use strict";var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function s(t){try{c(r.next(t))}catch(t){o(t)}}function a(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,a)}c((r=r.apply(t,e||[])).next())}))},i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});const o=n(7),s=i(n(2)),a=i(n(0));var c;function u(t){o.issue("error",t instanceof Error?t.toString():t)}function l(t){o.issue("group",t)}function h(){o.issue("endgroup")}!function(t){t[t.Success=0]="Success",t[t.Failure=1]="Failure"}(c=e.ExitCode||(e.ExitCode={})),e.exportVariable=function(t,e){const n=o.toCommandValue(e);process.env[t]=n,o.issueCommand("set-env",{name:t},n)},e.setSecret=function(t){o.issueCommand("add-mask",{},t)},e.addPath=function(t){o.issueCommand("add-path",{},t),process.env.PATH=`${t}${a.delimiter}${process.env.PATH}`},e.getInput=function(t,e){const n=process.env["INPUT_"+t.replace(/ /g,"_").toUpperCase()]||"";if(e&&e.required&&!n)throw new Error("Input required and not supplied: "+t);return n.trim()},e.setOutput=function(t,e){o.issueCommand("set-output",{name:t},e)},e.setCommandEcho=function(t){o.issue("echo",t?"on":"off")},e.setFailed=function(t){process.exitCode=c.Failure,u(t)},e.isDebug=function(){return"1"===process.env.RUNNER_DEBUG},e.debug=function(t){o.issueCommand("debug",{},t)},e.error=u,e.warning=function(t){o.issue("warning",t instanceof Error?t.toString():t)},e.info=function(t){process.stdout.write(t+s.EOL)},e.startGroup=l,e.endGroup=h,e.group=function(t,e){return r(this,void 0,void 0,(function*(){let n;l(t);try{n=yield e()}finally{h()}return n}))},e.saveState=function(t,e){o.issueCommand("save-state",{name:t},e)},e.getState=function(t){return process.env["STATE_"+t]||""}},function(t,e){t.exports=require("os")},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(4),i=n(0),o="win32"===process.platform;function s(t){return r(t,"hasAbsoluteRoot parameter 'itemPath' must not be empty"),t=a(t),o?t.startsWith("\\\\")||/^[A-Z]:\\/i.test(t):t.startsWith("/")}function a(t){if(t=t||"",o){t=t.replace(/\//g,"\\");return(/^\\\\+[^\\]/.test(t)?"\\":"")+t.replace(/\\\\+/g,"\\")}return t.replace(/\/\/+/g,"/")}function c(t){return t?(t=a(t)).endsWith(i.sep)?t===i.sep||o&&/^[A-Z]:\\$/i.test(t)?t:t.substr(0,t.length-1):t:""}e.dirname=function(t){if(t=c(t),o&&/^\\\\[^\\]+(\\[^\\]+)?$/.test(t))return t;let e=i.dirname(t);return o&&/^\\\\[^\\]+\\[^\\]+\\$/.test(e)&&(e=c(e)),e},e.ensureAbsoluteRoot=function(t,e){if(r(t,"ensureAbsoluteRoot parameter 'root' must not be empty"),r(e,"ensureAbsoluteRoot parameter 'itemPath' must not be empty"),s(e))return e;if(o){if(e.match(/^[A-Z]:[^\\/]|^[A-Z]:$/i)){let t=process.cwd();return r(t.match(/^[A-Z]:\\/i),`Expected current directory to start with an absolute drive root. Actual '${t}'`),e[0].toUpperCase()===t[0].toUpperCase()?2===e.length?`${e[0]}:\\${t.substr(3)}`:(t.endsWith("\\")||(t+="\\"),`${e[0]}:\\${t.substr(3)}${e.substr(2)}`):`${e[0]}:\\${e.substr(2)}`}if(a(e).match(/^\\$|^\\[^\\]/)){const t=process.cwd();return r(t.match(/^[A-Z]:\\/i),`Expected current directory to start with an absolute drive root. Actual '${t}'`),`${t[0]}:\\${e.substr(1)}`}}return r(s(t),"ensureAbsoluteRoot parameter 'root' must have an absolute root"),t.endsWith("/")||o&&t.endsWith("\\")||(t+=i.sep),t+e},e.hasAbsoluteRoot=s,e.hasRoot=function(t){return r(t,"isRooted parameter 'itemPath' must not be empty"),t=a(t),o?t.startsWith("\\")||/^[A-Z]:/i.test(t):t.startsWith("/")},e.normalizeSeparators=a,e.safeTrimTrailingSeparator=c},function(t,e){t.exports=require("assert")},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t[t.None=0]="None",t[t.Directory=1]="Directory",t[t.File=2]="File",t[t.All=3]="All"}(e.MatchKind||(e.MatchKind={}))},function(t,e,n){const r=n(0),i=n(1),o=n(8);(async()=>{const t=i.getInput("root-directory",{required:!0}),e=i.getInput("changed-files",{required:!0}),n=new Set(JSON.parse(e).map(e=>r.relative(t,e)).filter(t=>!t.startsWith("../"))),s=await o.create(r.resolve(t,"**","Dockerfile.*")),a=(await s.glob()).map(e=>r.relative(t,e));console.log(n),console.log(a)})()},function(t,e,n){"use strict";var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});const i=r(n(2));function o(t,e,n){const r=new s(t,e,n);process.stdout.write(r.toString()+i.EOL)}e.issueCommand=o,e.issue=function(t,e=""){o(t,{},e)};class s{constructor(t,e,n){t||(t="missing.command"),this.command=t,this.properties=e,this.message=n}toString(){let t="::"+this.command;if(this.properties&&Object.keys(this.properties).length>0){t+=" ";let n=!0;for(const r in this.properties)if(this.properties.hasOwnProperty(r)){const i=this.properties[r];i&&(n?n=!1:t+=",",t+=`${r}=${e=i,a(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}`)}}var e;return t+="::"+function(t){return a(t).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}(this.message),t}}function a(t){return null==t?"":"string"==typeof t||t instanceof String?t:JSON.stringify(t)}e.toCommandValue=a},function(t,e,n){"use strict";var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function s(t){try{c(r.next(t))}catch(t){o(t)}}function a(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,a)}c((r=r.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const i=n(9);e.create=function(t,e){return r(this,void 0,void 0,(function*(){return yield i.DefaultGlobber.create(t,e)}))}},function(t,e,n){"use strict";var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function s(t){try{c(r.next(t))}catch(t){o(t)}}function a(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,a)}c((r=r.apply(t,e||[])).next())}))},i=this&&this.__asyncValues||function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t="function"==typeof __values?__values(t):t[Symbol.iterator](),e={},r("next"),r("throw"),r("return"),e[Symbol.asyncIterator]=function(){return this},e);function r(n){e[n]=t[n]&&function(e){return new Promise((function(r,i){(function(t,e,n,r){Promise.resolve(r).then((function(e){t({value:e,done:n})}),e)})(r,i,(e=t[n](e)).done,e.value)}))}}},o=this&&this.__await||function(t){return this instanceof o?(this.v=t,this):new o(t)},s=this&&this.__asyncGenerator||function(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,i=n.apply(t,e||[]),s=[];return r={},a("next"),a("throw"),a("return"),r[Symbol.asyncIterator]=function(){return this},r;function a(t){i[t]&&(r[t]=function(e){return new Promise((function(n,r){s.push([t,e,n,r])>1||c(t,e)}))})}function c(t,e){try{(n=i[t](e)).value instanceof o?Promise.resolve(n.value.v).then(u,l):h(s[0][2],n)}catch(t){h(s[0][3],t)}var n}function u(t){c("next",t)}function l(t){c("throw",t)}function h(t,e){t(e),s.shift(),s.length&&c(s[0][0],s[0][1])}};Object.defineProperty(e,"__esModule",{value:!0});const a=n(1),c=n(10),u=n(11),l=n(0),h=n(12),p=n(5),f=n(13),m=n(19),d="win32"===process.platform;class g{constructor(t){this.patterns=[],this.searchPaths=[],this.options=u.getOptions(t)}getSearchPaths(){return this.searchPaths.slice()}glob(){var t,e;return r(this,void 0,void 0,(function*(){const n=[];try{for(var r,o=i(this.globGenerator());!(r=yield o.next()).done;){const t=r.value;n.push(t)}}catch(e){t={error:e}}finally{try{r&&!r.done&&(e=o.return)&&(yield e.call(o))}finally{if(t)throw t.error}}return n}))}globGenerator(){return s(this,arguments,(function*(){const t=u.getOptions(this.options),e=[];for(const n of this.patterns)e.push(n),t.implicitDescendants&&(n.trailingSeparator||"**"!==n.segments[n.segments.length-1])&&e.push(new f.Pattern(n.negate,n.segments.concat("**")));const n=[];for(const t of h.getSearchPaths(e)){a.debug(`Search path '${t}'`);try{yield o(c.promises.lstat(t))}catch(t){if("ENOENT"===t.code)continue;throw t}n.unshift(new m.SearchState(t,1))}const r=[];for(;n.length;){const i=n.pop(),s=h.match(e,i.path),a=!!s||h.partialMatch(e,i.path);if(!s&&!a)continue;const u=yield o(g.stat(i,t,r));if(u)if(u.isDirectory()){if(s&p.MatchKind.Directory)yield yield o(i.path);else if(!a)continue;const t=i.level+1,e=(yield o(c.promises.readdir(i.path))).map(e=>new m.SearchState(l.join(i.path,e),t));n.push(...e.reverse())}else s&p.MatchKind.File&&(yield yield o(i.path))}}))}static create(t,e){return r(this,void 0,void 0,(function*(){const n=new g(e);d&&(t=(t=t.replace(/\r\n/g,"\n")).replace(/\r/g,"\n"));const r=t.split("\n").map(t=>t.trim());for(const t of r)t&&!t.startsWith("#")&&n.patterns.push(new f.Pattern(t));return n.searchPaths.push(...h.getSearchPaths(n.patterns)),n}))}static stat(t,e,n){return r(this,void 0,void 0,(function*(){let r;if(e.followSymbolicLinks)try{r=yield c.promises.stat(t.path)}catch(n){if("ENOENT"===n.code){if(e.omitBrokenSymbolicLinks)return void a.debug(`Broken symlink '${t.path}'`);throw new Error(`No information found for the path '${t.path}'. This may indicate a broken symbolic link.`)}throw n}else r=yield c.promises.lstat(t.path);if(r.isDirectory()&&e.followSymbolicLinks){const e=yield c.promises.realpath(t.path);for(;n.length>=t.level;)n.pop();if(n.some(t=>t===e))return void a.debug(`Symlink cycle detected for path '${t.path}' and realpath '${e}'`);n.push(e)}return r}))}}e.DefaultGlobber=g},function(t,e){t.exports=require("fs")},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(1);e.getOptions=function(t){const e={followSymbolicLinks:!0,implicitDescendants:!0,omitBrokenSymbolicLinks:!0};return t&&("boolean"==typeof t.followSymbolicLinks&&(e.followSymbolicLinks=t.followSymbolicLinks,r.debug(`followSymbolicLinks '${e.followSymbolicLinks}'`)),"boolean"==typeof t.implicitDescendants&&(e.implicitDescendants=t.implicitDescendants,r.debug(`implicitDescendants '${e.implicitDescendants}'`)),"boolean"==typeof t.omitBrokenSymbolicLinks&&(e.omitBrokenSymbolicLinks=t.omitBrokenSymbolicLinks,r.debug(`omitBrokenSymbolicLinks '${e.omitBrokenSymbolicLinks}'`))),e}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(3),i=n(5),o="win32"===process.platform;e.getSearchPaths=function(t){t=t.filter(t=>!t.negate);const e={};for(const n of t){e[o?n.searchPath.toUpperCase():n.searchPath]="candidate"}const n=[];for(const i of t){const t=o?i.searchPath.toUpperCase():i.searchPath;if("included"===e[t])continue;let s=!1,a=t,c=r.dirname(a);for(;c!==a;){if(e[c]){s=!0;break}a=c,c=r.dirname(a)}s||(n.push(i.searchPath),e[t]="included")}return n},e.match=function(t,e){let n=i.MatchKind.None;for(const r of t)r.negate?n&=~r.match(e):n|=r.match(e);return n},e.partialMatch=function(t,e){return t.some(t=>!t.negate&&t.partialMatch(e))}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(4),i=n(2),o=n(0),s=n(3),a=n(14),c=n(5),u=n(18),l="win32"===process.platform;class h{constructor(t,e){let n;if(this.negate=!1,"string"==typeof t)n=t.trim();else{r((e=e||[]).length,"Parameter 'segments' must not empty");const i=h.getLiteral(e[0]);r(i&&s.hasAbsoluteRoot(i),"Parameter 'segments' first element must be a root path"),n=new u.Path(e).toString().trim(),t&&(n="!"+n)}for(;n.startsWith("!");)this.negate=!this.negate,n=n.substr(1).trim();n=h.fixupPattern(n),this.segments=new u.Path(n).segments,this.trailingSeparator=s.normalizeSeparators(n).endsWith(o.sep),n=s.safeTrimTrailingSeparator(n);let i=!1;const c=this.segments.map(t=>h.getLiteral(t)).filter(t=>!i&&!(i=""===t));this.searchPath=new u.Path(c).toString(),this.rootRegExp=new RegExp(h.regExpEscape(c[0]),l?"i":"");const p={dot:!0,nobrace:!0,nocase:l,nocomment:!0,noext:!0,nonegate:!0};n=l?n.replace(/\\/g,"/"):n,this.minimatch=new a.Minimatch(n,p)}match(t){return"**"===this.segments[this.segments.length-1]?(t=s.normalizeSeparators(t)).endsWith(o.sep)||(t=`${t}${o.sep}`):t=s.safeTrimTrailingSeparator(t),this.minimatch.match(t)?this.trailingSeparator?c.MatchKind.Directory:c.MatchKind.All:c.MatchKind.None}partialMatch(t){return t=s.safeTrimTrailingSeparator(t),s.dirname(t)===t?this.rootRegExp.test(t):this.minimatch.matchOne(t.split(l?/\\+/:/\/+/),this.minimatch.set[0],!0)}static globEscape(t){return(l?t:t.replace(/\\/g,"\\\\")).replace(/(\[)(?=[^/]+\])/g,"[[]").replace(/\?/g,"[?]").replace(/\*/g,"[*]")}static fixupPattern(t){r(t,"pattern cannot be empty");const e=new u.Path(t).segments.map(t=>h.getLiteral(t));if(r(e.every((t,e)=>("."!==t||0===e)&&".."!==t),`Invalid pattern '${t}'. Relative pathing '.' and '..' is not allowed.`),r(!s.hasRoot(t)||e[0],`Invalid pattern '${t}'. Root segment must not contain globs.`),"."===(t=s.normalizeSeparators(t))||t.startsWith("."+o.sep))t=h.globEscape(process.cwd())+t.substr(1);else if("~"===t||t.startsWith("~"+o.sep)){const e=i.homedir();r(e,"Unable to determine HOME directory"),r(s.hasAbsoluteRoot(e),`Expected HOME directory to be a rooted path. Actual '${e}'`),t=h.globEscape(e)+t.substr(1)}else if(l&&(t.match(/^[A-Z]:$/i)||t.match(/^[A-Z]:[^\\]/i))){let e=s.ensureAbsoluteRoot("C:\\dummy-root",t.substr(0,2));t.length>2&&!e.endsWith("\\")&&(e+="\\"),t=h.globEscape(e)+t.substr(2)}else if(l&&("\\"===t||t.match(/^\\[^\\]/))){let e=s.ensureAbsoluteRoot("C:\\dummy-root","\\");e.endsWith("\\")||(e+="\\"),t=h.globEscape(e)+t.substr(1)}else t=s.ensureAbsoluteRoot(h.globEscape(process.cwd()),t);return s.normalizeSeparators(t)}static getLiteral(t){let e="";for(let n=0;n<t.length;n++){const r=t[n];if("\\"===r&&!l&&n+1<t.length)e+=t[++n];else{if("*"===r||"?"===r)return"";if("["===r&&n+1<t.length){let r="",i=-1;for(let e=n+1;e<t.length;e++){const n=t[e];if("\\"===n&&!l&&e+1<t.length)r+=t[++e];else{if("]"===n){i=e;break}r+=n}}if(i>=0){if(r.length>1)return"";if(r){e+=r,n=i;continue}}}e+=r}}return e}static regExpEscape(t){return t.replace(/[[\\^$.|?*+()]/g,"\\$&")}}e.Pattern=h},function(t,e,n){t.exports=l,l.Minimatch=h;var r={sep:"/"};try{r=n(0)}catch(t){}var i=l.GLOBSTAR=h.GLOBSTAR={},o=n(15),s={"!":{open:"(?:(?!(?:",close:"))[^/]*?)"},"?":{open:"(?:",close:")?"},"+":{open:"(?:",close:")+"},"*":{open:"(?:",close:")*"},"@":{open:"(?:",close:")"}},a="().*{}+?[]^$\\!".split("").reduce((function(t,e){return t[e]=!0,t}),{});var c=/\/+/;function u(t,e){t=t||{},e=e||{};var n={};return Object.keys(e).forEach((function(t){n[t]=e[t]})),Object.keys(t).forEach((function(e){n[e]=t[e]})),n}function l(t,e,n){if("string"!=typeof e)throw new TypeError("glob pattern string required");return n||(n={}),!(!n.nocomment&&"#"===e.charAt(0))&&(""===e.trim()?""===t:new h(e,n).match(t))}function h(t,e){if(!(this instanceof h))return new h(t,e);if("string"!=typeof t)throw new TypeError("glob pattern string required");e||(e={}),t=t.trim(),"/"!==r.sep&&(t=t.split(r.sep).join("/")),this.options=e,this.set=[],this.pattern=t,this.regexp=null,this.negate=!1,this.comment=!1,this.empty=!1,this.make()}function p(t,e){if(e||(e=this instanceof h?this.options:{}),void 0===(t=void 0===t?this.pattern:t))throw new TypeError("undefined pattern");return e.nobrace||!t.match(/\{.*\}/)?[t]:o(t)}l.filter=function(t,e){return e=e||{},function(n,r,i){return l(n,t,e)}},l.defaults=function(t){if(!t||!Object.keys(t).length)return l;var e=l,n=function(n,r,i){return e.minimatch(n,r,u(t,i))};return n.Minimatch=function(n,r){return new e.Minimatch(n,u(t,r))},n},h.defaults=function(t){return t&&Object.keys(t).length?l.defaults(t).Minimatch:h},h.prototype.debug=function(){},h.prototype.make=function(){if(this._made)return;var t=this.pattern,e=this.options;if(!e.nocomment&&"#"===t.charAt(0))return void(this.comment=!0);if(!t)return void(this.empty=!0);this.parseNegate();var n=this.globSet=this.braceExpand();e.debug&&(this.debug=console.error);this.debug(this.pattern,n),n=this.globParts=n.map((function(t){return t.split(c)})),this.debug(this.pattern,n),n=n.map((function(t,e,n){return t.map(this.parse,this)}),this),this.debug(this.pattern,n),n=n.filter((function(t){return-1===t.indexOf(!1)})),this.debug(this.pattern,n),this.set=n},h.prototype.parseNegate=function(){var t=this.pattern,e=!1,n=this.options,r=0;if(n.nonegate)return;for(var i=0,o=t.length;i<o&&"!"===t.charAt(i);i++)e=!e,r++;r&&(this.pattern=t.substr(r));this.negate=e},l.braceExpand=function(t,e){return p(t,e)},h.prototype.braceExpand=p,h.prototype.parse=function(t,e){if(t.length>65536)throw new TypeError("pattern is too long");var n=this.options;if(!n.noglobstar&&"**"===t)return i;if(""===t)return"";var r,o="",c=!!n.nocase,u=!1,l=[],h=[],p=!1,m=-1,d=-1,g="."===t.charAt(0)?"":n.dot?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)",b=this;function y(){if(r){switch(r){case"*":o+="[^/]*?",c=!0;break;case"?":o+="[^/]",c=!0;break;default:o+="\\"+r}b.debug("clearStateChar %j %j",r,o),r=!1}}for(var v,w=0,S=t.length;w<S&&(v=t.charAt(w));w++)if(this.debug("%s\t%s %s %j",t,w,o,v),u&&a[v])o+="\\"+v,u=!1;else switch(v){case"/":return!1;case"\\":y(),u=!0;continue;case"?":case"*":case"+":case"@":case"!":if(this.debug("%s\t%s %s %j <-- stateChar",t,w,o,v),p){this.debug("  in class"),"!"===v&&w===d+1&&(v="^"),o+=v;continue}b.debug("call clearStateChar %j",r),y(),r=v,n.noext&&y();continue;case"(":if(p){o+="(";continue}if(!r){o+="\\(";continue}l.push({type:r,start:w-1,reStart:o.length,open:s[r].open,close:s[r].close}),o+="!"===r?"(?:(?!(?:":"(?:",this.debug("plType %j %j",r,o),r=!1;continue;case")":if(p||!l.length){o+="\\)";continue}y(),c=!0;var P=l.pop();o+=P.close,"!"===P.type&&h.push(P),P.reEnd=o.length;continue;case"|":if(p||!l.length||u){o+="\\|",u=!1;continue}y(),o+="|";continue;case"[":if(y(),p){o+="\\"+v;continue}p=!0,d=w,m=o.length,o+=v;continue;case"]":if(w===d+1||!p){o+="\\"+v,u=!1;continue}if(p){var x=t.substring(d+1,w);try{RegExp("["+x+"]")}catch(t){var O=this.parse(x,f);o=o.substr(0,m)+"\\["+O[0]+"\\]",c=c||O[1],p=!1;continue}}c=!0,p=!1,o+=v;continue;default:y(),u?u=!1:!a[v]||"^"===v&&p||(o+="\\"),o+=v}p&&(x=t.substr(d+1),O=this.parse(x,f),o=o.substr(0,m)+"\\["+O[0],c=c||O[1]);for(P=l.pop();P;P=l.pop()){var E=o.slice(P.reStart+P.open.length);this.debug("setting tail",o,P),E=E.replace(/((?:\\{2}){0,64})(\\?)\|/g,(function(t,e,n){return n||(n="\\"),e+e+n+"|"})),this.debug("tail=%j\n   %s",E,E,P,o);var _="*"===P.type?"[^/]*?":"?"===P.type?"[^/]":"\\"+P.type;c=!0,o=o.slice(0,P.reStart)+_+"\\("+E}y(),u&&(o+="\\\\");var A=!1;switch(o.charAt(0)){case".":case"[":case"(":A=!0}for(var $=h.length-1;$>-1;$--){var j=h[$],M=o.slice(0,j.reStart),k=o.slice(j.reStart,j.reEnd-8),R=o.slice(j.reEnd-8,j.reEnd),T=o.slice(j.reEnd);R+=T;var C=M.split("(").length-1,L=T;for(w=0;w<C;w++)L=L.replace(/\)[+*?]?/,"");var D="";""===(T=L)&&e!==f&&(D="$"),o=M+k+T+D+R}""!==o&&c&&(o="(?=.)"+o);A&&(o=g+o);if(e===f)return[o,c];if(!c)return function(t){return t.replace(/\\(.)/g,"$1")}(t);var N=n.nocase?"i":"";try{var W=new RegExp("^"+o+"$",N)}catch(t){return new RegExp("$.")}return W._glob=t,W._src=o,W};var f={};l.makeRe=function(t,e){return new h(t,e||{}).makeRe()},h.prototype.makeRe=function(){if(this.regexp||!1===this.regexp)return this.regexp;var t=this.set;if(!t.length)return this.regexp=!1,this.regexp;var e=this.options,n=e.noglobstar?"[^/]*?":e.dot?"(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?":"(?:(?!(?:\\/|^)\\.).)*?",r=e.nocase?"i":"",o=t.map((function(t){return t.map((function(t){return t===i?n:"string"==typeof t?function(t){return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}(t):t._src})).join("\\/")})).join("|");o="^(?:"+o+")$",this.negate&&(o="^(?!"+o+").*$");try{this.regexp=new RegExp(o,r)}catch(t){this.regexp=!1}return this.regexp},l.match=function(t,e,n){var r=new h(e,n=n||{});return t=t.filter((function(t){return r.match(t)})),r.options.nonull&&!t.length&&t.push(e),t},h.prototype.match=function(t,e){if(this.debug("match",t,this.pattern),this.comment)return!1;if(this.empty)return""===t;if("/"===t&&e)return!0;var n=this.options;"/"!==r.sep&&(t=t.split(r.sep).join("/"));t=t.split(c),this.debug(this.pattern,"split",t);var i,o,s=this.set;for(this.debug(this.pattern,"set",s),o=t.length-1;o>=0&&!(i=t[o]);o--);for(o=0;o<s.length;o++){var a=s[o],u=t;if(n.matchBase&&1===a.length&&(u=[i]),this.matchOne(u,a,e))return!!n.flipNegate||!this.negate}return!n.flipNegate&&this.negate},h.prototype.matchOne=function(t,e,n){var r=this.options;this.debug("matchOne",{this:this,file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var o=0,s=0,a=t.length,c=e.length;o<a&&s<c;o++,s++){this.debug("matchOne loop");var u,l=e[s],h=t[o];if(this.debug(e,l,h),!1===l)return!1;if(l===i){this.debug("GLOBSTAR",[e,l,h]);var p=o,f=s+1;if(f===c){for(this.debug("** at the end");o<a;o++)if("."===t[o]||".."===t[o]||!r.dot&&"."===t[o].charAt(0))return!1;return!0}for(;p<a;){var m=t[p];if(this.debug("\nglobstar while",t,p,e,f,m),this.matchOne(t.slice(p),e.slice(f),n))return this.debug("globstar found match!",p,a,m),!0;if("."===m||".."===m||!r.dot&&"."===m.charAt(0)){this.debug("dot detected!",t,p,e,f);break}this.debug("globstar swallow a segment, and continue"),p++}return!(!n||(this.debug("\n>>> no match, partial?",t,p,e,f),p!==a))}if("string"==typeof l?(u=r.nocase?h.toLowerCase()===l.toLowerCase():h===l,this.debug("string match",l,h,u)):(u=h.match(l),this.debug("pattern match",l,h,u)),!u)return!1}if(o===a&&s===c)return!0;if(o===a)return n;if(s===c)return o===a-1&&""===t[o];throw new Error("wtf?")}},function(t,e,n){var r=n(16),i=n(17);t.exports=function(t){if(!t)return[];"{}"===t.substr(0,2)&&(t="\\{\\}"+t.substr(2));return function t(e,n){var o=[],s=i("{","}",e);if(!s||/\$$/.test(s.pre))return[e];var c,u=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body),h=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body),g=u||h,b=s.body.indexOf(",")>=0;if(!g&&!b)return s.post.match(/,.*\}/)?(e=s.pre+"{"+s.body+a+s.post,t(e)):[e];if(g)c=s.body.split(/\.\./);else{if(1===(c=function t(e){if(!e)return[""];var n=[],r=i("{","}",e);if(!r)return e.split(",");var o=r.pre,s=r.body,a=r.post,c=o.split(",");c[c.length-1]+="{"+s+"}";var u=t(a);a.length&&(c[c.length-1]+=u.shift(),c.push.apply(c,u));return n.push.apply(n,c),n}(s.body)).length)if(1===(c=t(c[0],!1).map(p)).length)return(w=s.post.length?t(s.post,!1):[""]).map((function(t){return s.pre+c[0]+t}))}var y,v=s.pre,w=s.post.length?t(s.post,!1):[""];if(g){var S=l(c[0]),P=l(c[1]),x=Math.max(c[0].length,c[1].length),O=3==c.length?Math.abs(l(c[2])):1,E=m;P<S&&(O*=-1,E=d);var _=c.some(f);y=[];for(var A=S;E(A,P);A+=O){var $;if(h)"\\"===($=String.fromCharCode(A))&&($="");else if($=String(A),_){var j=x-$.length;if(j>0){var M=new Array(j+1).join("0");$=A<0?"-"+M+$.slice(1):M+$}}y.push($)}}else y=r(c,(function(e){return t(e,!1)}));for(var k=0;k<y.length;k++)for(var R=0;R<w.length;R++){var T=v+y[k]+w[R];(!n||g||T)&&o.push(T)}return o}(function(t){return t.split("\\\\").join(o).split("\\{").join(s).split("\\}").join(a).split("\\,").join(c).split("\\.").join(u)}(t),!0).map(h)};var o="\0SLASH"+Math.random()+"\0",s="\0OPEN"+Math.random()+"\0",a="\0CLOSE"+Math.random()+"\0",c="\0COMMA"+Math.random()+"\0",u="\0PERIOD"+Math.random()+"\0";function l(t){return parseInt(t,10)==t?parseInt(t,10):t.charCodeAt(0)}function h(t){return t.split(o).join("\\").split(s).join("{").split(a).join("}").split(c).join(",").split(u).join(".")}function p(t){return"{"+t+"}"}function f(t){return/^-?0\d/.test(t)}function m(t,e){return t<=e}function d(t,e){return t>=e}},function(t,e){t.exports=function(t,e){for(var r=[],i=0;i<t.length;i++){var o=e(t[i],i);n(o)?r.push.apply(r,o):r.push(o)}return r};var n=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},function(t,e,n){"use strict";function r(t,e,n){t instanceof RegExp&&(t=i(t,n)),e instanceof RegExp&&(e=i(e,n));var r=o(t,e,n);return r&&{start:r[0],end:r[1],pre:n.slice(0,r[0]),body:n.slice(r[0]+t.length,r[1]),post:n.slice(r[1]+e.length)}}function i(t,e){var n=e.match(t);return n?n[0]:null}function o(t,e,n){var r,i,o,s,a,c=n.indexOf(t),u=n.indexOf(e,c+1),l=c;if(c>=0&&u>0){for(r=[],o=n.length;l>=0&&!a;)l==c?(r.push(l),c=n.indexOf(t,l+1)):1==r.length?a=[r.pop(),u]:((i=r.pop())<o&&(o=i,s=u),u=n.indexOf(e,l+1)),l=c<u&&c>=0?c:u;r.length&&(a=[o,s])}return a}t.exports=r,r.range=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(4),i=n(0),o=n(3),s="win32"===process.platform;e.Path=class{constructor(t){if(this.segments=[],"string"==typeof t)if(r(t,"Parameter 'itemPath' must not be empty"),t=o.safeTrimTrailingSeparator(t),o.hasRoot(t)){let e=t,n=o.dirname(e);for(;n!==e;){const t=i.basename(e);this.segments.unshift(t),e=n,n=o.dirname(e)}this.segments.unshift(e)}else this.segments=t.split(i.sep);else{r(t.length>0,"Parameter 'itemPath' must not be an empty array");for(let e=0;e<t.length;e++){let n=t[e];r(n,"Parameter 'itemPath' must not contain any empty segments"),n=o.normalizeSeparators(t[e]),0===e&&o.hasRoot(n)?(n=o.safeTrimTrailingSeparator(n),r(n===o.dirname(n),"Parameter 'itemPath' root segment contains information for multiple segments"),this.segments.push(n)):(r(!n.includes(i.sep),"Parameter 'itemPath' contains unexpected path separators"),this.segments.push(n))}}}toString(){let t=this.segments[0],e=t.endsWith(i.sep)||s&&/^[A-Z]:$/i.test(t);for(let n=1;n<this.segments.length;n++)e?e=!1:t+=i.sep,t+=this.segments[n];return t}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.SearchState=class{constructor(t,e){this.path=t,this.level=e}}}]);