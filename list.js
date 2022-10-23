const lineReader = require('line-reader');
const para = document.getElementById('main');

lineReader.eachLine('hosts', function(line) {
  const data = line.replaceAll("127.0.0.1","")
  if (data[0]!="#" && data[0]!="") {
  
    para.innerHTML += '<li style="text-align: center;font-size: 20px;">'+data+'</li>' 

  }
});