// laobubu.net

document.title=chrome.i18n.getMessage("advancedc")+" - "+chrome.i18n.getMessage("app_name");fyall();rem('masterconfigs');rem('regextest');$('x_sample_1').style.display='none';var list=$('items'),l=$('items').options;var list2=$('items_auto'),l2=$('items_auto').options;var li=-1,li2=-1;function load_data(){li=list.selectedIndex;if(li<0){$('tt1').style.display='none';$('tt2').style.display='';return;}
$('tt2').style.display='none';$('tt1').style.display='';$('name1').value=list.value;$('data').value=c[li].data;$('descript').value=c[li].descript;while(l2.length>0){l2[0]=null;}
for(var i=0;i<c[li].auto.length;i++){l2[l2.length]=new Option(c[li].auto[i].name);}
load_data_auto();load_pres1();}
function load_data_auto(){li2=list2.selectedIndex;if(li2<0){$('tts1').style.display='none';$('tts2').style.display='';return;}
$('tts2').style.display='none';$('tts1').style.display='';$('name2').value=l2[li2].text;var ca=c[li].auto[li2];$('value2').value=ca.value;rr1.innerHTML='';for(var i in ca.matches){l3_add();var y;y=document.getElementsByName('autorule_a');findandselect(y[y.length-1],ca.matches[i].what);y=document.getElementsByName('autorule_b');findandselect(y[y.length-1],ca.matches[i].mode);y=document.getElementsByName('autorule_c');y[y.length-1].value=ca.matches[i].text;y=document.getElementsByName('autorule_d');y[y.length-1].checked=udf(ca.matches[i].enabled,true);}}
function load_pres1(){var o=$('pres1');o.innerHTML='';var k=(chrome.i18n.getMessage("auto")+'=@AUTO\n')+
(chrome.i18n.getMessage("defaultvalue")+'=@DEFAULT\n')+
(chrome.i18n.getMessage("remove")+'=@DELETE\n')+
(chrome.i18n.getMessage("b1ank")+'=@BLANK\n')+$('data').value;k=k.replace(/\r/g,'').split('\n');for(b in k){var aa=k[b];var bb=aa;if(aa.indexOf('=')>=1){aa=aa.substr(0,aa.indexOf('='));bb=bb.substr(1+bb.indexOf('='));}
if(bb.length==0)continue;var a=document.createElement("pv");a.innerText=aa;a.setAttribute("value",bb);a.setAttribute("onclick","$('value2').value=this.attributes.value.value;");o.appendChild(a);}}
load_data();var c;function udf(v,def){if(typeof v=="undefined")return def;return v;}
function rr(r){while(l.length>0){l[0]=null;}
c=r.data;for(var i=0;i<c.length;i++){var x=c[i];l[l.length]=new Option(x.name);}}
chrome.extension.sendRequest({action:"load_config"},rr);function aninotice1(){var a=$('iedc');a.style.display='inline-block';a.className='ttout';}
function l1_update(){aninotice1();l[li].text=$('name1').value;c[li].name=$('name1').value;c[li].value='@AUTO';c[li].descript=$('descript').value;c[li].data=$('data').value;}
function l2_update(){aninotice1();l2[li2].text=$('name2').value;c[li].auto[li2].name=$('name2').value;c[li].auto[li2].value=$('value2').value;newMatch=[];var x=document.getElementsByName('autorule_a');var y=document.getElementsByName('autorule_b');var z=document.getElementsByName('autorule_c');var z1=document.getElementsByName('autorule_d');for(var i=0;i<x.length;i++){if(i==0)continue;newMatch[newMatch.length]={what:x[i].value,mode:y[i].value,text:z[i].value,enabled:z1[i].checked}}
c[li].auto[li2].matches=newMatch;}
function l1_add(){c[c.length]={name:'New'+Date.now(),descript:'Nothing to say',value:'',data:'',auto:[]}
rr({data:c});}
function l1_del(){if(li<0)return;delete c[li];c=cleanundefineditems(c);rr({data:c});}
function l2_add(){c[li].auto[c[li].auto.length]={name:'New_'+Date.now(),matches:[],value:''}
load_data();}
function l2_del(){if(li2<0)return;delete c[li].auto[li2];c[li].auto=cleanundefineditems(c[li].auto);load_data();}
function cleanundefineditems(arr){var r=[];for(var i=0;i<arr.length;i++){if(typeof(arr[i])!='undefined')r[r.length]=arr[i];}
return r;}
function l3_add(){var x=document.createElement('li');x.innerHTML=$('x_sample_1').innerHTML;$('rr1').appendChild(x);}
function l3_del(btn){btn.parentNode.parentNode.removeChild(btn.parentNode);l2_update()}
function save(){chrome.extension.sendRequest({action:"save_config1",data:c},function(r){alert(r.msg)});}
function rawload(){$('raw1').value=JSON.stringify(c).split(',"').join(',\n"').split('{"').join('\n{"').split('"}').join('"}\n');}
function rawdestoryself(){if(confirm('Do you know what you are doing ?! All the config files of me will be destroyed!'))if(confirm('Really ?! Are you sure?!?')){chrome.extension.sendRequest({action:"rawdestoryself"},function(r){window.close();});}}
function rawsave(data){try{var temp=JSON.parse(data);c=temp;c=cleanundefineditems(c);rr({data:c});if(confirm(chrome.i18n.getMessage('savetosys')+' ?!'))save();}catch(e){alert('Error: '+e.toString()+"\nPlease refresh this page or this might crash!");}}
function matchabc(){$('matchsuccessful').style.display=($('regextestt').value.match($('regextestp').value)!=null)?'':'none';}
function tab(prefix,count,current){for(var i=1;i<=count;i++){if(i==current){$(prefix+i).style.display='';$(prefix+i+'t').className='tab tabnow';}else{$(prefix+i).style.display='none';$(prefix+i+'t').className='tab';}}}