/*
**********************************************************************************
 (C) 2011 by Abine, Inc. All Rights Reserved.

 This software is the confidential and proprietary information
 of Abine, Inc. ("Confidential Information"), subject
 to the Non-Disclosure Agreement and/or License Agreement you entered
 into with Abine. You shall use such Confidential Information only
 in accordance with the terms of said Agreement(s). Abine makes
 no representations or warranties about the suitability of the
 software. The software is provided with ABSOLUTELY NO WARRANTY
 and Abine will NOT BE LIABLE for ANY DAMAGES resulting from
 the use of the software.

 Contact license@getabine.com with any license-related questions.

 http://www.getabine.com

*/
var tabID=null,docElement={},getMatchingOptout=function(a){if(DNTP.OPTOUT_DISABLED)return null;for(var c={},b=[];;){if(a in optoutMap)for(var d=0;d<optoutMap[a].length;d++)optoutMap[a][d][0]in c||(c[optoutMap[a][d][0]]=1,b.push(optoutMap[a][d][0]));else if("."+a in optoutMap)for(var f="."+a,d=0;d<optoutMap[f].length;d++)optoutMap[f][d][0]in c||(c[optoutMap[f][d][0]]=1,b.push(optoutMap[f][d][0]));d=a.indexOf(".");a=d==-1?"*":a.substr(d+1);if(a=="*")return b.length==0?null:b}},toggleAllTrackersOnSite=
function(a,c){var b=docElement.abineTracking,d;for(d in b)d!="length"&&toggleTracker(c,d,a,!0);DNTP.settings.trackerMap[a]={"*":c?1:0}},toggleAllTrackers=function(a){DNTP.settings.trackerMap={};for(var c in DNTP.trackerNames)toggleTracker(a,c,"*")},toggleTracker=function(a,c,b,d){var f=!1;DNTP.settings.trackerMap[b]||(DNTP.settings.trackerMap[b]={});var e=c.replace(" ","");if(c=="*")a?(d?b in disabledSites&&delete disabledSites[b]:b in disabledSites||(disabledSites[b]=1),DNTP.settings.trackerMap[b]["*"]=
0):(b in disabledSites&&delete disabledSites[b],b in disabledSitesReason&&delete disabledSitesReason[b]),a||delete DNTP.settings.trackerMap[b]["*"],docElement.abineDisabled=a,siteDisabled(tabID,a),a?b in blockedSites&&delete blockedSites[b]:!(b in blockedSites)&&d&&(blockedSites[b]=1),bridge.tabs.sendRequest(tabID,{message:"siteOnOff",disabled:a},function(){}),webdb.updateDisabledSites(),updateToolbarIcon(tabID);else{if(b=="*"){for(var h in DNTP.settings.trackerMap)h!="*"&&c in DNTP.settings.trackerMap[h]&&
delete DNTP.settings.trackerMap[h][c];webdb.toggleGlobal(c)}a?(DNTP.settings.trackerMap[b][c]=1,webdb.setValue(c,1,b)):(DNTP.settings.trackerMap[b][c]=0,webdb.setValue(c,0,b));var j=popoverDocument,e=c.replace(" ",""),d=docElement.abineTracking;h=!0;var i=null,g=null;j&&(i=j.getElementById("g"+e),i||(i=j.getElementById(e),h=!1));if(i)e=i.getElementsByTagName("img"),g=e[e.length-1],g.className&&g.className.indexOf("skip")!=-1&&(g=null),i.className=i.className.replace(/\s(on|off)/i,"")+(a?" on":" off");
e="";docElement.abineTracking[c]==2&&(e=".recommended");if(a){if(g)g.src=g.src.replace("cancel","accept"),g.nextSibling.nodeValue=h?" "+DNTP._("dntp.global.blockedeverywhere"):" "+DNTP._("dntp.capblockedhere"+e);e=docElement.abineBlocked;!(c in e)&&c in d&&(e[c]=1,e.length++,f=!0)}else{if(g)g.src=g.src.replace("accept","cancel"),g.nextSibling.nodeValue=h?" "+DNTP._("dntp.global.notblocked"):" "+DNTP._("dntp.notblockedhere"+e);e=docElement.abineBlocked;c in e&&(e[c]=0,delete e[c],e.length--,f=!0)}f&&
(b!="*"&&bridge.tabs.sendRequest(tabID,{message:"toggleTracker",name:c,host:b,blocked:a},function(){}),updateToolbarIcon(tabID))}},showPostInstall=function(){(new DNTP.View.ToolTip(docElement,popoverDocument)).show()};
function setupData(a){docElement={};docElement.tabId=a.tabId;docElement.abineTracking=a.abineTracking;docElement.abineBlocked=a.abineBlocked;docElement.abineHosts=a.abineHosts;docElement.abineDisabled=a.disabledHere;docElement.abineOptout=a.abineOptout;docElement.abineNotifications=a.abineNotifications||null;docElement._secondClick=!1;docElement.abineAllowedSite=a.abineAllowedSite;docElement.url=a.url;docElement.host=a.host;docElement.topDomain=getUserTopLevelDomain(a.host);var a=DNTP.Config.getWriteCookies(),
c=!1,b;for(b in docElement.abineHosts)if(docElement.abineHosts[b]!=2){docElement.abineHosts[b]=2;var d=getMatchingOptout(b);if(d)for(var f=docElement.abineOptout,e=0;e<d.length;e++)d[e]in f||(f[d[e]]=1,f.length++,a&&totalOptout++,c=!0)}c&&(webdb.updateTotalBlocked(),updateToolbarIcon(tabID),bridge.tabs.sendRequest(tabID,{message:"updateOptout",abineOptout:docElement.abineOptout,abineHosts:docElement.abineHosts},function(){}))}
var fillPopup=function(a,c){setupData(a,c);var b=new DNTP.View.Alert(docElement,popoverDocument);SILENT?webdb.getSetting("showPostInstall",null,function(a){!a||a==""?b.show():(b.close(),bridge.showPostInstallPage(a),webdb.setSetting("showPostInstall",null))}):b.show()},getDataFromTab=function(a){tabID=a.id;fillPopup(getTabData(tabID))};