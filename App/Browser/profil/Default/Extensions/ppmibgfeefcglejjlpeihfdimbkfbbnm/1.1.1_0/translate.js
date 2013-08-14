// laobubu.net

function $(x){return document.getElementById(x);}
function findandselect(listbox,value){for(var i=0;i<listbox.options.length;i++){if(listbox.options[i].value==value){listbox.options[i].selected=true;return;}}}
function tranall(){document.title=chrome.i18n.getMessage(document.title);var x=document.getElementsByTagName('fy'),i,j;for(i=0;i<x.length;i++){j=chrome.i18n.getMessage(x[i].attributes['id'].value);if(j.length>0){x[i].innerHTML=j}}
x=document.getElementsByTagName('input');for(i=0;i<x.length;i++){if(x[i].hasAttribute('fy')){j=chrome.i18n.getMessage(x[i].attributes['fy'].value);if(j.length>0){x[i].value=j}}
if(x[i].hasAttribute('placeholder')){j=chrome.i18n.getMessage(x[i].attributes['placeholder'].value.replace(/ /g,''));if(j.length>0){x[i].placeholder=j}}}}
tranall();