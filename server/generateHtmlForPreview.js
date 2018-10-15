"use strict";var _assign=require("babel-runtime/core-js/object/assign"),_assign2=_interopRequireDefault(_assign),_extends=_assign2.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var Boom=require("boom"),fs=require("fs"),Handlebars=require("handlebars"),assert=require("assert"),ObjectId=require("mongodb").ObjectId,_=require("lodash"),map_sources=require("./mapCollections.js").map_sources,config=require("config"),simpleGit=require("simple-git")(config.get("application.dsxSourceLocation")),stringify=require("json-stable-stringify"),d3=require("d3-queue"),properties=void 0;function isHighChartBasedComponent(e){return _.includes(["AdvancedGauge","AdvancedKPITile","AngularGauge","AreaChart","BoxPlotChart","BubbleChart","BulletChart","ChartContainer","ColumnBarChart","ColumnBarChartNew","ColumnBarDrillDownChart","CombinationChart","DonutChart","DualAxesChart","FixedColumnChart","FunnelPyramidChart","FunnelPyramidDrillDownChart","GroupStackedColumnBarChart","HCMap","HeatMapChart","KPITile","LinearGauge","LineChart","MarimekkoChart","MultipleAxesChart","PieChart","PieDrillDownChart","PolarChart","ProgressBar","RadarChart","ScatterChart","SemicircledonutChart","SolidGauge ","SparkLineChart","SparkLineTableChart","StackedAreaChart","StackedColumnBarChart","SuperCombinationChart","TreeMap","TreeMapDrilldown","WaterfallChart","SPieChart","Sankey","ParallelCoordinates","SunBurst","SlopeChart","StreamGraph"],e)}function changeType(e,t){if("MultipleAxesChart"===t&&_.includes(["yaxistitletext","yaxistickinterval","yaxisminortickinterval","yaxislabelprefix","yaxislabelsuffix","tooltipvalueprefix","tooltipvaluesuffix"],e.name)&&(e.type="dynamic"),"HCMap"===t&&"mapsource"===e.name){var n=[];_.forOwn(map_sources,function(e,t){n.push({name:t.toLowerCase(),caption:e.name,group:e.type})}),e.groups={world:"World",continent:"Continents & Regions",custom:"Custom",country:"Countries","ca-admin2":"Canada (Admin 2)","fr-admin2":"France (Admin 2)","de-admin2":"Germany (Admin 2)","de-admin3":"Germany (Admin 3)","nl-admin2":"Netherlands (Admin 2)","no-admin2":"Norway (Admin 2)","us-admin2":"United States (Admin 2)","us-admin3":"United States Congressional Districts (Admin 3)"},e.members=n}}function mapProperties(e,t,n,r,i,o){return _.map(e,function(e){return e.properties&&(e.properties=_.map(e.properties,function(i){var a=_.cloneDeep(_.find(t,{name:i}));a?(a.hasOwnProperty("_id")&&delete a._id,a.title=a.title&&a.title.en?a.title.en:"",a.hasOwnProperty("csTitle")&&a.csTitle.hasOwnProperty(o)&&a.csTitle[o]?(a.title=a.csTitle[o].en||"",delete a.csTitle):a.hasOwnProperty("csTitle")&&delete a.csTitle,a.description=a.description&&a.description.en?a.description.en:"",a.hasOwnProperty("csDescription")&&a.csDescription.hasOwnProperty(o)&&a.csDescription[o]?(a.description=a.csDescription[o].en||"",delete a.csDescription):a.hasOwnProperty("csDescription")&&delete a.csDescription,a.hasOwnProperty("isLocked")&&delete a.isLocked,a.members&&"string"!=typeof a.members&&a.members.length>0&&(a.members=a.members.map(function(e){return _extends({},e,{caption:e.caption.en||""})})),a.category&&delete a.category,a.section&&delete a.section,a.platform&&delete a.platform,a.structuralType&&delete a.structuralType):(console.log("Error : property '"+i+"' not found in property-bank.json"),a={});var s=n.slice(0);return s.push(e.name),a.path=s,changeType(a,r),a}),"dev"!==i&&(e.properties=_.map(e.properties,function(e){return _.omit(e,["category","section"])}))),e})}function generateApsHTML(e,t,n,r,i,o,a){var s=void 0;s="file"===n?"dev"===o?config.get("application.mockTemplate"):config.get("application.prodTemplate"):__dirname+"/component-template-prod.html",fs.readFile(s,function(s,c){if(s)a(s);else{var l=Handlebars.compile(c.toString());if(t){var p=t.schemaId,u=t.name,d=u.toLowerCase()+"_additional_properties_sheet.html";d="dev"===o?config.get("application.mockOutput")+d:config.get("application.prodOutput")+d;var m=function(e,t){var i={},s={};e?s.sections=e.sections:"new"===r&&t.newSchema?s.sections=t.newSchema:s.sections="new"===r?t.sections:t.oldSchema,e?s._id=e._id:t.schemaId?s._id=t.schemaId:s._id=t._id.toString();var c=mapProperties(s.sections,properties,[],u,o,s._id);s.sections=c,_.each(s.sections,function(e){if(e.subsections){var t=e.subsections,n=mapProperties(t,properties,[e.name],u,o,s._id.toString());e.subsections=n,_.each(t,function(t){var n=mapProperties(t.group,properties,[e.name,t.name],u,o,s._id.toString());t.group=n})}}),isHighChartBasedComponent(u)&&s.sections.push({name:"CSS"}),s.sections.push({name:"Tools"}),s.sections.push({name:"Info"}),i.sections=s.sections,n&&"html"===n?a(null,l({componentName:u,properties:stringify(i),domain:config.get("serverConfig.host")})):n&&"file"===n?fs.writeFile(d,l({componentName:u,properties:stringify(i)}),function(e){if(e)return console.log(e);a(null,t)}):a("error: invalid responseType")};i?m(i,null):e.collection("componentSchemaDev").findOne({schemaId:p,approvalStatus:"pending"},function(t,n){s&&a(s),n?m(null,n):e.collection("componentSchema").findOne({_id:ObjectId(p)},function(e,t){s&&a(s),m(null,t)})})}else a("invalid component object")}})}exports.generateHtml=function(e,t,n,r,i,o,a){e.collection("propertybank").find(function(s,c){s&&a(s),c.toArray().then(function(s){if(properties=s,"file"===n){var c=[],l=d3.queue(1);t.forEach(function(t){c.push("**APS-TOOL** - "+t.updatedBy+" - "+t.changeMsg+"  #"+t._id.toString()),l.defer(generateApsHTML,e,t,n,r,i,"prod")}),l.awaitAll(function(e,t){if(e)throw e;simpleGit.add("./*").commit(c,function(e){e?console.log("failed to commit #"):console.log("Commited successfully"),a(null)})})}else generateApsHTML(e,t,n,r,i,o,a)})})};