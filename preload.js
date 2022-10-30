 const {ipcRenderer} = require('electron');

const CHANNEL_NAME = 'main';
const CHANNEL_NAME2 = 'deblock';

document.addEventListener('DOMContentLoaded', function () {
	let myButton = document.getElementById("myButton");
	myButton.addEventListener('click', ()=> {
		let txtBox = document.getElementById('site');
		let txtVal = txtBox.value;
		if (txtVal != "") {
  		  ipcRenderer.send(CHANNEL_NAME, txtVal); // send request
		}
		document.getElementById('site').value="";
	})
})


document.addEventListener('DOMContentLoaded', function () {
	let btn = document.getElementById("deblock");
	btn.addEventListener('click', ()=> {
		let txtBox2 = document.getElementById('sitetounlock');
		let txtVal1 = txtBox2.value;
		if (txtVal1 != "") {
  		  ipcRenderer.send(CHANNEL_NAME2, txtVal1); // send request
		}
		document.getElementById('sitetounlock').value="";
		
	})
})

	
