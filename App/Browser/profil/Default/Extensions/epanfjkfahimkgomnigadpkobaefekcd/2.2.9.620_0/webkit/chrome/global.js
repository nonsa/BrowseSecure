var IS_CHROME=!0,tabStorage={},TRUE_BLOCK=!1,abNoOp="var abNoOp=function(i,a){return (a&&a.length?a[0]:null)||true;},abSC=function(n,v){document.cookie=n+'='+v+';path=/;expires='+(new Date((new Date()).getTime()+(30000*60*60*24))).toGMTString();},abGC=function(n){return document.cookie.indexOf(n+'=')!=-1;},abAddNoOpMethods=function(o,m){m=m.split(',');for(var i=0;i<m.length;i++){if(m[i].match(/^#/)){o['get'+m[i].substr(1)]=o['set'+m[i].substr(1)]=abNoOp;}else{o[m[i]]=abNoOp;}}};";abNoOp+="var abClickEvent=function(n){if(n.click){n.click();}else{var e=n.ownerDocument.createEvent('MouseEvents');e.initMouseEvent('click',true, true, n.ownerDocument.defaultView, 1,0,0,0,0,false,false,false,false,0,null);n.dispatchEvent(e);}};";
function getBase64EncodedStub(a,b){var c="{}";b.indexOf("?")!=-1&&(c={},b.replace(/([^?=&]+)(=([^&]*))?/g,function(a,b,h,i){c[b]=unescape(i)}),c=JSON.stringify(c));a="var abPrm="+c+";"+abNoOp+a;return window.btoa(a)}
var bridge={isChrome:!0,browser_name:"chrome",tabs:{sendRequest:function(a,b,c){chrome.tabs.sendRequest(a,b,c)}},initPopover:function(a,b,c){popoverDocument=c;webdb.updateTotalBlocked();chrome.tabs.getSelected(a,function(a){if(a.id in tabStorage)b(a);else if(a=c.getElementById("notscanned"))a.innerHTML=DNTP._("dntp.notscanned")})},localeInit:function(){DNTP.currentLocale=navigator.language.replace(/\-.*/,"").toLowerCase()},settings:{getItem:function(a,b){var c=localStorage.getItem(a);!c&&b&&(c=b);
return c},setItem:function(a,b){b===null?localStorage.removeItem(a):localStorage.setItem(a,b)},clear:function(a){localStorage.removeItem(a)}},_:function(a,b){var c=null,a=a.replace(/\./g,"_");arguments.length>1&&(b=Array.prototype.slice.call(arguments,1));try{DNTP.bundle?(c=DNTP.bundle[a].message)&&b&&(c=c.replace(/\$([0-9]+)/g,function(a,c){return b[parseInt(c)-1]})):c=chrome.i18n.getMessage(a,b)}catch(e){}if(!c||c=="")c="***"+a;return c},initMessageHandler:function(){chrome.extension.onRequest.addListener(handleMessage)},
initTabListener:function(){chrome.tabs.onRemoved.addListener(function(a){clearTabData(a)});chrome.tabs.onUpdated.addListener(function(a){updateToolbarIcon(a)})},showPostInstallPage:function(a){this.openNewTab(a)},initTheme:function(){if(!DNTP.themeLoaded){DNTP.themeLoaded=!0;if(DNTP.theme=="default")DNTP.theme="";var a="webkit/popup.html";DNTP.theme!=""?(a="chrome/content/themes/"+DNTP.theme+"/webkit.html",DNTP.getImageUrl=function(a){return"images/"+a},DNTP.getResourceUrl=function(a){return"../../"+
a}):(DNTP.getImageUrl=function(a){return"../chrome/content/images/"+a},DNTP.getResourceUrl=function(a){return"../chrome/content/"+a});this.setPopupUrl(a)}},setPopupUrl:function(a){chrome.browserAction.setPopup({popup:a})},initPopoverListener:function(){this.initTheme()},addLinkHandlers:function(){},openNewTab:function(a){chrome.tabs.create({url:a,selected:!0})},getCurrentTabErrors:function(a){return tabStorage[a].pageErrors},cookies:{set:function(a){chrome.cookies.set(a)},remove:function(a){chrome.cookies.remove(a)}},
app:{getDetails:function(){return chrome.app.getDetails()}},updateNotificationsTabData:function(a,b){var c=getTabData(a);if(c)c.abineNotifications=b},updateToolbarIcon:function(a){chrome.browserAction.setBadgeBackgroundColor({color:a.color,tabId:a.tabId});chrome.browserAction.setTitle({title:a.title,tabId:a.tabId});chrome.browserAction.setBadgeText({text:a.text,tabId:a.tabId});chrome.browserAction.setIcon({path:a.path,tabId:a.tabId})}};DNTP.closePopup=function(){popoverDocument.defaultView.close()};
function resizePopup(){}function getTabData(a,b){if(!a)return{};if(!(a in tabStorage)){if(b)return!1;tabStorage[a]={tabId:a,abineHosts:{length:0},abineTracking:{length:0},abineBlocked:{length:0},abineOptout:{length:0},disabledHere:!1,abineAllowedSite:!1,startTime:new Date,urlsBlocked:{},host:null,url:null,pageErrors:[]}}return tabStorage[a]}function clearTabData(a){a&&(a in tabStorage&&(DNTP.Events.trigger("PageUnload",tabStorage[a]),delete tabStorage[a]),webdb.updateTotalBlocked())}
var shouldLoad=function(a){var b={cancel:!1};if(a.tabId==-1||DNTP.pauseContentPolicy)return b;var c=a.url,e=c.getDomain();if(a.type=="main_frame"){clearTabData(a.tabId);var d=getTabData(a.tabId);d.host=e;a=useGlobalAllow&&e in suggestedAllowSites;d.disabledHere=e in disabledSites||a&&!blockedSites[e];d.abineAllowedSite=a;return b}var d=getTabData(a.tabId),h={};if(d.disabledHere)return b;var i=d.host;if(!i)return b;if(!e)return b;h.req_host=e;h.url=c;var d=null,f={sub_frame:"iframe",script:"script",
xmlhttprequest:"object",image:"image",object:"object",other:"object"};if(a.type!="script"||!c.match(combinerScripts))d=getMatchingRuleV2(c,c.getHostname(),f[a.type]);if(h.rule=d){var f=d.name,g=!1;if(useGlobalAllow&&d.allowDomain){if(!d.allowDomain.source)d.allowDomain=RegExp(d.allowDomain,"i");i.match(d.allowDomain)&&(g=!0)}if(i=trackerIsBlocked(DNTP.settings.trackerMap,i,f,g))h.isBlocked=!0,b=a.type=="image"?{redirectUrl:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="}:
a.type=="sub_frame"?{redirectUrl:"about:blank"}:a.type=="script"&&d.stub?{redirectUrl:"data:application/javascript;base64,"+getBase64EncodedStub(d.stub,c)}:{cancel:!0},h.message="requestBlocked",bridge.tabs.sendRequest(a.tabId,h,function(){});updateTabData(f,e,i,g,a.tabId,c,a.type)}else updateTabData(null,e,!1,!1,a.tabId);return b},addDNTHeader=function(a){a.requestHeaders.push({name:"DNT",value:"1"});return{requestHeaders:a.requestHeaders}},handleMessage=function(a,b,c){if(a.message=="loadRules"){var e=
b.tab.id,d=getTabData(e);d.url=b.tab.url;b=d.host;a.topWindow&&updateToolbarIcon(e);TRUE_BLOCK?c({topDomain:b,urlsBlocked:d.urlsBlocked}):(e={},e["*"]=DNTP.settings.trackerMap["*"],e[b]=DNTP.settings.trackerMap[b],c({trackerMap:e,domainMap:domainMap,disabledHere:d.disabledHere,topDomain:b}))}else if(a.message=="newHost")TRUE_BLOCK==!1&&updateTabData(null,a.requestHost,!1,!1,b.tab.id);else if(a.message=="trackerFound")TRUE_BLOCK==!1&&updateTabData(a.ruleName,a.requestHost,a.blocked,a.allowedByTopDomain,
b.tab.id);else if(a.message=="allowTracker")toggleTrackerFromBackground(!1,a.name,a.host,b.tab.id);else if(a.message=="computeBadgeAndNotifications")DNTP.BadgeManager.compute(b.tab.id),d=getTabData(b.tab.id),DNTP.computeNotifications(null,d),updateToolbarIconWithData(d,b.tab.id);else if(a.message=="testNotifications"){if(DNTP.NotificationManager.noteCounts={},a.newMsgs)DNTP.notificationMessages=a.newMsgs.messages,d=getTabData(b.tab.id),DNTP.computeNotifications(null,d),updateToolbarIconWithData(d,
b.tab.id)}else if(a.message=="changeLocale")DNTP.bundle=null,a.locale&&DNTP.sendRequest("../../_locales/"+a.locale+"/messages.json",function(b){b?(DNTP.currentLocale=a.locale,DNTP.bundle=JSON.parse(b)):(DNTP.currentLocale=navigator.language.replace(/\-.*/,"").toLowerCase(),DNTP.bundle=null)});else if(a.message=="recordError")e=b.tab.id,d=getTabData(e),d.pageErrors.push(a.errorMsg),d.pageErrors.length>5&&d.pageErrors.shift();else if(a.message=="PageLoadDone")e=b.tab.id,d=getTabData(e),d.referrer=a.referrer,
d.title=a.title,DNTP.Events.trigger("PageLoad",d);else if(a.message=="PageUnload")e=b.tab.id,d=getTabData(e),DNTP.Events.trigger("PageUnload",d);else if(a.message=="getDailyTotals")c(JSON.stringify(DNTP.getDailyTotals(a.year)));else if(a.message=="getBadTrackerTotals")c(JSON.stringify(DNTP.getBadTrackerTotals()));else return!1},updateTabData=function(a,b,c,e,d,h,i){var f=getTabData(d);b in f.abineHosts||(f.abineHosts[b]=1,f.abineHosts.length++);if(a){var g=f.abineTracking,b=!1;a in g||(g[a]=e?2:1,
g.length++,b=!0);if(c)e=f.abineBlocked,a in e||(e[a]=1,e.length++,b=!0,a in DNTP.socialBlocked&&DNTP.socialBlocked[a]++,totalBlocked++),f.urlsBlocked[h]={rule:a,type:i};b&&(updateToolbarIcon(d),DNTP.Events.trigger(c?"TrackerBlocked":"TrackerFound",null,f.host,a,null,h,f.url),DNTP.Events.trigger("TrackerCountChanged",f),bridge.tabs.sendRequest(d,{message:"TrackerCountChanged",tabData:f}))}};function siteDisabled(a,b){getTabData(a).disabledHere=b}
function updateToolbarIcon(a){updateToolbarIconWithData(getTabData(a),a)}
function updateToolbarIconWithData(a,b){var c=[255,0,0,255],e=[225,193,0,255],d=[0,255,0,255],h="DoNotTrackMe",i="0",f=0;if(a.disabledHere)i=DNTP._("dntp.tooltip.off"),h+=" "+DNTP._("dntp.tooltip.onoff"),d=c;else if(a.abineTracking){var g=a.abineTracking.length+a.abineOptout.length,j=a.abineBlocked.length;writeCookies&&(j+=a.abineOptout.length);j=j?j:"0";g=g?g:"0";f=j;h+="\n"+DNTP._("dntp.tooltip.txt",j,g);i=""+g;if(a.host&&a.host.replace(/^www[0-9]*\./,"")in DNTP.socialMap)d=e;else if(j<g){var d=
e,e=a.abineTracking?a.abineTracking:[],g=a.abineBlocked?a.abineBlocked:[],k;for(k in e)k!="length"&&e[k]!=2&&!g[k]&&(d=c)}}c="../../Icon.png";k=DNTP.Config.get("newTrackers","");if(e=DNTP.BadgeManager.getUnviewedBadge())c=DNTP.IMAGE_PATH+e.icon.replace(/.png/,"-sm.png");else if(a.abineNotifications&&a.abineNotifications.hasAlertIcon||k&&k.length>0)c=DNTP.IMAGE_PATH+"privacy_alert_toolbar.png",i="";bridge.updateToolbarIcon({color:d,title:h,text:i,path:c,tabId:b,blocked:f,host:a.host})}
try{chrome.webRequest.onBeforeRequest.addListener(shouldLoad,{urls:["<all_urls>"],types:"main_frame,sub_frame,script,xmlhttprequest,image,object,other".split(",")},["blocking"]),chrome.webRequest.onBeforeSendHeaders.addListener(addDNTHeader,{urls:["<all_urls>"]},["blocking","requestHeaders"]),TRUE_BLOCK=!0}catch(e$$6){};