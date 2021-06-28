import * as dateFormatter from 'dateformat'

export function prettifyDateTime(date) {
  if(!date) return 'N/A'
  return dateFormatter.default(date, 'mmm dd yyyy HH:MM')
}

export function generateHexColorString() {
  const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
  return randomColor
}

export function serializeQueryParams( obj ) {
  return '?' + Object.keys(obj).reduce(function(a, k){
    if(obj[k]) {
      a.push(k + '=' + encodeURIComponent(obj[k]));
    }
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