const path = require('path')
const {app , BrowserWindow, ipcMain } = require('electron');
const url = require('url');
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
		height : 480,
		webPreferences:{
			nodeIntegration: true,
			contextIsolation: false,
			preload:path.resolve("./preload.js")
		}
	}) 
	win.loadFile(path.join(__dirname, 'index.html'));
	win.webContents.openDevTools();
	win.on('closed',()=>{
		win=null;
	})
}


let hostfile = "hosts"
 const redirect ="127.0.0.1"
ipcMain.on(CHANNEL_NAME, (event, data) => {
  


  newData = redirect + " " +data +"\n" ;

  fs.appendFile(hostfile, newData, (err)=> {
  	if(err){
  		Swal.fire({
  			icon: 'error',
 			 title: 'Oops...',
 			 text: 'Something went wrong!',
			})
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
  
});

ipcMain.on(CHANNEL_NAME2, (event, data) =>{
	
		
		var d = fs.readFileSync(hostfile, 'utf-8');
		
		
		var newValue = d.replace(redirect +" " +data+'\n', '');
		console.log(newValue)

		fs.writeFileSync(hostfile, newValue, 'utf-8');
		 let swalOptions = {
				
				title: data+" has been unlocked",
				icon: "success",
				showConfirmButton: false,
				timer: 3000
			};
  		alert.fire(swalOptions); 

		



})


app.on('ready',createWindow)
app.on('activate', ()=> {
	if(win === null){
		createWindow()
	}
})
