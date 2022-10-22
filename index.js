const path = require('path')
const {app , BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const Alert = require("electron-alert");
let alert = new Alert();
let win;
const CHANNEL_NAME = 'main';
const CHANNEL_NAME2 = 'deblock';


function createWindow () {
	win = new BrowserWindow({
		title:'web blocker & deblocker',
		width : 720,
		height : 400,
		center:true,
		resizable:false,
		maximizable:false,
		icon: __dirname + '/icon2.png',
		opacity:0.9,
		roundedCorners: false,
		webPreferences:{
			nodeIntegration: true,
			contextIsolation: false,
			preload:path.resolve("./preload.js")
		}
	}) 
	win.webContents.openDevTools()
	// html file
	win.loadFile(path.join(__dirname, 'index.html'));
	// delete menu
	win.setMenu(null)
	win.on('closed',()=>{
		win=null;
	})
} 



function getOS(){
	if (process.platform === "win32") {
	hostfile = "c:\\Windows\\System32\\Drivers\\etc\\hosts"
} else {
	hostfile = "hosts2"
}
return hostfile;
}
  let hostfile = "";

 const redirect ="127.0.0.1"
ipcMain.on(CHANNEL_NAME, (event, data) => {
  hostfile = getOS();
  newData = redirect + " " +data +"\n" ;

  fs.readFile(hostfile, function (err, searchData) {
  if (err) {console.log(err);}
  if(searchData.indexOf(newData) >= 0){
  	let swalOptions = {
  			icon: 'warning',
 			 title: data +' alerdy has been blocked',
 			};
			alert.fire(swalOptions); 

  }else {
  	fs.appendFile(hostfile, newData, (err)=> {
  	if(err){
  		let swalOptions = {
  			icon: 'error',
 			 title: 'Oops...',
 			 text: 'Something went wrong!',
 			 footer:"we can't find the hosts file"
 			};
			alert.fire(swalOptions); 
  	}
  	else {
  		let swalOptions = {
				title: data+" has been blocked",
				icon: "success",
				showConfirmButton: false,
				timer: 3000
			};
  		alert.fire(swalOptions); 
			
  	}
  }); 
  }
});

  
});

ipcMain.on(CHANNEL_NAME2, (event, data) =>{
  hostfile = getOS();
  newData = redirect + " " +data +"\n" ;


fs.readFile(hostfile, function (err, searchData) {
  if (err) throw err;

  if(searchData.indexOf(newData) >= 0){
   fs.readFile(hostfile, 'utf-8', (err)=>{
		if (err) {
			let swalOptions = {
  			icon: 'error',
 			 title: 'Oops...',
 			 text: 'Something went wrong!',
 			 footer:"we can't find the hosts file"
 			};
			alert.fire(swalOptions); 
		} else {
			var d = fs.readFileSync(hostfile, 'utf-8');
		var newValue = d.replace(redirect +" " +data+'\n', '');
		fs.writeFileSync(hostfile, newValue, 'utf-8');
		 let swalOptions = {
				title: data+" has been unlocked",
				icon: "success",
				showConfirmButton: false,
				timer: 3000
			};
  		alert.fire(swalOptions);
		}
	});
  }else {
  	let swalOptions = {
  			icon: 'warning',
 			 title:"We can't find "+ data +' in the blocked list',
 			};
			alert.fire(swalOptions); 
  }
});



	 



})
app.on('ready',createWindow)
app.on('activate', ()=> {
	if(win === null){
		createWindow()
	}
})
