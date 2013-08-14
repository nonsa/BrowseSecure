var EXPORTED_SYMBOLS=[];Components.utils["import"]("resource://dntp/ff/overlay.js");
DNTP.extend({badTrackersTotal:{},badTrackersDailyTotal:{},badTrackersInitialized:!1,listenForBlockedTrackers:function(){if(!DNTP.hookedForBadTrackers)DNTP.hookedForBadTrackers=!0,DNTP.Events.addListener("TrackerBlocked",function(c,a,b){b in DNTP.badTrackersTotal&&(DNTP.badTrackersTotal[b]++,a=new Date,c=DNTP.toDayOfYear(a)+"",a=a.getFullYear()+"",b in DNTP.badTrackersDailyTotal?a in DNTP.badTrackersDailyTotal[b]?c in DNTP.badTrackersDailyTotal[b][a]?DNTP.badTrackersDailyTotal[b][a][c]++:DNTP.badTrackersDailyTotal[b][a][c]=
1:(DNTP.badTrackersDailyTotal[b][a]={},DNTP.badTrackersDailyTotal[b][a][c]=1):(DNTP.badTrackersDailyTotal[b]={},DNTP.badTrackersDailyTotal[b][a]={},DNTP.badTrackersDailyTotal[b][a][c]=1))})},loadBadTrackers:function(){if(!DNTP.DISABLE_BAD_TRACKERS){DNTP.badTrackersInitialized=!0;var c=JSON.parse(DNTP.Config.get("badTrackerTotals","{}")),a=[(new Date).getFullYear(),(new Date).getFullYear()-1],b;for(b in c)if(!(b in DNTP.badTrackersTotal)){DNTP.badTrackersTotal[b]=parseInt(c[b]);for(var d=0;d<a.length;d++){var e=
DNTP.Config.get("badTrackerDaily."+b+"."+a[d],null);e&&e!=""&&(e=JSON.parse(e),DNTP.badTrackersDailyTotal[b]={},DNTP.badTrackersDailyTotal[b][a[d]]=e)}}}},saveBadTrackerTotals:function(){if(!DNTP.DISABLE_BAD_TRACKERS){DNTP.Config.set("badTrackerTotals",JSON.stringify(DNTP.badTrackersTotal));for(var c in DNTP.badTrackersTotal)if(c in DNTP.badTrackersDailyTotal)for(var a in DNTP.badTrackersDailyTotal[c])DNTP.Config.set("badTrackerDaily."+c+"."+a,JSON.stringify(DNTP.badTrackersDailyTotal[c][a]))}},setupBadTrackers:function(c){if(c&&
!DNTP.DISABLE_BAD_TRACKERS){DNTP.listenForBlockedTrackers();DNTP.loadBadTrackers();for(var a={},b=0;b<c.length;b++){var d=c[b];d in DNTP.badTrackersTotal||(DNTP.badTrackersTotal[d]=0);a[d]=1}for(d in DNTP.badTrackersTotal)d in a||(delete DNTP.badTrackersTotal[d],d in DNTP.badTrackersDailyTotal&&delete DNTP.badTrackersDailyTotal[d]);DNTP.saveBadTrackerTotals()}},getBadTrackerTotals:function(){if(DNTP.DISABLE_BAD_TRACKERS)return{};DNTP.badTrackersInitialized||DNTP.loadBadTrackers();var c={},a;for(a in DNTP.badTrackersTotal)c[a]=
DNTP.getLinkUrl("badTracker."+a);return{totals:DNTP.badTrackersTotal,daily:DNTP.badTrackersDailyTotal,links:c}},getBadTrackerForNotification:function(c){var a=DNTP.badTrackersTotal;DNTP.browser_name=="IE"&&(a=JSON.parse(DNTP.Config.get("badTrackerTotals","{}")));var b=","+DNTP.Config.get("badTrackerClicked","")+",",d;for(d in c)if(d in a&&b.indexOf(","+d+",")==-1&&a[d]<10)return d;return null}});