!function(e){function t(n){if(s[n])return s[n].exports;var r=s[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var s={};t.m=e,t.c=s,t.i=function(e){return e},t.d=function(e,s,n){t.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/js/",t(t.s=10)}([function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(2),r=s(3),a=new n.CountrySelector(document.getElementById("country-selector"),{inputValidClass:"FormControl--valid",inputInvalidClass:"FormControl--invalid",displayLocale:"en-GB"});new r.LocaleDropdown(document.getElementById("display-locale"),a)},function(e,t,s){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}();Object.defineProperty(t,"__esModule",{value:!0});var a=s(8),i=function(){function e(t,s,r){n(this,e),this.options={baseClass:"Autosuggest"},this.deleting=!1,this.ctrlKey=!1,this.settingResult=!1,this.results=[],this.highlightedIndex=0,this.input=t,this.suggestionFunction=s,this.options=Object.assign({},this.options,r),this.addAutosuggestInput()}return r(e,[{key:"addAutosuggestInput",value:function(){var e=this;this.autosuggestInput||(this.autosuggestWrapper=document.createElement("div"),this.autosuggestWrapper.className=this.wrapperClass,this.autosuggestInput=this.input.cloneNode(),this.input.id&&(this.autosuggestInput.id=this.autosuggestInput.id+"-dummy"),this.input.name&&(this.autosuggestInput.name=this.autosuggestInput.name+"-dummy"),this.autosuggestInput.addEventListener("focus",this.handleFocus.bind(this)),this.autosuggestInput.addEventListener("blur",this.handleBlur.bind(this)),this.autosuggestInput.addEventListener("change",this.getSuggestions.bind(this)),this.autosuggestInput.addEventListener("keydown",this.handleKeydown.bind(this)),this.autosuggestInput.addEventListener("keyup",this.handleKeyup.bind(this)),this.input.type="hidden",this.autosuggestWrapper.appendChild(this.autosuggestInput),this.input.parentNode.insertBefore(this.autosuggestWrapper,this.input.nextSibling),this.input.autofocus&&setTimeout(function(){e.autosuggestInput.focus()},1))}},{key:"handleKeydown",value:function(e){switch(e.keyCode){case a.KEYCODE.UP:e.preventDefault(),this.navigateResults(-1);break;case a.KEYCODE.DOWN:e.preventDefault(),this.navigateResults(1);break;case a.KEYCODE.ENTER:case a.KEYCODE.RETURN:e.preventDefault()}(e.ctrlKey||e.metaKey)&&e.keyCode!==a.KEYCODE.V?this.ctrlKey=!0:this.ctrlKey=!1}},{key:"handleKeyup",value:function(e){switch(this.deleting=!1,e.keyCode){case a.KEYCODE.UP:case a.KEYCODE.DOWN:e.preventDefault();break;case a.KEYCODE.ENTER:case a.KEYCODE.RETURN:this.selectResult();break;case a.KEYCODE.LEFT:case a.KEYCODE.RIGHT:break;case a.KEYCODE.BACK_SPACE:case a.KEYCODE.DELETE:this.deleting=!0,this.getSuggestions();break;default:this.ctrlKey||this.getSuggestions()}this.ctrlKey=!1}},{key:"handleFocus",value:function(){this.autosuggestInput.autocomplete="false",this.getSuggestions()}},{key:"handleBlur",value:function(){var e=this;this.results.length&&this.selectResult(),setTimeout(function(){e.autosuggestInput.autocomplete=e.input.autocomplete,e.resultsElement.innerHTML=null,!e.input.value&&e.query&&e.autosuggestInput.classList.add(e.invalidClass)},300)}},{key:"navigateResults",value:function(e){var t=this.highlightedIndex+e,s=this.results.length-1;t>s?t=0:t<0&&(t=s),this.setHighlitedResult(t)}},{key:"setHighlitedResult",value:function(e){var t=this;this.highlightedIndex=e,this.results.length&&(this.results.forEach(function(e){e.elem.className=t.itemClassName}),this.results[e].elem.classList.add(this.higlightendItemClassName))}},{key:"selectResult",value:function(){var e=this;this.settingResult=!0,this.input.value=this.results[this.highlightedIndex].value,this.autosuggestInput.value=this.results[this.highlightedIndex].displayValue,this.autosuggestInput.classList.add(this.validClass),this.resultsElement.innerHTML="",setTimeout(function(){e.settingResult=!1,e.autosuggestInput.autocomplete="false"},300)}},{key:"unsetResults",value:function(){this.input.value="",this.autosuggestInput.classList.remove(this.validClass),this.autosuggestInput.classList.remove(this.invalidClass),this.autosuggestInput.classList.remove(this.noResultsClass),this.resultsElement.innerHTML=""}},{key:"getSuggestions",value:function(){this.settingResult||(this.query=this.autosuggestInput.value.trim().replace(/\s\s+/g," ").toLowerCase(),this.query!==this.previousQuery&&(this.unsetResults(),this.query?this.suggestionFunction(this.query).then(this.handleResults.bind(this)):this.resultsElement.innerHTML=""))}},{key:"handleResults",value:function(e){var t=this;(!this.deleting||e.length>1&&this.deleting)&&(this.results=e.map(function(e,s){var n=document.createElement("li");return n.className=t.itemClassName,n.innerHTML=e.suggestionHTML,n.addEventListener("mouseover",function(){t.setHighlitedResult(s)}),n.addEventListener("click",function(){t.setHighlitedResult(s),t.selectResult()}),t.resultsElement.appendChild(n),{value:e.value,displayValue:e.displayValue,elem:n}}),this.setHighlitedResult(0)),0===this.results.length&&(this.autosuggestInput.classList.add(this.noResultsClass),this.resultsElement.innerHTML='<li class="'+this.itemClassName+'">No results found for "'+this.autosuggestInput.value+'"</li>')}},{key:"resultsElement",get:function(){if(!this._resultsElement){var e=document.createElement("ul");e.className=this.options.baseClass+"__results",this._resultsElement=e,this.autosuggestInput.parentNode.insertBefore(e,this.autosuggestInput.nextSibling)}return this._resultsElement}},{key:"wrapperClass",get:function(){return this._wrapperClass||(this._wrapperClass=this.options.wrapperClass||this.options.baseClass+"__wrapper"),this._wrapperClass}},{key:"validClass",get:function(){return this._validClassName||(this._validClassName=this.options.inputValidClass||this.input.className+"--valid"),this._validClassName}},{key:"invalidClass",get:function(){return this._invalidClassName||(this._invalidClassName=this.options.inputInvalidClass||this.input.className+"--invalid"),this._invalidClassName}},{key:"noResultsClass",get:function(){return this._noResultsClass||(this._noResultsClass=this.options.noResultsClass||this.input.className+"--no-results"),this._noResultsClass}},{key:"itemClassName",get:function(){return this._itemClassName||(this._itemClassName=this.options.resultItemClass||this.options.baseClass+"__result"),this._itemClassName}},{key:"higlightendItemClassName",get:function(){return this._higlightendItemClassName||(this._higlightendItemClassName=this.options.resultItemActiveClass||this.itemClassName+"--active"),this._higlightendItemClassName}}]),e}();t.Autosuggest=i},function(e,t,s){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,s=Array(e.length);t<e.length;t++)s[t]=e[t];return s}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}();Object.defineProperty(t,"__esModule",{value:!0});var i,u=s(4),l=s(1),o=s(7),h=s(5),c=s(6);!function(e){e[e.key=0]="key",e[e.primary=1]="primary"}(i||(i={}));var f=function(){function e(t,s){r(this,e),this.options={value:i.key,valueLocale:document.documentElement.lang||navigator.language||"en",displayLocale:document.documentElement.lang||navigator.language||"en",showMatch:!0,boldMatch:!0,maxSuggestions:10},this.territories={},this._locales=[],this.options=Object.assign({},this.options,s),this.autosuggest=new l.Autosuggest(t,this.suggestCountries.bind(this),this.options),this.mapTerritories()}return a(e,[{key:"setDisplayLocale",value:function(e){this.options.displayLocale=e,this.addLocale(e)}},{key:"addLocale",value:function(e){this._locales.includes(e)||(this._locales.push(e),this.getLocale(e))}},{key:"mapTerritories",value:function(){this.locales.forEach(this.getLocale.bind(this))}},{key:"getLocale",value:function(e){var t=this;u.HTTPReq("./countries/"+e+".json").then(function(s){return t.mapLocale(e,JSON.parse(s))})}},{key:"mapLocale",value:function(e,t){for(var s in t)if(t.hasOwnProperty(s)){t[s];this.territories[s]||(this.territories[s]={}),this.territories[s][e]||(this.territories[s][e]=t[s])}}},{key:"suggestCountries",value:function(e){var t=this;return this.query=e,this.queryParts=this.query.split(" "),this.queryPartsLength=this.queryParts.length,new Promise(function(e,s){e(t.findCountries())})}},{key:"findCountries",value:function(){var e=[];for(var t in this.territories)if(this.territories.hasOwnProperty(t)){var s=this.checkTerritory(this.territories[t]);s.match&&e.push({territory:t,locale:s.locale,localeScore:s.localeScore,key:s.key,score:s.score,name:this.territories[t][this.options.displayLocale].p})}return this.processMatches(e)}},{key:"checkTerritory",value:function(e){var t=this,s=[];for(var n in e)if(e.hasOwnProperty(n)){var r=this.checkLocale(e[n]);r.match&&s.push({locale:n,key:r.key,score:r.score})}var a=!!s.length,i=1,u=void 0;return a&&(u=s.filter(function(e){return e.locale===t.options.displayLocale})[0],u?i=0:u=s.sort(h.dynamicSort("score"))[0]),{match:a,locale:u?u.locale:null,key:u?u.key:null,score:u?u.score:null,localeScore:i}}},{key:"checkLocale",value:function(e){var t=[];for(var s in e)if(e.hasOwnProperty(s)){var n=this.checkName(e[s].toLowerCase());n.match&&t.push({key:s,score:n.score})}var r=!!t.length;return r&&(t=t.sort(h.dynamicSort("score"))),{match:r,key:r?t[0].key:null,score:r?t[0].score:null}}},{key:"checkName",value:function(e){var t=e.split(" "),s=[];return this.queryParts.forEach(function(e){var n=o.findStringInStringArray(e,t);n.arrayIndex>-1&&(0===s.length||0===n.stringIndex)&&s.push(n.arrayIndex+n.stringIndex)}),{match:s.length>=this.queryPartsLength,score:Math.min.apply(Math,s)}}},{key:"processMatches",value:function(e){var t=this;return e.sort(h.dynamicSortMultiple("localeScore","score","name")).slice(0,this.options.maxSuggestions).map(function(e){return{value:t.getValue(e),displayValue:t.getDisplayValue(e),suggestionHTML:t.getSuggestionHTML(e)}})}},{key:"getValue",value:function(e){switch(this.options.value){case i.primary:return this.territories[e.territory][this.options.valueLocale].p;default:return e.key}}},{key:"getDisplayValue",value:function(e){return this.territories[e.territory][this.options.displayLocale].p}},{key:"getSuggestionHTML",value:function(e){var t=this.getDisplayValue(e),s=this.territories[e.territory][e.locale][e.key],n=t!==s;this.options.boldMatch&&(n?s=c.emboldenMatch(s,this.query):t=c.emboldenMatch(t,this.query));var r=t;return n&&(r+=" <small>("+s+")</small>"),r}},{key:"locales",get:function(){return this._locales.length||(navigator.language&&this._locales.push(navigator.language),document.documentElement.lang&&this._locales.push(document.documentElement.lang),this.options.displayLocale&&this._locales.push(this.options.displayLocale),this.options.valueLocale&&this._locales.push(this.options.valueLocale),this._locales=[].concat(n(new Set(this._locales)))),this._locales}},{key:"currentDisplayLocale",get:function(){return this.options.displayLocale}}]),e}();t.CountrySelector=f},function(e,t,s){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}();Object.defineProperty(t,"__esModule",{value:!0});var a=s(9).availableLocales.modern,i=function(){function e(t,s){n(this,e),this.control=t,this.countrySelector=s,this.init()}return r(e,[{key:"init",value:function(){var e="";a.forEach(function(t){e+="<option value="+t+">"+t+"</option>"}),this.control.innerHTML=e,this.control.value=this.countrySelector.currentDisplayLocale,this.control.addEventListener("change",this.handleChange.bind(this))}},{key:"handleChange",value:function(){this.countrySelector.setDisplayLocale(this.control.value)}}]),e}();t.LocaleDropdown=i},function(e,t,s){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t,s,n){return new Promise(function(r,i){var u=new XMLHttpRequest;u.open(a(t),e),s&&s.forEach(function(e){u.setRequestHeader(e.key,e.value)}),u.onload=function(){u.status>=200&&u.status<300?r(u.response):i({status:u.status,statusText:u.statusText})},u.onerror=function(){i({status:u.status,statusText:u.statusText})},n?u.send(JSON.stringify(n)):u.send()})}function a(e){switch(e){case i.POST:return"POST";case i.DELETE:return"DELETE";case i.UPDATE:return"UPDATE";default:return"GET"}}Object.defineProperty(t,"__esModule",{value:!0});var i;!function(e){e[e.GET=0]="GET",e[e.POST=1]="POST",e[e.DELETE=2]="DELETE",e[e.UPDATE=3]="UPDATE"}(i=t.RequestType||(t.RequestType={}));var u=function e(t,s){n(this,e),this.key=t,this.value=s};t.Header=u,t.HTTPReq=r},function(e,t,s){"use strict";function n(e){var t=1;return"-"===e.charAt(0)&&(t=-1,e=e.substr(1)),function(s,n){return(s[e]<n[e]?-1:s[e]>n[e])*t}}function r(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return function(e,s){for(var r=0,a=0,i=t.length;0===a&&r<i;)a=n(t[r])(e,s),r++;return a}}Object.defineProperty(t,"__esModule",{value:!0}),t.dynamicSort=n,t.dynamicSortMultiple=r},function(e,t,s){"use strict";function n(e,t){var s=t.length,n=e.toLowerCase().indexOf(t),r=n+s;return e.substr(0,n)+"<strong>"+e.substr(n,s)+"</strong>"+e.substr(r,e.length-r)}Object.defineProperty(t,"__esModule",{value:!0}),t.emboldenMatch=n},function(e,t,s){"use strict";function n(e,t){Array.isArray(t)||(t=[t]);var s=-1,n=-1;return{match:t.some(function(t,r){return(n=t.indexOf(e))>-1&&(s=r,!0)}),arrayIndex:s,stringIndex:n}}Object.defineProperty(t,"__esModule",{value:!0}),t.findStringInStringArray=n},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.KEYCODE={CANCEL:3,HELP:6,BACK_SPACE:8,TAB:9,CLEAR:12,RETURN:13,ENTER:14,SHIFT:16,CONTROL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINTSCREEN:44,INSERT:45,DELETE:46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,SEMICOLON:59,EQUALS:61,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,CONTEXT_MENU:93,NUMPAD0:96,NUMPAD1:97,NUMPAD2:98,NUMPAD3:99,NUMPAD4:100,NUMPAD5:101,NUMPAD6:102,NUMPAD7:103,NUMPAD8:104,NUMPAD9:105,MULTIPLY:106,ADD:107,SEPARATOR:108,SUBTRACT:109,DECIMAL:110,DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,F16:127,F17:128,F18:129,F19:130,F20:131,F21:132,F22:133,F23:134,F24:135,NUM_LOCK:144,SCROLL_LOCK:145,COMMA:188,PERIOD:190,SLASH:191,BACK_QUOTE:192,OPEN_BRACKET:219,BACK_SLASH:220,CLOSE_BRACKET:221,QUOTE:222,META:224}},function(e,t){e.exports={availableLocales:{modern:["af","af-NA","am","ar","ar-AE","ar-BH","ar-DJ","ar-DZ","ar-EG","ar-EH","ar-ER","ar-IL","ar-IQ","ar-JO","ar-KM","ar-KW","ar-LB","ar-LY","ar-MA","ar-MR","ar-OM","ar-PS","ar-QA","ar-SA","ar-SD","ar-SO","ar-SS","ar-SY","ar-TD","ar-TN","ar-YE","az","az-Latn","be","bg","bn","bn-IN","bs","bs-Latn","ca","ca-AD","ca-ES-VALENCIA","ca-FR","ca-IT","cs","cy","da","da-GL","de","de-AT","de-BE","de-CH","de-IT","de-LI","de-LU","el","el-CY","en","en-001","en-150","en-AG","en-AI","en-AS","en-AT","en-AU","en-BB","en-BE","en-BI","en-BM","en-BS","en-BW","en-BZ","en-CA","en-CC","en-CH","en-CK","en-CM","en-CX","en-CY","en-DE","en-DG","en-DK","en-DM","en-ER","en-FI","en-FJ","en-FK","en-FM","en-GB","en-GD","en-GG","en-GH","en-GI","en-GM","en-GU","en-GY","en-HK","en-IE","en-IL","en-IM","en-IN","en-IO","en-JE","en-JM","en-KE","en-KI","en-KN","en-KY","en-LC","en-LR","en-LS","en-MG","en-MH","en-MO","en-MP","en-MS","en-MT","en-MU","en-MW","en-MY","en-NA","en-NF","en-NG","en-NL","en-NR","en-NU","en-NZ","en-PG","en-PH","en-PK","en-PN","en-PR","en-PW","en-RW","en-SB","en-SC","en-SD","en-SE","en-SG","en-SH","en-SI","en-SL","en-SS","en-SX","en-SZ","en-TC","en-TK","en-TO","en-TT","en-TV","en-TZ","en-UG","en-UM","en-US-POSIX","en-VC","en-VG","en-VI","en-VU","en-WS","en-ZA","en-ZM","en-ZW","es","es-419","es-AR","es-BO","es-BR","es-BZ","es-CL","es-CO","es-CR","es-CU","es-DO","es-EA","es-EC","es-GQ","es-GT","es-HN","es-IC","es-MX","es-NI","es-PA","es-PE","es-PH","es-PR","es-PY","es-SV","es-US","es-UY","es-VE","et","eu","fa","fa-AF","fi","fil","fo","fo-DK","fr","fr-BE","fr-BF","fr-BI","fr-BJ","fr-BL","fr-CA","fr-CD","fr-CF","fr-CG","fr-CH","fr-CI","fr-CM","fr-DJ","fr-DZ","fr-GA","fr-GF","fr-GN","fr-GP","fr-GQ","fr-HT","fr-KM","fr-LU","fr-MA","fr-MC","fr-MF","fr-MG","fr-ML","fr-MQ","fr-MR","fr-MU","fr-NC","fr-NE","fr-PF","fr-PM","fr-RE","fr-RW","fr-SC","fr-SN","fr-SY","fr-TD","fr-TG","fr-TN","fr-VU","fr-WF","fr-YT","ga","gl","gu","he","hi","hr","hr-BA","hu","hy","id","is","it","it-CH","it-SM","it-VA","ja","ka","kk","km","kn","ko","ko-KP","ky","lo","lt","lv","mk","ml","mn","mr","ms","ms-BN","ms-SG","my","nb","nb-SJ","ne","ne-IN","nl","nl-AW","nl-BE","nl-BQ","nl-CW","nl-SR","nl-SX","pa","pa-Guru","pl","pt","pt-AO","pt-CH","pt-CV","pt-GQ","pt-GW","pt-LU","pt-MO","pt-MZ","pt-PT","pt-ST","pt-TL","ro","ro-MD","root","ru","ru-BY","ru-KG","ru-KZ","ru-MD","ru-UA","si","sk","sl","sq","sq-MK","sq-XK","sr","sr-Cyrl","sr-Cyrl-BA","sr-Cyrl-ME","sr-Cyrl-XK","sr-Latn","sr-Latn-BA","sr-Latn-ME","sr-Latn-XK","sv","sv-AX","sv-FI","sw","sw-CD","sw-KE","sw-UG","ta","ta-LK","ta-MY","ta-SG","te","th","to","tr","tr-CY","uk","ur","ur-IN","uz","uz-Latn","vi","yue","zh","zh-Hans","zh-Hans-HK","zh-Hans-MO","zh-Hans-SG","zh-Hant","zh-Hant-HK","zh-Hant-MO","zu"],full:["af","af-NA","agq","ak","am","ar","ar-AE","ar-BH","ar-DJ","ar-DZ","ar-EG","ar-EH","ar-ER","ar-IL","ar-IQ","ar-JO","ar-KM","ar-KW","ar-LB","ar-LY","ar-MA","ar-MR","ar-OM","ar-PS","ar-QA","ar-SA","ar-SD","ar-SO","ar-SS","ar-SY","ar-TD","ar-TN","ar-YE","as","asa","ast","az","az-Cyrl","az-Latn","bas","be","bem","bez","bg","bm","bn","bn-IN","bo","bo-IN","br","brx","bs","bs-Cyrl","bs-Latn","ca","ca-AD","ca-ES-VALENCIA","ca-FR","ca-IT","ce","cgg","chr","ckb","ckb-IR","cs","cu","cy","da","da-GL","dav","de","de-AT","de-BE","de-CH","de-IT","de-LI","de-LU","dje","dsb","dua","dyo","dz","ebu","ee","ee-TG","el","el-CY","en","en-001","en-150","en-AG","en-AI","en-AS","en-AT","en-AU","en-BB","en-BE","en-BI","en-BM","en-BS","en-BW","en-BZ","en-CA","en-CC","en-CH","en-CK","en-CM","en-CX","en-CY","en-DE","en-DG","en-DK","en-DM","en-ER","en-FI","en-FJ","en-FK","en-FM","en-GB","en-GD","en-GG","en-GH","en-GI","en-GM","en-GU","en-GY","en-HK","en-IE","en-IL","en-IM","en-IN","en-IO","en-JE","en-JM","en-KE","en-KI","en-KN","en-KY","en-LC","en-LR","en-LS","en-MG","en-MH","en-MO","en-MP","en-MS","en-MT","en-MU","en-MW","en-MY","en-NA","en-NF","en-NG","en-NL","en-NR","en-NU","en-NZ","en-PG","en-PH","en-PK","en-PN","en-PR","en-PW","en-RW","en-SB","en-SC","en-SD","en-SE","en-SG","en-SH","en-SI","en-SL","en-SS","en-SX","en-SZ","en-TC","en-TK","en-TO","en-TT","en-TV","en-TZ","en-UG","en-UM","en-US-POSIX","en-VC","en-VG","en-VI","en-VU","en-WS","en-ZA","en-ZM","en-ZW","eo","es","es-419","es-AR","es-BO","es-BR","es-BZ","es-CL","es-CO","es-CR","es-CU","es-DO","es-EA","es-EC","es-GQ","es-GT","es-HN","es-IC","es-MX","es-NI","es-PA","es-PE","es-PH","es-PR","es-PY","es-SV","es-US","es-UY","es-VE","et","eu","ewo","fa","fa-AF","ff","ff-CM","ff-GN","ff-MR","fi","fil","fo","fo-DK","fr","fr-BE","fr-BF","fr-BI","fr-BJ","fr-BL","fr-CA","fr-CD","fr-CF","fr-CG","fr-CH","fr-CI","fr-CM","fr-DJ","fr-DZ","fr-GA","fr-GF","fr-GN","fr-GP","fr-GQ","fr-HT","fr-KM","fr-LU","fr-MA","fr-MC","fr-MF","fr-MG","fr-ML","fr-MQ","fr-MR","fr-MU","fr-NC","fr-NE","fr-PF","fr-PM","fr-RE","fr-RW","fr-SC","fr-SN","fr-SY","fr-TD","fr-TG","fr-TN","fr-VU","fr-WF","fr-YT","fur","fy","ga","gd","gl","gsw","gsw-FR","gsw-LI","gu","guz","gv","ha","ha-GH","ha-NE","haw","he","hi","hr","hr-BA","hsb","hu","hy","id","ig","ii","is","it","it-CH","it-SM","it-VA","ja","jgo","jmc","ka","kab","kam","kde","kea","khq","ki","kk","kkj","kl","kln","km","kn","ko","ko-KP","kok","ks","ksb","ksf","ksh","kw","ky","lag","lb","lg","lkt","ln","ln-AO","ln-CF","ln-CG","lo","lrc","lrc-IQ","lt","lu","luo","luy","lv","mas","mas-TZ","mer","mfe","mg","mgh","mgo","mk","ml","mn","mr","ms","ms-BN","ms-SG","mt","mua","my","mzn","naq","nb","nb-SJ","nd","nds","nds-NL","ne","ne-IN","nl","nl-AW","nl-BE","nl-BQ","nl-CW","nl-SR","nl-SX","nmg","nn","nnh","nus","nyn","om","om-KE","or","os","os-RU","pa","pa-Arab","pa-Guru","pl","prg","ps","pt","pt-AO","pt-CH","pt-CV","pt-GQ","pt-GW","pt-LU","pt-MO","pt-MZ","pt-PT","pt-ST","pt-TL","qu","qu-BO","qu-EC","rm","rn","ro","ro-MD","rof","root","ru","ru-BY","ru-KG","ru-KZ","ru-MD","ru-UA","rw","rwk","sah","saq","sbp","se","se-FI","se-SE","seh","ses","sg","shi","shi-Latn","shi-Tfng","si","sk","sl","smn","sn","so","so-DJ","so-ET","so-KE","sq","sq-MK","sq-XK","sr","sr-Cyrl","sr-Cyrl-BA","sr-Cyrl-ME","sr-Cyrl-XK","sr-Latn","sr-Latn-BA","sr-Latn-ME","sr-Latn-XK","sv","sv-AX","sv-FI","sw","sw-CD","sw-KE","sw-UG","ta","ta-LK","ta-MY","ta-SG","te","teo","teo-KE","th","ti","ti-ER","tk","to","tr","tr-CY","twq","tzm","ug","uk","ur","ur-IN","uz","uz-Arab","uz-Cyrl","uz-Latn","vai","vai-Latn","vai-Vaii","vi","vo","vun","wae","xog","yav","yi","yo","yo-BJ","yue","zgh","zh","zh-Hans","zh-Hans-HK","zh-Hans-MO","zh-Hans-SG","zh-Hant","zh-Hant-HK","zh-Hant-MO","zu"]}}},function(e,t,s){e.exports=s(0)}]);