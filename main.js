const { app, BrowserWindow, globalShortcut } = require('electron');
const windowStateKeeper = require('electron-window-state');

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

	mainWindow.once('ready-to-show', mainWindow.show);

	// ctrl + shift + i
	mainWindow.webContents.openDevTools();

	let result = globalShortcut.register('CommandOrControl+G', () => {
		console.log('User pressed G with combination key.');
		globalShortcut.unregisterAll();
	});

	console.log(
		`Combination key is  ${
			!globalShortcut.isRegistered('CommandOrControl+Shift+Z')
				? 'Registed '
				: 'Available'
		}`
	);

	mainWindow.loadFile('index.html');
	// secondaryWindow.loadFile('secondary.html');
	// mainWindow.loadURL('https://github.com');

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
