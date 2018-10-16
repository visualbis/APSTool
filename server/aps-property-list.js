"use strict";var _isIterable2=require("babel-runtime/core-js/is-iterable"),_isIterable3=_interopRequireDefault(_isIterable2),_getIterator2=require("babel-runtime/core-js/get-iterator"),_getIterator3=_interopRequireDefault(_getIterator2),_stringify=require("babel-runtime/core-js/json/stringify"),_stringify2=_interopRequireDefault(_stringify),_promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_slicedToArray=function(e,r){if(Array.isArray(e))return e;if((0,_isIterable3.default)(Object(e)))return function(e,r){var t=[],n=!0,i=!1,o=void 0;try{for(var a,s=(0,_getIterator3.default)(e);!(n=(a=s.next()).done)&&(t.push(a.value),!r||t.length!==r);n=!0);}catch(e){i=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}return t}(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")};function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var getPropertyList=function(e){return new _promise2.default(function(t,n){e.collection("propertybank").find(function(e,r){e&&n(e),r.toArray().then(function(e){t(e)})})})},analyzeSchema=function(e,p){var l=[],f=[],d=[],m=[];return function u(c,e){e.forEach(function(r){if("sections"===c&&(l.pop(),l.push(r.name)),"subsections"===c&&(f.pop(),f.push(r.name)),"groups"===c&&(d.pop(),d.push(r.name)),"properties"===c){var e=p.find(function(e){return e.name===r}),t=l.slice(-1),n=_slicedToArray(t,1)[0],i=f.slice(-1),o=_slicedToArray(i,1)[0],a=d.slice(-1),s=[n||"",o||"",_slicedToArray(a,1)[0]||""];e||console.log(r),m.push({name:r,type:e&&e.type||"",path:s.join(" -> "),title:e&&e.title?e.title.en:"",description:e&&e.description?e.description.en:""})}r.hasOwnProperty("subsections")?u("subsections",r.subsections):r.hasOwnProperty("group")?u("groups",r.group):r.hasOwnProperty("properties")&&u("properties",r.properties)})}("sections",e),{properties:m}};exports.getPropertyData=function(e,i){var o=e.mongo.db;o.db("vbx_current").collection("vbxReleases").findOne({version:e.query.version},function(e,r){var t=r.dbName;o=o.db(t),getPropertyList(o).then(function(n){o.collection("componentSchema").aggregate([{$lookup:{from:"components",localField:"cId",foreignField:"_id",as:"componentDetails"}},{$unwind:"$componentDetails"}],function(e,r){var t=r.map(function(e){return{name:e.componentDetails.name,data:analyzeSchema(e.sections,n)}});i((0,_stringify2.default)(t))})}).catch(function(e){i(e)})})};