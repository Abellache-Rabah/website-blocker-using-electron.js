const lineReader = require('line-reader');

lineReader.eachLine('hosts', function(line) {
  const data = line.replaceAll("127.0.0.1","")
    document.write('<h2 style="margin: 1em 0 0.5em 0;
    font-weight: 600;
    font-family: 'Titillium Web', sans-serif;
    position: relative;
    font-size: 36px;
    line-height: 40px;
    padding: 15px 15px 15px 15%;
    color: #355681;
    box-shadow: inset 0 0 0 1px rgb(53 86 129 / 40%), inset 0 0 5px rgb(53 86 129 / 50%), inset -285px 0 35px white;
    border-radius: 0 10px 0 10px;
    background: #fff url(../images/bartoszkosowski.jpg) no-repeat center left;">'+data+'</h2><hr>')
});