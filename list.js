const lineReader = require('line-reader');
const para = document.getElementById('main');



let hostfile = "";
function getOS(){
  if (process.platform === "win32") {
  hostfile = "c:\\Windows\\System32\\Drivers\\etc\\hosts";
  } else {
    hostfile = "/etc/hosts";
  }
  return hostfile;
}



lineReader.eachLine(getOS(), function(line) {
  const data = line.replaceAll("127.0.0.1","")
  if (data[0]!="#" && data[0]!="") {
    para.innerHTML += '<li style="text-align: center;font-size: 20px;">'+data+'</li>' 
  }
});
