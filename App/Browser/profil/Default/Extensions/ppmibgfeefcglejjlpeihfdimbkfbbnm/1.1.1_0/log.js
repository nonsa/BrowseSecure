// laobubu.net

function ls(vv){chrome.extension.sendRequest({action:"logmode",logmode:vv},function(r){notice('LOG WORKING:'+r.msg);});querystatus()}
function querystatus(){chrome.extension.sendRequest({action:"logmode_query"},function(r){$('status').textContent=r.data?$('onbtn').textContent:$('offbtn').textContent;});}
setInterval(function(){querystatus();chrome.extension.sendRequest({action:"logget"},function(r){if(r.msg==null){return}if($('logdata').value!=r.msg){$('logdata').value=r.msg;}});},500);function notice(s){var o=$('notice');o.innerText=s;o.style.display='';setTimeout("$('notice').style.display='none'",500+100*s.length);}
function onbtn(){ls(true);}
$('onbtn').addEventListener('click',onbtn);function offbtn(){ls(false);}
$('offbtn').addEventListener('click',offbtn);function cleanbtn(){chrome.extension.sendRequest({action:'logclean'},function(){$('logdata').value=''});}
$('cleanbtn').addEventListener('click',cleanbtn);$('chromemine').addEventListener('click',function(){chrome.tabs.create({url:'chrome://net-internals/#events'});});querystatus();