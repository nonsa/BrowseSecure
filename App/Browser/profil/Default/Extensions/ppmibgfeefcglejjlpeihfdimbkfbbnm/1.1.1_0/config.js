// laobubu.net

var tabsys=[];function ltab_switch(){var x,tabid;var sourcetabt=event.srcElement;while(sourcetabt.nodeName!="TABLABEL"){sourcetabt=sourcetabt.parentElement;if(null==sourcetabt)return;}
seeker:for(var tsysid=0;tsysid<tabsys.length;tsysid++){x=tabsys[tsysid];for(var i=0;i<x.length;i++){if(sourcetabt==x[i].tablabel){tabid=i;break seeker;}}}
worker:for(var i=0;i<x.length;i++){if(tabid==i){x[i].tabdata.style.display='';x[i].tablabel.className+=' tablabel_actived';}else{x[i].tabdata.style.display='none';x[i].tablabel.className=x[i].tablabel.className.replace(/tablabel_actived/g,'');}}}
function ltab_init(tabsid){var s=$(tabsid).childNodes;var tabsysid=tabsys.length;var x=[];for(var i=0;i<s.length;i++){if(s[i].nodeName!="TABLABEL")continue;x[x.length]={"tablabel":s[i],"tabdata":$(s[i].attributes['data'].value)};$(s[i].attributes['data'].value).style.display=(x.length==1)?'':'none';s[i].className+=(x.length==1)?' tablabel_actived':'';s[i].addEventListener("click",ltab_switch);}
tabsys[tabsysid]=x;}
ltab_init('tab1');$('details1').style.display='none';function udf(v,def){if(typeof v=="undefined")return def;return v;}
function cleanundefineditems(arr){var r=[];for(var i=0;i<arr.length;i++){if(typeof(arr[i])!='undefined')r[r.length]=arr[i];}
return r;}
function rr(r){cfgloader(r)}
function theLast(arr){return arr[arr.length-1];}
var items=$('items');var c;function cfgloader(r){c=r.data;items.innerHTML='';for(var i=0;i<c.length;i++){var x=c[i];var newi=document.createElement('li');newi.textContent=x.name;newi.addEventListener("click",items_switch);items.appendChild(newi);}}
var li=-1,li2=-1;function items_switch(event){li=-1;li2=-1;var sourcetabt=event.srcElement;while(sourcetabt.nodeName!="LI"){sourcetabt=sourcetabt.parentElement;if(null==sourcetabt)return;}
for(var i=0;i<c.length;i++){if(sourcetabt.textContent==c[i].name){li=i;break;}}
for(var i=0;i<items.childNodes.length;i++){items.childNodes[i].className=(i==li)?'selectedi':'';}
load_data();}
function l1_add(){c[c.length]={name:'New'+Date.now(),descript:'Nothing to say',value:'',data:'',auto:[]}
rr({data:c});}
function l1_del(){if(li<0)return;delete c[li];c=cleanundefineditems(c);rr({data:c});li--;load_data();if(li<0)return;items_switch({'srcElement':items.childNodes[li]});}
function load_data(){if(li<0){$('details1').style.display='none';$('details_placeholder').style.display='';return;}
$('details_placeholder').style.display='none';$('details1').style.display='';$('name1').value=c[li].name;$('data').value=c[li].data;$('descript').value=c[li].descript;while(l2.length>0){l2[0]=null;}
for(var i=0;i<c[li].auto.length;i++){l2[l2.length]=new Option(c[li].auto[i].name);}
load_data_auto();load_pres1();}
chrome.extension.sendRequest({action:"load_config"},cfgloader);$('items_add').addEventListener("click",l1_add);$('items_remove').addEventListener("click",l1_del);function l2_update(){l2[li2].text=$('name2').value;c[li].auto[li2].name=$('name2').value;c[li].auto[li2].value=$('value2').value;newMatch=[];var x=document.getElementsByName('autorule_a');var y=document.getElementsByName('autorule_b');var z=document.getElementsByName('autorule_c');var z1=document.getElementsByName('autorule_d');for(var i=0;i<x.length;i++){if(i==0)continue;newMatch[newMatch.length]={what:x[i].value,mode:y[i].value,text:z[i].value,enabled:z1[i].checked}}
c[li].auto[li2].matches=newMatch;}
function l2_add(){c[li].auto[c[li].auto.length]={name:'New_'+Date.now(),matches:[],value:''}
load_data();}
function l2_del(){if(li2<0)return;delete c[li].auto[li2];c[li].auto=cleanundefineditems(c[li].auto);load_data();}
var list2=$('items_auto'),l2=$('items_auto').options;function load_data_auto(){li2=list2.selectedIndex;if(li2<0){$('tts1').style.display='none';$('tts2').style.display='';return;}
$('tts2').style.display='none';$('tts1').style.display='';$('name2').value=l2[li2].text;var ca=c[li].auto[li2];$('value2').value=ca.value;rr1.innerHTML='';for(var i in ca.matches){l3_add();var y;y=document.getElementsByName('autorule_a');findandselect(y[y.length-1],ca.matches[i].what);y=document.getElementsByName('autorule_b');findandselect(y[y.length-1],ca.matches[i].mode);y=document.getElementsByName('autorule_c');y[y.length-1].value=ca.matches[i].text;y=document.getElementsByName('autorule_d');y[y.length-1].checked=udf(ca.matches[i].enabled,true);}}
$('l2_add').addEventListener("click",l2_add);$('l2_del').addEventListener("click",l2_del);list2.addEventListener("change",load_data_auto);list2.addEventListener("click",load_data_auto);function valueautofill(){$('value2').value=event.srcElement.attributes.value.value;}
function load_pres1(){var o=$('pres1');o.innerHTML='';var k=(chrome.i18n.getMessage("auto")+'=@AUTO\n')+
(chrome.i18n.getMessage("defaultvalue")+'=@DEFAULT\n')+
(chrome.i18n.getMessage("remove")+'=@DELETE\n')+
(chrome.i18n.getMessage("b1ank")+'=@BLANK\n')+$('data').value;k=k.replace(/\r/g,'').split('\n');for(b in k){var aa=k[b];var bb=aa;if(aa.indexOf('=')>=1){aa=aa.substr(0,aa.indexOf('='));bb=bb.substr(1+bb.indexOf('='));}
if(bb.length==0)continue;var a=document.createElement("pv");a.textContent=aa;a.setAttribute("value",bb);a.addEventListener("click",valueautofill);o.appendChild(a);}}
$('data').addEventListener("change",load_pres1);function l3_add(){var x=document.createElement('li');x.innerHTML=$('x_sample_1').innerHTML;$('rr1').appendChild(x);theLast(document.getElementsByName('autorule_a')).addEventListener("change",l2_update);theLast(document.getElementsByName('autorule_b')).addEventListener("change",l2_update);theLast(document.getElementsByName('autorule_c')).addEventListener("change",l2_update);theLast(document.getElementsByName('autorule_d')).addEventListener("change",l2_update);theLast(document.getElementsByName('autorule_del')).addEventListener("click",l3_del);}
function l3_del(event){var btn=event.srcElement;btn.parentNode.parentNode.removeChild(btn.parentNode);l2_update();}
$('name2').addEventListener("change",l2_update);$('value2').addEventListener("change",l2_update);$('l3_add').addEventListener("click",l3_add);function l1_update(){items.childNodes[li].textContent=$('name1').value;c[li].name=$('name1').value;c[li].value='@AUTO';c[li].descript=$('descript').value;c[li].data=$('data').value;}
$('name1').addEventListener("change",l1_update);$('descript').addEventListener("change",l1_update);$('data').addEventListener("change",l1_update);function savebtn(){chrome.extension.sendRequest({action:"save_config1",data:c},function(r){alert(r.msg)});}
$('savebtn').addEventListener("click",savebtn);$('savebtnareaagent').style.height=(10+$('savebtnarea').offsetHeight)+'px';