var AppApi=function(){};
AppApi.prototype={_dom:{},_faye:{callbacks:{},asyncCallbacks:{}},_removedCookies:{},_cookies:{},init:function(a){this.db=new DBManager(TableNames.USER_COOKIES);this.internal={};this.internal.db=new DBManager(TableNames.INTERNAL_DB);this.cookie=new Cookie(this);this.push=new Push(this);this.chrome=new ChromeAPI(this);this.browserAction=this.chrome.browserAction;this.tabID=a.tabID;this.manifest=a.manifest;this.appID=this.manifest.crossrider.appID;this.cr_version=this.manifest.version;this.version=this.manifest.ver;
this.platform=this.manifest.platform;this.debugMode=this.manifest.crossrider.debug;this._cookies=a._cookies;this.message=new Message(this);this.message.setTabId(a.tabID);this._initInternalMessaging();this._getUserScripts();for(var b in TableNames)0>b.toLowerCase().indexOf("length")&&(this._removedCookies[TableNames[b]]={})},_initInternalMessaging:function(){chrome.extension.onRequest.addListener(this._onRequest.bind(this))},_getUserScripts:function(){var a=this.appID;document.documentElement.getAttribute("CrossriderApp"+
a)||document.documentElement.setAttribute("CrossriderApp"+a,!0);var b=document.getElementById("crossrider-app-stub"+a),c=window.top===window.self;null===b&&c&&(b=document.createElement("div"),b.id="crossrider-app-stub"+a,document.getElementsByTagName("body")[0].appendChild(b),chrome.extension.sendRequest({action:"addUserScripts"}))},_onRequest:function(a,b,c){var d=a.action,b=null;d&&(b=a.hasOwnProperty("scope")&&this[a.scope].hasOwnProperty(d)?this[a.scope][d]:this[d]);"function"===typeof b&&(d=
a.params&&"function"===typeof a.params.push?a.params:[],!0===a.passCallback&&d.push(c),b.apply(this,d))},initContentScript:function(a,b,c,d){var e;a.forEach(function(a){e=document.createElement("link");e.setAttribute("rel","stylesheet");e.setAttribute("type","text/css");e.setAttribute("href",a);document.getElementsByTagName("head")[0].appendChild(e)}.bind(this));this._cookies=JSON.parse(b);this.db.init(this);this.internal.db.init(this);this.asyncAPI=AsyncAPI.init(this);c?(this._bic=c,d()):chrome.extension.sendRequest({action:"setToolbarUniqueID",
params:[],passCallback:!0},function(a){this._bic=a;d()}.bind(this))},openURL:function(a,b){chrome.extension.sendRequest({action:"openURL",params:[a,b]})},superAlert:function(a){chrome.extension.sendRequest({action:"superAlert",params:[a]})},removeExpiredCookies:function(a,b){if(0<b.length)for(var c=0;c<b.length;++c){var d=b[c];0<=b.indexOf(d)&&this._cookies[a].hasOwnProperty(d)&&delete this._cookies[a][d]}},updateCookie:function(a,b,c){var d=this;this._cookies?this._removedCookies[c][a]?delete this._removedCookies[c][a]:
this._cookies[c][a]={value:b.value,expires:b.expires}:setTimeout(function(){d.updateCookie(a,b,c)},25)},updateCookieExpiration:function(a,b,c){this._cookies[c].expires=b},unsetCookie:function(a,b){this._cookies[b][a]&&(this._removedCookies[b][a]=!0,delete this._cookies[b][a])},removeAllCookies:function(a){for(cookie in this._cookies[a])this._removedCookies[a][cookie]=!0;this._cookies[a]={}},updateRealCookie:function(a,b){this._removedCookies[TableNames.USER_COOKIES]["real"+a]?delete this._removedCookies[TableNames.USER_COOKIES]["real"+
a]:this._cookies[TableNames.USER_COOKIES].mysite[a]={value:b.value,expires:b.expires}},unsetRealCookie:function(a){this._cookies[TableNames.USER_COOKIES].mysite[a]&&(this._removedCookies[TableNames.USER_COOKIES]["real"+a]=!0,delete this._cookies[TableNames.USER_COOKIES].mysite[a])},respond:function(a,b,c){c=c?"asyncCallbacks":"callbacks";if(this._faye[c][a])this._faye[c][a](b)},getTabId:function(){return this.tabID},isDebugMode:function(){return this.debugMode},getCrossriderID:function(){return this._bic},
fb_respond:function(a,b){this.fbAPI.callback(a,b)},handleMessage:function(a){this.message.call(a)},background:{reload:function(){chrome.extension.sendRequest({action:"reload"})}},getAPIInfo:function(){return{appID:this.appID,cr_version:this.cr_version,version:this.version,platform:this.platform}}};chrome.extension.sendRequest({action:"getAppData",passCallback:!0},function(a){var b=window.top!==window.self;"true"!==a.manifest.runiniframe&&b||(window.appAPI=new AppApi,appAPI.init(a))});