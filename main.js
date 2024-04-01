const { app, BrowserWindow, session } = require('electron');
const windowStateKeeper = require('electron-window-state');
setTimeout(() => {
	console.log(`Checking ready: ${app.isReady()}`);
}, 2000);

// keep a global reference
let mainWindow, secondaryWindow;

function createWindow() {
	//  window state keeper is working at app.on('close')
	let winState = windowStateKeeper({
		defaultHeight: 600,
		defaultWidth: 800,
	});

	mainWindow = new BrowserWindow({
		width: winState.width,
		height: winState.height,
		x: winState.x,
		y: winState.y,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		show: false,
	});

	let wc = mainWindow.webContents;
	let ses = session.defaultSession;

	let getCookies = () => {
		ses.cookies
			.get({ name: 'username' })
			.then((cookies) => {
				console.log(cookies);
			})
			.catch((errors) => console.log(errors));
	};

	mainWindow.once('ready-to-show', mainWindow.show);
	// secondaryWindow.once('ready-to-show', secondaryWindow.show);

	// ctrl + shift + i
	mainWindow.webContents.openDevTools();

	mainWindow.loadFile('index.html');
	// secondaryWindow.loadFile('secondary.html');

	// mainWindow.loadURL('https://github.com');

	let now = new Date();
	let cookie = {
		url: 'https://51cloudclass.local',
		name: 'username',
		value: 'test08@163.com',
		expirationDate: now.setDate(now.getDate() + 7),
	};

	/* ses.cookies.set(cookie).then(() => {
		console.log('username cookie is set');
		getCookies();
	}); */

	ses.cookies.remove('https://51cloudclass.local', 'username');

	mainWindow.webContents.on('did-finish-load', () => {
		getCookies();
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	winState.manage(mainWindow);
}

app.on('ready', () => {
	createWindow();
});
// all closed
app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) createWindow();
});
