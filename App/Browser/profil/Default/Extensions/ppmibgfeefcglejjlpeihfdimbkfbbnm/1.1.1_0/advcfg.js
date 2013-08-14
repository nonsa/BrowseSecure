// laobubu.net

function rawload(){chrome.extension.sendRequest({action:"load_config"},function(rtn){var c=rtn.data;$('raw1').value=JSON.stringify(c).split(',"').join(',\n"').split('{"').join('\n{"').split('"}').join('"}\n');});}
function rawdestoryself(){if(confirm('Do you know what you are doing ?! All the config files of me will be destroyed!'))if(confirm('Really ?! Are you sure?!?')){chrome.extension.sendRequest({action:"rawdestoryself"},function(r){window.close();});}}
function rawsave(){try{var temp=JSON.parse($('raw1').value);if(confirm(chrome.i18n.getMessage('savetosys')+' ?!'))
chrome.extension.sendRequest({action:"save_config1",data:temp},function(r){alert(r.msg)});}catch(e){alert('Error: '+e.toString()+"\nPlease refresh this page or this might crash!");}}
function matchabc(){$('matchsuccessful').style.display=($('regextestt').value.match($('regextestp').value)!=null)?'':'none';}
document.getElementById('rawload').addEventListener("click",rawload);document.getElementById('rawsave').addEventListener("click",rawsave);document.getElementById('rawdestoryself').addEventListener("click",rawdestoryself);function matchabc(){$('matchsuccessful').style.display=($('regextestt').value.match($('regextestp').value)!=null)?'':'none';}
document.getElementById('regextestp').addEventListener("change",matchabc);document.getElementById('regextestp').addEventListener("keyup",matchabc);document.getElementById('regextestt').addEventListener("change",matchabc);document.getElementById('regextestt').addEventListener("keyup",matchabc);