var EXPORTED_SYMBOLS=[];Components.utils["import"]("resource://dntp/ff/overlay.js");DNTP.templates={};DNTP.templates.View_light_allowed_sites=function(b){this.window=b};
DNTP.templates.View_light_allowed_sites.prototype.render=function(b,c){var d="";if(c.toggledOff){d+='\n<div id="DNTPreport" class="clearfix block highlight">\n    <b>'+DNTP._("dntp.now.disabled",b.host)+'</b><br/><br/>\n    <span style="color:red;">'+DNTP._("dntp.webkit.pleasewait")+"</span><br/><br/>\n    "+DNTP._("dntp.helpothers")+'<br/><br/>\n    <div id=reasons><ul style="padding-left:20px;">\n    ';b.observe("reason1","click",function(a){a=a||event;a=a.target||a.srcElement;b.$("DNTPdesc").value=
a.textContent||a.innerText;b.reportIssue()});d+="\n    <li id=reason1>"+DNTP._("site.not.working.reason")+'</li>\n    <li id=reason2 style="text-decoration: none; cursor: auto">'+DNTP._("other.reason")+'</li>\n    <textarea id="DNTPdesc" style="width:90%;height:50px;resize:none;" name="description"></textarea>\n        <div class="am"><input type="submit" id="DNTPreportissueform" class="DNTPbutton2"\n                               style="padding: 5px; display: block; float: left"\n                           value="'+
DNTP._("dntp.submit")+'" />\n        </div>\n    </ul></div>\n\n</div>\n';if(b.fadeTimer<15E3)b.fadeTimer=15E3;if(c.toggledOff)b.docElement.toggledOff=!1}d+='\n\n<div id="DNTPonOffAtSite">\n    ';c.disabledSites.length>0&&(d+='\n    <div class=fl style="margin-top:8px;">'+DNTP._("allowed.sites")+"</div><br class=cb />\n    ");d+="\n</div>\n";if(c.removedSite)d+='\n  <div class=block style="padding:5px;"><span style="color:green;">',DNTP._("now.blocking"),d+=" "+c.removedSite+"</span></div>\n  ",c.removedSite=
null;if(c.reloadRequired)c.reloadRequired=!1,d+='\n  <div class="block" style="background-color: #ffffcc; padding: 5px"><span>\n    '+DNTP._("dntp.webkit.pleasewait")+"</span>\n  </div>\n";d+='\n\n<div class="block">\n    <ul class=allowedSites>\n';if(c.disabledSites.length==0)d+="\n    <li>"+DNTP._("none.disabled.sites")+"<br/><br/></li>\n";else{d+="\n    ";for(var a=c.disabledSites.length-1,f=!0;a>=0;a--){var e=c.disabledSites[a];(function(a){b.observe(a,"click",function(){DNTP.toggle_tracker(b.parentDoc,
b.doc,!1,"*",a);c.removedSite=a;if(b.host==a)c.abineDisabled=!1,c.reloadRequired=!0,DNTP.update_toolbar_icon(b.parentDoc);b.show()})})(e);d+="\n        <li "+(!f?'style="border-top: solid 1px #e5e5e5;"':"")+'>\n            <img class=fr src="'+DNTP.getImageUrl("cross.gif")+'" id="'+e+'"/>\n            <div style="'+(e in c.reasons?"":"padding-top: 4px;")+'">'+e+"\n            ";e in c.reasons&&(d+="\n                <br/><small>"+c.reasons[e]+"</small>\n            ");d+="\n            </div>\n        </li>\n        ";
f=!1}d+="\n"}d+="\n    </ul>\n</div>\n";b.observe("DNTPreportissueform","click",b.bind(b.reportIssue));return d};DNTP.templates.View_light_layout=function(b){this.window=b};
DNTP.templates.View_light_layout.prototype.render=function(b,c){function d(a){return a.image?' class=imageButton style="background-image:url('+a.image+');background-repeat: no-repeat;" title="'+a.label+'" ':""}function a(a){return a.alert?'<img src="'+DNTP.getImageUrl("alert.png")+'" class=alert />':""}var f=DNTP._,e="";b.observe("abineArea","click",function(){var a=b.fixExternalLink(DNTP.getLinkUrl("abine"));DNTP.openWindowInNewTab(a);return DNTP.preventDefault.apply(DNTP,arguments)});b.observe("dntmeArea",
"click",function(){var a=b.fixExternalLink(DNTP.getLinkUrl("how"));DNTP.openWindowInNewTab(a);return DNTP.preventDefault.apply(DNTP,arguments)});e+='\n<div id="dntpContainer">\n\t<div id="header">\n        <img src="'+DNTP.getImageUrl("logo.png")+'" height="16px" width="181px" style="margin-top:2px;" usemap="#logoMap"/>\n\t\t<div id="closePopup">\n            <a href="#"><img src="'+DNTP.getImageUrl("close.png")+'" height="20px" width="20px" title="Close"/></a>\n\t\t</div>\n\t\t<div id="help">\n            <a class=externalLink target="_blank" href="'+
DNTP.getLinkUrl("dnt_faq")+'" title="Help">\n                <img src="'+DNTP.getImageUrl("question.png")+'" height="20px" width="20px"/>\n            </a>\n\t\t</div>\n        <div id="showGlobal">\n            <img src="'+DNTP.getImageUrl("settings.png")+'" height="20px" width="20px"  title="'+f("dntp.footer.settings")+'"/>\n        </div>\n\t</div>\n\t<div class="body">\n\t\t'+c.body+'\n\t</div>\n</div>\n<map name=logoMap>\n    <area id="abineArea" shape="rect" coords="0,0,48,16" href="#" alt="Abine Inc.">\n    <area id="dntmeArea" shape="rect" coords="52,0,181,16" href="#" alt="Do Not Track Me">\n</map>\n';
if(c.notifications){e+="\n\t";if(c.notifications.length==1){var g=c.notifications[0];e+="\n\t        ";if(g.lowerHalfMsg)e+='\n\n                <div id="lowerHalfMsg" '+d(g)+'>\n                    <div id="closeArea"><a id="closeMessage" style="text-align: right; z-index: 10;" href="#"><img src="'+DNTP.getImageUrl("close.png")+'" height="20px" width="20px" title="Close Message"/></a></div>\n                    '+a(g)+"\n                    ",e+=(new DNTP.templates.View_light_notification_link(this.window)).render(b,
{item:g}),e+="\n                </div>\n\t        ";else{if(g.badTracker)g.label=DNTP._(g.label,g.badTracker);e+='\n                <div id="notifyBar" class=am>\n                    <div id="notificationMsgs" '+d(g)+">\n                        "+a(g)+"\n                        ";e+=(new DNTP.templates.View_light_notification_link(this.window)).render(b,{item:g});e+="\n                    </div>\n                </div>\n            ";b.addOnLoad(b.bind(b.verticallyCenter,g.id));e+="\n            ";
g.badTracker&&b.observe(g.id,"click",function(){var a=DNTP.Config.get("badTrackerClicked","");a||(a="");(","+a+",").indexOf(","+g.badTracker+",")==-1&&(a.length>0&&(a+=","),a+=g.badTracker,DNTP.Config.set("badTrackerClicked",a));b.openUrlInNewTab(DNTP.getLinkUrl("badTracker."+g.badTracker));return DNTP.preventDefault.apply(DNTP,arguments)})}}else{e+='\n            <div id="notifyBar" class=am>\n                <ul id="notificationMsgs">\n                ';for(f=0;f<3;f++)e+="\n                    <li "+
d(c.notifications[f])+">\n                        "+a(c.notifications[f])+"\n                        ",e+=(new DNTP.templates.View_light_notification_link(this.window)).render(b,{item:c.notifications[f]}),e+="\n                    </li>\n                    ",b.addOnLoad(b.bind(b.verticallyCenter,c.notifications[f].id)),e+="\n                ";e+="\n            </div>\n\t"}e+="\n\n"}e+='\n<div id="productBar" class="clearfix am cb" style="margin-top:5px;">\n    <a class=externalLink href="'+DNTP.getLinkUrl("deleteme")+
'" target=_blank><img src="'+DNTP.getImageUrl("footer-del-me.png")+'" height="32px" /></a>\n    <a class=externalLink href="'+DNTP.getLinkUrl("maskme")+'" target=_blank><img src="'+DNTP.getImageUrl("footer-mask-me.png")+'" height="32px" /></a>\n</div>\n';b.observe("closeMessage","click",function(){DNTP.NotificationManager.markNotificationsClosed(c.notifications);b.hideElement("lowerHalfMsg");b.hideElement("closeMessage");b.recomputeNotifications();b.show();return DNTP.preventDefault.apply(DNTP,arguments)});
b.observe("closePopup","click",function(){b.close();return DNTP.preventDefault.apply(DNTP,arguments)});b.observe("showGlobal","click",function(){b.showGlobal();return DNTP.preventDefault.apply(DNTP,arguments)});b.addOnLoad(function(){DNTP.setTimeout(b.bind(b.autoSizeIframe),200)});e+="\n";return e};DNTP.templates.View_light_new_trackers=function(b){this.window=b};
DNTP.templates.View_light_new_trackers.prototype.render=function(b,c){var d="",a=c.newTrackers;a.sort();for(var f={},e="",g=0;g<a.length;g++)f[a[g]]=1;b.observe("back","click",function(){DNTP.showPopupBlue();return DNTP.preventDefault.apply(DNTP,arguments)});b.doNotAutoRefresh=!0;d+="\n<div style=\"padding: 10px 10px 0;font-weight: normal;\">\n    <div style='font-size:120%;font-weight:bold;margin-bottom:8px;'>\n        "+DNTP._("dntp.new.trackers")+"\n    </div>\n    "+DNTP._("dntp.new.trackers.details")+
'\n</div>\n<div class="block" style="margin: 10px;font-size: 14px;border: 1px solid #eee;">\n    <div id="DNTPtrackers" style="max-height:150px;overflow:auto;border-bottom-width: 0;" class="cb">\n        <ul class=DNTPtrackerList>\n            ';for(var h in f)e!=""&&(e+=","),e+=h,d+='\n            <li style="color:#888;">'+h+"</li>\n            ";d+='\n        </ul>\n    </div>\n</div>\n<div style="padding: 10px;font-weight: normal" class=clearfix>\n    <a class="externalLink" target="_blank" href="'+
DNTP.getLinkUrl("newTrackers",{"new":e})+'" >\n        '+DNTP._("dntp.new.trackers.link")+'\n    </a>\n    <a class="fr" href="#" id=back>'+DNTP._("dntp.global.back")+"</a>\n</div>\n\n\n";return d};DNTP.templates.View_light_notification_link=function(b){this.window=b};
DNTP.templates.View_light_notification_link.prototype.render=function(b,c){var d="",a=c.item.id,f=c.item.link,e=c.item.iframe,g=c.item.label,h="";c.item.plainLink&&(h=" plainLink");c.item.image&&(g="");d+="\n";f&&!e?d+='\n\t<a class="externalLink'+h+'" id="'+a+'" target="_blank" href="'+f+'">'+g+"</a>\n":e?(d+='\n\t<a class="externalLink" id="'+a+'" href="#">'+g+"</a>\n\t",b.observe(a,"click",b.bind(b.addNotificationIframe,f)),d+="\n"):d+='\n\t<a class="noLink" id="'+a+'" href="#">'+g+"</a>\n";return d};
DNTP.templates.View_light_privacy=function(b){this.window=b};
DNTP.templates.View_light_privacy.prototype.render=function(b,c){var d=DNTP._,a="";if(!c.newBadge){var f=DNTP.Config.get("newTrackers","");if(f&&f!=""&&(f=f.split(","),f.length>0))return DNTP.Config.set("newTrackers",""),DNTP.update_toolbar_icon(),a+=(new DNTP.templates.View_light_new_trackers(this.window)).render(b,{newTrackers:f}),a}var e=c.badges,f=null;if(0<e.length&&e[0].nextBadge&&e[0].nextBadge.name!="None")f=e[0].nextBadge;var g=b.fixExternalLink(DNTP.getLinkUrl("recommended"));b.toggleTracker=
function(a,c,d){var d=d||event,e=d.target||d.srcElement;if(e.className.indexOf("suggested")!=-1)return b.openUrlInNewTab(g+"&tracker="+a),!1;for(;!e.className||e.className.indexOf("tracker")==-1;)e=e.parentNode;if(e.getAttribute("animateProgress"))return!1;var f=e.className.indexOf("off")!=-1;b.animateButton(e,f?1:-1,function(){e.className=e.className.replace(/on|off/,f?"on":"off");c?b.socialTrackerClicked(a,{target:e}):b.trackerClicked(a,{target:e})})};a+="\n<\!-- allow/block --\>\n";if(!c.toggledOff&&
(c.off||c.isAllowedSite||c.totalTrackers>0||c.firstPartySocial)){a+='\n<div id="DNTPonOffAtSite">\n';if(c.host&&c.host!=""){a+="\n    ";c.firstPartySocial||(a+='\n\t<div class="topBar">\n\t\t<div class=domain>\n            '+c.host+'<br/>\n            <span style="font-size:11pt;font-style: italic;text-shadow: none;">\n               '+d(c.off?"is.tracking":"was.tracking")+"\n            </span>\n        </div>\n        ",!c.off&&c.totalTrackers>0&&(a+="\n        <div id=topCount class=count>\n            "+
c.totalTrackers+"\n        </div>\n        ",b.observe("topCount","click",b.bind(b.showAllBlocks))),a+="\n\t</div>\n    ");a+="\n\t";if(c.totalTrackers>0||c.off||c.isAllowedSite)a+='\n    <div class="clearfix am">\n        <div id="toggleSite" class="clearfix tracker '+(c.off?"off":"on")+'" style="margin-top: 8px;text-align: left;margin-left: 13px;">\n            <span class="button" style="background-image: url('+DNTP.getImageUrl("on-off.png")+');">\n                <img src="'+DNTP.getImageUrl("on-off-knob.png")+
'" class=vm />\n            </span>\n            <span class="offMsg" style="width:auto;">'+d("onoff.off.here")+'</span>\n            <span class="onMsg" id="toggleSiteOnMsg"\n                  style="width:auto;">'+d("onoff.on.here",c.blocked.length+"",d("dntp."+(c.blocked.length!=1?"companies":"company")))+"</span>\n        </div>\n        ",!c.off&&c.isAllowedSite&&(a+="\n            "+d("dntp.block.site.not.suggested")+"\n        "),a+="\n    </div>\n    ",b.observe("toggleSite","click",function(){var a=
b.$("toggleSite");if(a.getAttribute("animateProgress"))return!1;b.animateButton(a,c.off?1:-1,function(){var d=b.getButton(a);d.className=d.className.replace(/on|off/,c.off?"off":"on");b.toggleOnOff()})}),a+="\n\t";a+="\n"}a+="\n\t<br class=cb />\n    "+b.getNewVersionLink()+"\n</div>\n"}a+="\n\n<\!-- OFF or toggled ON state --\>\n";c.off?(a+='\n\t<div class="am block highlight" style="margin:10px 5px;"><br/>\n        ',a+=c.isAllowedSite?"\n            "+d("dntp.user.feedback.allow")+"\n        ":
"\n            "+d("dntp.turnedoff")+"\n        ",a+='\n\t\t<div class="blueLinks" style="line-height:12pt;">\n            '+d("dntp.turnedoff.block","<a href=# id=blockAgain>","</a>")+"\n            <br/><br/>\n            "+d("dntp.turnedoff.viewall","<br/><a href=# id=allowedSites>","</a>")+"\n            <br/>\n\t\t</div>\n\t\t",b.observe("blockAgain","click",b.bind(b.toggleOnOff)),a+="\n\t\t",b.observe("allowedSites","click",DNTP.showAllowedSites),a+="\n\t\t<br/>\n\t</div>\n"):c.toggledOff&&
(a+='\n\t<div class="block highlight" style="margin:10px 5px;">\n\t\t<br/>'+d("dntp.turnedon")+'\n\t\t<br/><br/><div style="color:red;">'+d("dntp.pleasewait")+"</div><br/>\n\t</div>\n");a+="\n\n<\!-- new badge --\>\n";if(c.newBadge){var e=c.newBadge,h=(e.level?e.level+b.getNumberSuffix(e.level)+" ":"")+d(e.name);a+='\n\t<div id="DNTPNewBadge" class=highlight>\n\t    <div class="badgeText badgeIconBig badge\''+e.cssClass+"\n\t        badge"+e.cssClass+'Img" >\n\t\t    <div class="badgeCountBig">'+
DNTP.addCommas(e.limit)+'</div>\n\t\t    <div class="badgeTextBig">'+d(e.badgeText)+'</div></div>\n\t    <div class="badgeCongrats">\n\t\t    '+d("dntp.badge.congrats","<br/> "+h)+"<br/><br/>\n\t\t    <span>"+DNTP.addCommas(e.limit)+"</span>\n\t\t    "+d(e.text)+'\n\t    </div>\n\t</div>\n    <div class="am">'+d("dntp.badge.new.share")+':\n        <a class="externalLink" target="_blank" href="'+DNTP.getLinkUrl("badgeShare",{where:"fb",name:h,limit:e.limit,"new":1})+'">\n            <img class=vm src="'+
DNTP.getImageUrl("fb_sm.png")+'" height="16px"/>\n        </a>\n        <a class="externalLink" target="_blank" href="'+DNTP.getLinkUrl("badgeShare",{where:"tw",name:h,limit:e.limit,"new":1})+'">\n            <img class=vm src="'+DNTP.getImageUrl("tw_sm.png")+'" height="16px"/>\n        </a>\n    </div>\n'}a+="\n\n<\!-- trackers/optouts --\>\n";!c.newBadge&&!c.off&&(a+="\n\t\t",c.totalTrackers==0&&!c.firstPartySocial?(a+="\n\t\t\t",c.toggledOff||(a+='\n\t\t\t\t<div id="DNTPnoTrackingHere" class="clearfix">\n                    <img class=sun src="'+
DNTP.getImageUrl("sun.png")+'" id=dntpClearSkies height="100px;"/>\n                    <div class=text>\n                        <b>'+d("clear.skies")+"</b>\n                        ",c.hostname&&(a+='\n                        <br/><br/>\n                        <span style="font-weight: normal;">'+d("dntp.clearskies.thanks",c.host)+'\n                            <a class="externalLink" target="_blank" href="'+DNTP.getLinkUrl("noTrackingThanks",{where:"fb",host:c.host})+'">\n                                <img class=vm src="'+
DNTP.getImageUrl("fb_sm.png")+'" height="16px"/>\n                            </a>\n                            <a class="externalLink" target="_blank" href="'+DNTP.getLinkUrl("noTrackingThanks",{where:"tw",host:c.host})+'">\n                                <img class=vm src="'+DNTP.getImageUrl("tw_sm.png")+'" height="16px"/>\n                            </a>\n                        </span>\n        \t\t\t    '),a+="\n                    </div>\n                </div>\n\t\t\t"),a+="\n\t\t"):(a+=
'\n\t\t\t<div id="DNTPtrackingHere">\n\t\t\t\t',a+=(new DNTP.templates.View_light_social_block(this.window)).render(b,c),a+="\n\t\t\t\t",a+=(new DNTP.templates.View_light_tracker_block(this.window)).render(b,c),a+="\n\t\t\t</div>\n\t\t"),a+="\n");a+="\n\n<\!-- totals --\>\n";if(!c.skipTotals&&c.globalTotal>0){e=c.badges[0];a+='\n<div class=block id="footerBlock">\n\t<div id="DNTPfooter" class=clearfix>\n\t';if(c.newBadge)a+="\n\t\t",a+=(new DNTP.templates.View_light_tracking_report(this.window)).render(b,
c);else{a+="\n\t\t";e.name!="None"&&(a+='\n\t    <div id="latestBadge" class="badge'+e.cssClass+" badge"+e.cssClass+'Img ">\n\t\t    <div class=badgeText >'+DNTP.addCommas(e.limit)+"</div>\n\t    </div>\n\t\t",b.observe(["latestBadge"],"click",b.bind(b.renderPartialInElement,"DNTPfooter","tracking_report",c,{newBadge:!0})),a+="\n\t\t");a+='\n\t\t<div style="margin-top:5px;height:170px;" id="DNTPtrackingAttempts">\n\t        <span id="DNTPtotalBlockedIntro">\n\t            '+d("funword"+c.funWordIndex)+
"!\n\t        </span>"+d("dntp.alltime")+'\n\t        <a href="javascript:void(0);" id="trackingDetailed">\n\t            <span id="DNTPtotalBlocked">'+DNTP.addCommas(c.globalTotal)+"</span>\n\t            "+d("dntp.alltimesuffix",d(DNTP.plural("dntp.attempt",c.globalTotal)))+"\n\t        </a>\n            ";if(c.totalTrackers>0||c.firstPartySocial)a+='\n            <a class="externalLink" target="_blank" href="'+DNTP.getLinkUrl("totalShare",{where:"fb",total:c.globalTotal})+'">\n                <img class=vm src="'+
DNTP.getImageUrl("fb_sm.png")+'" height="16px"/>\n            </a>\n            <a class="externalLink" target="_blank" href="'+DNTP.getLinkUrl("totalShare",{where:"tw",total:c.globalTotal})+'">\n                <img class=vm src="'+DNTP.getImageUrl("tw_sm.png")+'" height="16px"/>\n            </a>\n            ';a+='\n            <br style="clear:both;"/>\n            <div id=chartdiv class="clearfix"></div>\n            ';f&&f.limit-c.globalTotal>0&&(a+='\n            <div id="nextBadgeMsg" style="display: none;">\n               '+
d("dntp.badges.levelup.diff",DNTP.addCommas(f.limit-c.globalTotal),(f.level?"<br/>"+f.level+b.getNumberSuffix(f.level)+" ":"")+d(f.name))+"\n            </div>\n            ");a+='\n            <a href="'+DNTP.getLinkUrl("dntReport")+'" target="_blank" class="externalLink" id=stats style="display:none;">\n                <img src="'+DNTP.getImageUrl("stats.png")+'"/><br/>\n                '+d("my.stats")+"\n            </a>\n\t\t</div>\n\t    ";b.observe("trackingDetailed","click",b.bind(b.renderPartialInElement,
"DNTPfooter","tracking_report",c,{newBadge:!1}))}a+="\n\t";a+="\n\t</div>\n</div>\n"}b.addOnLoad(b.bind(b.renderChart));a+="\n";return a};DNTP.templates.View_light_settings=function(b){this.window=b};
DNTP.templates.View_light_settings.prototype.render=function(b,c){var d=DNTP._,a="",f=c.useGlobalAllow,e=c.ruleArray,g=c.lastUpdateDateString,h=c.globalSettings,i=DNTP.Config.get("global.blocked",DNTP.DEFAULT_TRACKER_STATE?"1":"0"),j="";f==1&&(j="checked='checked'");a+="\n<div id='DNTPglobalTrackers' style=\"padding: 0px 2px;\">\n    <div style='font-size:120%;font-weight:bold;margin-bottom:8px;'>\n        <img src=\""+DNTP.getImageUrl("gear.png")+'" class=vm height=18px style="margin-top:-3px;padding: 0 3px 0 5px;"/>\n        '+
DNTP._("dntp.footer.settings")+'\n    </div>\n    <div class="clearfix">\n        <div id="toggleSite" class="clearfix fl tracker '+(i==1?"on":"off")+'" style="margin: 8px 0 10px 13px;text-align: left;">\n            <div class="fr onMsg">'+d("dntp.global.all.blockedeverywhere")+'</div>\n            <div class="fr offMsg">'+d("dntp.global.all.allowedeverywhere")+'</div>\n            <div class="fr button" style="background-image: url('+DNTP.getImageUrl("on-off.png")+');">\n                <img src="'+
DNTP.getImageUrl("on-off-knob.png")+'"/>\n            </div>\n        </div>\n        ';b.observe("toggleSite","click",function(){var a=b.$("toggleSite");if(a.getAttribute("animateProgress"))return!1;b.animateButton(a,i==1?-1:1,function(){var a=b.$("toggleSite");a.className=a.className.replace(/on|off/,i==1?"off":"on");i==1?(b.allowAll(),i=0):(b.blockAll(),i=1)})});a+="\n    </div>\n    <br class=cb />\n    <div class=block>\n        <ul id='DNTPtrackerList' class=\"trackers\" style='height:200px;overflow-y:scroll;overflow-x:hidden;border:1px solid #eee;border-width: 1px 0px;margin-top: 5px;'>\n";
for(var f={},l=0;l<e.length;l++){var k=e[l];if(!f[k]){f[k]=1;var n="g"+k.replace(" ","");a+='\n            <li id="'+n+'"\n                 class="tracker clearfix ';a+=h[k]==1?"on":"off";a+='">\n                <div class="fl name">'+k+'</div>\n                <div class="fr onMsg">'+d("dntp.global.blockedeverywhere")+'</div>\n                <div class="fr offMsg">'+d("dntp.global.notblocked")+'</div>\n                <div class="fr button" style="background-image: url('+DNTP.getImageUrl("on-off.png")+
');">\n                    <img class=skip src="'+DNTP.getImageUrl("on-off-knob.png")+'"/>\n                </div>\n            </li>\n        '}}a+="\n        </ul>\n    </div>\n\n    <span class=\"am\" style='display:block;width:100%;padding:0px !important;font-size:85%;'>\n        "+DNTP._("dntp.global.tpl")+" "+g+'\n        <br/>\n        <input type="checkbox" '+j+" id='DNTPuseRecs'/> "+DNTP._("dntp.global.useglobalallow")+'\n    </span>\n</div>\n<div class="cb am" style="margin-top: 5px;">\n    <a href=\'#\' class="button" id=\'DNTPallowedSites\'>'+
DNTP._("dntp.global.allowedSites")+"</a>\n    <a href='#' class=\"button\" id='DNTPbackToPopup'>"+DNTP._("dntp.global.back")+"</a>\n</div>\n";b.observe("DNTPtrackerList","click",b.bind(function(a){for(var a=a||event,c=a.target||a.srcElement;!c.className||c.className.indexOf("tracker")==-1;)c=c.parentNode;if(c.getAttribute("animateProgress"))return!1;for(var d=null,a=c.firstChild;a&&(!a.className||a.className.indexOf("name")==-1);)a=a.nextSibling;if(!a)return!1;var d=a.textContent||a.innerText,e=c.className.indexOf("off")!=
-1;b.animateButton(c,e?1:-1,function(){c.className=c.className.replace(/on|off/,e?"on":"off");DNTP.toggle_tracker(b.parentDoc,b.doc,e,d,"*",!1)})}));b.observe("DNTPuseRecs","click",b.bind(b.toggleUseRecs));b.observe("DNTPbackToPopup","click",function(){DNTP.showPopupBlue();return DNTP.preventDefault.apply(DNTP,arguments)});b.observe("DNTPallowedSites","click",function(){DNTP.showAllowedSites();return DNTP.preventDefault.apply(DNTP,arguments)});b.observe("DNTPdntSignalDisplay","click",DNTP.openPreferences);
a+="\n";return a};DNTP.templates.View_light_social_block=function(b){this.window=b};
DNTP.templates.View_light_social_block.prototype.render=function(b,c){var d=DNTP._,a="";if(c.toggledOff)return a;a+="\n";var f=c.social,e=c.blocked,g=c.firstPartySocial,h=c.abineMessage,i=c.domain,j=c.currentSocialCount,l=b.getTextColor(e,f),k=b.getSocialImage(e,f),n=!1;a+='\n<div class="block" id="socialBlock">\n\t<div class="header clearfix '+(f.length==0&&!g?"empty":"")+'" id="socialTop">\n\t\t<div class=title id="DNTPsocialText">\n\t\t\t';f.length>0?(a+="\n\t\t\t\t"+d("dntp.socialtracking",f.length,
d(DNTP.plural("dntp.count.socialbutton",f.length)))+'\n\t\t\t\t<span id=DNTPsocialTextColor class=count style="color:'+l+'">\n                   '+c.socialBlocked+" "+d(DNTP.plural("dntp.Mblocked",c.socialBlocked))+"\n\t\t\t\t</span>\n                ",b.observe("socialTop","click",b.bind(b.toggleBlock,"DNTPsocial"))):(a+="\n\t\t\t\t",g?(a+="\n\t\t\t\t\t"+DNTP.socialMap[c.domain].name+" "+d("dntp.tracksacross")+"\n\t\t\t\t\t",b.observe("socialTop","click",b.bind(b.toggleBlock,"DNTPsocial")),a+="\n\t\t\t\t"):
(n=!0,a+="\n\t\t\t\t\t"+d("dntp.nosocial")+"\n\t\t\t\t"));a+="\n\t\t\t";a+='\n\t\t</div>\n\t\t<img src="'+DNTP.getImageUrl(k)+'" id="DNTPsocialIcon"  height="36px" width="36px" /></div>\n        ';if(!n){a+='\n        <div id="DNTPsocial" style="'+(g||h?"":"display:none;")+'\n                        max-height:150px;overflow:hidden;" class="cb clearfix">\n\n\t        ';g&&(h=null,a+="\n                <div style=\"padding:5px;\" class=clearfix>\n\t\t        <span style='font-weight:normal;'>"+(DNTP.socialMap[i].name+
" "+d("dntp.oneofseveral"))+"</span>\n                ",j>0&&(a+="\n                <br/><br/>\n                <div style='float:left;'>\n\t\t\t        <img src='"+DNTP.getImageUrl(DNTP.socialMap[i].favicon)+"'\n\t\t                                      style='height:24px;width:24px;float:left;margin-right:4px;' />\n\t\t        </div>\n\t            <div style='float:left;font-size:1.6em;margin-right:5px;color:green;font-weight:normal !important;'>\n\t\t            "+j+"\n\t            </div>\n\t            <div style='float:left;display:inline;width:250px;font-weight:normal;'>\n\t\t            "+
d("firstparty.youblocked",DNTP.socialMap[i].name,j,d(DNTP.plural("dntp.othersite",j)))+"\n\t            </div>\n                <div style='clear:both;'></div>\n                "),a+="\n                </div>\n\t        ");a+="\n\n\t        ";h&&(a+="<div id='msgBorder' style='padding:4px;border:2px solid orange;position:relative'>");a+="\n\n\t        <ul id='DNTPsocialList'>\n\t\t        ";for(var m in f)m!="length"&&(g=m.replace(" ",""),i=f[m]==2?".recommended":"",j=f[m]==2?"suggested":"",b.observe(g,
"click",b.bind(b.toggleTracker,m,!0)),a+='\n                <li id="'+g+'"\n                     class="tracker clearfix ',a+=m in e?"on":"off",a+='">\n                    <div class="fl name">'+m+'</div>\n                    <div class="fr onMsg '+j+'">'+d("dntp.capblockedhere"+i)+'</div>\n                    <div class="fr offMsg '+j+'">'+d("dntp.notblockedhere"+i)+'</div>\n                    <div class="fr button" style="background-image: url('+DNTP.getImageUrl("on-off.png")+');">\n                        <img class=skip src="'+
DNTP.getImageUrl("on-off-knob.png")+'"/>\n                    </div>\n                </li>\n\t\t        ');a+="\n\t\t        ";f.length>0&&(a+="\n\t\t        <li class=nohover>\n\t\t\t        <a class=externalLink href='"+DNTP.getLinkUrl("how-social")+"'\n\t\t\t           style='float:left;padding-top:5px;' target='_blank'>\n\t\t\t            "+d("dntp.stillwork")+"\n\t\t\t        </a>\n\t\t        </li>\n\t\t        ");a+="\n\t\t    </ul>\n\n\t        ";h&&(a+="<br style='clear:both;'/><span id=abineMsg>"+
h+"</span></div>");a+="\n\n\t    </div>\n        "}a+="\n\t</div>\n</div>\n";return a};DNTP.templates.View_light_tracker_block=function(b){this.window=b};
DNTP.templates.View_light_tracker_block.prototype.render=function(b,c){var d=DNTP._,a="";if(c.toggledOff||c.abineMessage||c.firstPartySocial&&c.trackers.length==0)return a;a+="\n";var f=c.trackers,e=c.blocked,g=c.trackersBlocked,h=b.getTextColor(e,f),i=b.getTrackerImage(e,f);a+='\n<div class="block clearfix" id="trackerBlock">\n\t<div class="header clearfix '+(f.length==0?"empty":"")+'" id="trackerTop">\n\t\t<div class=title style="letter-spacing:.051em;" id="DNTPtrackerText">\n\t\t\t';f.length>0?
(a+="\n\t\t        "+d("dntp.trackingcompany",f.length,DNTP._(DNTP.plural("dntp.company",f.length)))+"\n                <span class=count style='letter-spacing:normal;color:"+h+"'>\n\t                "+g+" "+d(DNTP.plural("dntp.Fblocked",g))+"\n                </span>\n\t\t\t\t",b.observe("trackerTop","click",b.bind(b.toggleBlock,"DNTPtrackers")),a+="\n\t\t\t"):a+="\n                "+d("dntp.notrackingcompanies")+"\n            ";a+='\n        </div>\n\t\t<img src="'+DNTP.getImageUrl(i)+'" id="DNTPtrackerIcon" height="36px" width="36px" />\n\t</div>\n\t';
if(f.length>0){g="&c=";h=!1;a+='\n        <div id="DNTPtrackers" style="display:none;max-height:150px;overflow:auto;" class="cb">\n            <ul id="DNTPtrackerList">\n            ';for(var j in f)if(j!="length"){g+=j+"~";var i=f[j]==2?".recommended":"",l=f[j]==2?"suggested":"";i!=""&&(h=!0);var k=j.replace(" ","");a+='\n\n                <li id="'+k+'"\n                     class="tracker clearfix ';a+=j in e?"on":"off";a+='">\n                    <div class="fl name">'+j+'</div>\n                    <div class="fr onMsg '+
l+'">'+d("dntp.capblockedhere"+i)+'</div>\n                    <div class="fr offMsg '+l+'">'+d("dntp.notblockedhere"+i)+'</div>\n                    <div class="fr button" style="background-image: url('+DNTP.getImageUrl("on-off.png")+');">\n                        <img class=skip src="'+DNTP.getImageUrl("on-off-knob.png")+'"/>\n                    </div>\n                </li>\n                ';b.observe(k,"click",b.bind(b.toggleTracker,j,!1));a+="\n            "}a+="\n            <li class=nohover>\n              ";
a+=h?"\n                  <a class=externalLink href='"+DNTP.getLinkUrl("recommended")+"' target='_blank'>\n                    "+d("dntp.recommended")+"</a></li>\n              ":"\n                  <a class=externalLink href='"+DNTP.getLinkUrl("who-they-are")+"' target='_blank'>\n                    "+d("dntp.whoarethey")+"</a>\n              ";a+="\n            </li>\n\t        </ul>\n        </div>\n    "}a+="\n</div>";return a};
DNTP.templates.View_light_tracking_report=function(b){this.window=b};
DNTP.templates.View_light_tracking_report.prototype.render=function(b,c){var d=DNTP._,a="",f=c.badges;a+='\n\n<ul id="reportTabs" class="tabs">\n\t<li id="trackingTab" class="selected" style="margin-left: 5px;"><a id="DNTPshowTracking" onclick="return false;" href="javascript:void(0);">'+d("dntp.whoarethey")+'</a></li>\n\t<li id="badgeTab" class=""><a id="DNTPshowBadges" onclick="return false;" href="javascript:void(0);">'+d("dntp.badges.mybadges")+'</a></li>\n</ul>\n\n<div id="badgeTabContent" style="display:none;" class="tabContent">\n\n';
for(var e=0;e<f.length;e++){var g=f[e];a+="\n\t";e>0&&(a+='<div class="badgeSep">&nbsp;</div>');a+='\n\t<div class="badgeBlock">\n\t\t'+d(g.title)+"\n\n    ";a+=g.name=="None"?'\n\t    <div class="" style="margin:10px auto;text-align:center;height:50px;">'+d("dntp.no.badge")+"</div>\n    ":'\n        <div class="badgeText badgeIconSmall badge'+g.cssClass+" badge"+g.cssClass+'Img">\n\t        <div class=badgeCountSmall>'+DNTP.addCommas(f[e].limit)+"</div>\n\t        <div class=badgeTextSmall>"+d(g.badgeText)+
"</div>\n        </div>\n    ";a+="\n\t\t<div>\n\t";a+=g.nextBadge.name=="None"?"\n        "+d("dntp.badges.maxlevel")+"\n    ":"\n            "+d("dntp.badges.levelup",DNTP.addCommas(g.nextBadge.limit),(g.nextBadge.level?"<br/>"+g.nextBadge.level+b.getNumberSuffix(g.nextBadge.level)+" ":"")+d(g.nextBadge.name))+"\n    ";a+="\n\t\t</div>\n\n    </div>\n"}a+='\n\n    <div class="cb clearfix" style="padding:5px;font-size:10px;">\n    ';f.length>0&&f[0].name!="None"&&(g=f[0],f=(g.level?g.level+b.getNumberSuffix(g.level)+
" ":"")+d(g.name),a+="\n        <div class=fl>\n        "+d("dntp.badge.share")+':\n\n        <a class="externalLink" target="_blank" href="'+DNTP.getLinkUrl("badgeShare",{where:"fb",name:f,limit:g.limit})+'">\n            <img class=vm src="'+DNTP.getImageUrl("fb_sm.png")+'" height="16px"/>\n        </a>\n        <a class="externalLink" target="_blank" href="'+DNTP.getLinkUrl("badgeShare",{where:"tw",name:f,limit:g.limit})+'">\n            <img class=vm src="'+DNTP.getImageUrl("tw_sm.png")+'" height="16px"/>\n        </a>\n        </div>\n    ');
a+='\n        <div class="fr" style="margin-top: 3px;">\n            <a class=externalLink href="'+DNTP.getLinkUrl("read-about-medals")+'" target="_blank">\n                '+d("dntp.readbadges")+'\n            </a>\n        </div>\n    </div>\n\t<br style="clear:both;"/>\n</div>\n\n<div id="trackingTabContent" style="display:block;padding: 0 10px;" class="tabContent">\n\t<table class="cb detailTable" style="margin-top: 10px;" cellspacing=0 cellpadding=3 width=100%>\n\t\t<tr><th align=left>'+d("dntp.whostried")+
"</th><th align=right>"+d("dntp.numblocked")+"</th></tr>\n\t\t<tr>\n\t\t\t<td align=left>"+d("dntp.socialbuttons")+'</td>\n\t\t\t<td style="font-weight:normal;" align=right>'+DNTP.addCommas(c.globalSocialTotal)+"</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td align=left>"+d("dntp.trackingcompanies")+'</td>\n\t\t\t<td style="font-weight:normal;" align=right>'+DNTP.addCommas(c.globalTrackerTotal)+'</td>\n\t\t</tr>\n\t</table><br/>\n\n\t<div class=am style="font-size:100%;font-weight:normal;">\n\t\t'+d("dntp.intotalstart")+
'\n\t\t<span style="font-weight:700;">'+DNTP.addCommas(c.globalTotal)+"</span>\n\t\t"+d("dntp.intotalend",d(DNTP.plural("dntp.attempt",c.globalTotal)))+'\n        <a class="externalLink" target="_blank" href="'+DNTP.getLinkUrl("totalShare",{where:"fb",total:c.globalTotal})+'">\n            <img class=vm src="'+DNTP.getImageUrl("fb_sm.png")+'" height="16px"/>\n        </a>\n        <a class="externalLink" target="_blank" href="'+DNTP.getLinkUrl("totalShare",{where:"tw",total:c.globalTotal})+'">\n            <img class=vm src="'+
DNTP.getImageUrl("tw_sm.png")+'" height="16px"/>\n        </a>\n\n\t</div><br/>\n</div>\n';b.addOnLoad(b.bind(b.tabs,"reportTabs",c.newBadge?"badgeTab":null));return a};