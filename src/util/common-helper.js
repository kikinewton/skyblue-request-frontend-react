import * as dateFormatter from 'dateformat'
var jwt = require("jsonwebtoken");

export function prettifyDateTime(date) {
  if(!date) return 'N/A'
  return dateFormatter.default(date, 'mm dd yyyy')
}

export function generateHexColorString() {
  const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
  return randomColor
}

// export function serializeQueryParams( obj ) {
//   return '?' + Object.keys(obj).reduce(function(a, k){
//     if(obj[k]) {
//       a.push(k + '=' + encodeURIComponent(obj[k]));
//     }
//     return a;
//   }, []).join('&');
// }

export function serializeQueryParams( obj ) {
  return '?' + Object.keys(obj).reduce(function(a, k){
    // if(obj[k]) {
    //   a.push(k + '=' + encodeURIComponent(obj[k]));
    // }
    a.push(k + '=' + encodeURIComponent(obj[k]));
    return a;
  }, []).join('&');
}

export function serializeQueryParamsNotNull( obj ) {
  return '?' + Object.keys(obj).reduce(function(a, k){
    if(obj[k]) {
      a.push(k + '=' + encodeURIComponent(obj[k]));
    }
    //a.push(k + '=' + encodeURIComponent(obj[k]));
    return a;
  }, []).join('&');
}

export function downloadFile(data, fileName, fileType) {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE variant
    window.navigator.msSaveOrOpenBlob(new Blob([data], {type: fileType}),
        fileName);
  } else {
    console.log('====>NOT MS')
      const url = window.URL.createObjectURL(new Blob([data], {type: fileType}));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
  }
}

export function formatCurrency(value="", currency='GHS') {
  if(!currency && value) return `GHS ${value}`
  if(!value) {
    return "N/A"
  }
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  
  return Number(value) ? formatter.format(value) : 0.00
}

export function getMetabaseUri() {
  
  var METABASE_SITE_URL = "http://localhost:3000";
  var METABASE_SECRET_KEY = "9ca530454e74b6b53d316873fedefa54a0a00d2eb4155cc495e4cd8a646c01c0";

  var payload = {
    resource: { dashboard: 1 },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };
  var token = jwt.sign(payload, METABASE_SECRET_KEY);

  var iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";
  console.log('metabase uri: ', iframeUrl)
  return iframeUrl
}