if(!TableNames)var TableNames={USER_COOKIES:"cookies",INTERNAL_DB:"internaldb",TableNames_LENGTH:2};
var Cookie=function(a){this.cookie=function(c,b,d){if(void 0!==b)a.db.set(c,b,d);else return a.db.get(c)};this.cookie.list=function(){return a.db.list()};this.cookie.remove=function(c){a.db.remove(c)};this.cookie.removeAll=function(){a.db.removeAll()};this.cookie.get=function(c,b,d,e,f){a.db.setFromRemote(c,b,d,e,f)};a.mysite={cookie:function(c,b,d){if(void 0!==a.manifest.domain&&null!==a.manifest.domain){var e=(new Date).getTime();if(void 0!==b)void 0===d||d>e?(d=void 0===d?(new Date(2030,1,1,0,
0,0,0)).getTime():d.getTime(),"undefined"!==typeof Crossrider?Crossrider.setRealCookie(c,b,d):(a.updateRealCookie(c,{value:b,expires:d}),chrome.extension.sendRequest({action:"setRealCookie",params:[c,b,d,a.tabID]}))):"undefined"!==typeof Crossrider?Crossrider.unsetRealCookie(c):(a.unsetRealCookie(c),chrome.extension.sendRequest({action:"unsetRealCookie",params:[c]}));else return b=(c=a._cookies[TableNames.USER_COOKIES].mysite[c])?c.expires:null,null!==b&&"number"!==typeof b&&(b=(new Date(b)).getTime()),
c&&(null===b||b>e)?c.value:null}}};return this.cookie};function DBManager(a){this._currentTableName=a;this._self=null}
DBManager.prototype={init:function(a){this._self=a;var a=this._self._cookies[this.getTableName()],c;for(c in a)if(a.hasOwnProperty(c)&&"mysite"!==c){var b=a[c];"number"!==typeof b.expires&&(b.expires=(new Date(b.expires)).getTime())}return this},getTableName:function(){for(var a in TableNames)if(0>a.toLowerCase().indexOf("length")&&TableNames[a]===this._currentTableName)return this._currentTableName;return TableNames.USER_COOKIES},get:function(a){if("string"!==typeof a&&"number"!==typeof a)return null;
if("mysite"===a)throw"mysite is a reserved name";var c=(new Date).getTime(),b=this._self._cookies[this.getTableName()][a];if(b&&b.expires>c)return b.value;b&&this.remove(a);return null},getExpiration:function(a){return"string"!==typeof name&&"number"!==typeof name?null:null!==this.get(a)?new Date(this._self._cookies[this.getTableName()][a].expires):null},set:function(a,c,b,d){if("string"!==typeof a&&"number"!==typeof a)return!1;if("mysite"===a)throw"mysite is a reserved name";var e=(new Date).getTime();
void 0===b||b>e?(b=void 0===b?(new Date(2030,1,1,0,0,0,0)).getTime():b.getTime(),this._self.updateCookie(a,{value:c,expires:b},this.getTableName()),"undefined"!==typeof Crossrider?Crossrider.setCookie(a,c,b,this.getTableName(),void 0,d):chrome.extension.sendRequest({action:"setCookie",params:[a,c,b,this.getTableName(),this._self.tabID],passCallback:!0},function(){d&&d()})):this.remove(a);return!0},list:function(){var a={},c=this._self._cookies[this.getTableName()],b;for(b in c)if(c.hasOwnProperty(b)&&
"mysite"!==b){var d=this.get(b);null!==d&&(a[b]=d)}return a},getList:function(){var a=[],c=this._self._cookies[this.getTableName()],b=null,d;for(d in c)c.hasOwnProperty(d)&&"mysite"!==d&&(b=this.get(d),null!==b&&a.push({key:d,value:b,expiration:new Date(c[d].expires)}));return a},remove:function(a){if("undefined"!==typeof Crossrider)Crossrider.unsetCookie(a,this.getTableName());else{var c=this;chrome.extension.sendRequest({action:"unsetCookie",params:[a,this.getTableName()],passCallback:!0},function(){c._self.unsetCookie(a,
c.getTableName())})}},removeAll:function(){"undefined"!==typeof Crossrider?Crossrider.removeAllCookies(this.getTableName()):chrome.extension.sendRequest({action:"removeAllCookies",params:[this.getTableName()]})},removeExpired:function(){"undefined"!==typeof Crossrider?Crossrider.removeExpiredCookies(this.getTableName()):chrome.extension.sendRequest({action:"removeExpiredCookies",params:[this.getTableName()]})},updateExpiration:function(a,c){"undefined"!==typeof Crossrider?Crossrider.updateCookieExpiration(a,
c,this.getTableName()):chrome.extension.sendRequest({action:"updateCookieExpiration",params:[a,c,this.getTableName()]})}};