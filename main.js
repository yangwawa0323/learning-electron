const {
	app,
	BrowserWindow,
	Menu,
	MenuItem,
	Tray,
	powerMonitor,
} = require('electron');
const windowStateKeeper = require('electron-window-state');

// keep a global reference
let mainWindow, secondaryWindow, tray;

let mainMenu = Menu.buildFromTemplate(require('./menu'));

let contextMenu = Menu.buildFromTemplate([
	{ label: 'Item 1' },
	{ role: 'editMenu', enabled: false },
]);

let trayMenu = Menu.buildFromTemplate([
	{
		label: 'Tray Item 1',
		click: () => {
			console.log('click tray item 1');
		},
	},
	{ role: 'quit' },
]);

function createTray() {
	tray = new Tray('./icon@2x.png');
	tray.setToolTip('51cloudclass electron tray icon');
	tray.setContextMenu(trayMenu);

	tray.on('click', (e) => {
		console.log(e);

		if (e.shiftKey) {
			app.quit();
		} else {
			mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
		}
	});
}

function createWindow() {
	createTray();
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
		icon: './icon@2x.png',
	});

	mainWindow.once('ready-to-show', mainWindow.show);

	// ctrl + shift + i
	mainWindow.webContents.openDevTools();

	Menu.setApplicationMenu(mainMenu);

	mainWindow.webContents.on('context-menu', () => {
		contextMenu.popup();
	});

	mainWindow.loadFile('index.html');
	// secondaryWindow.loadFile('secondary.html');
	// mainWindow.loadURL('https://github.com');

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	winState.manage(mainWindow);

	powerMonitor.on('on-ac', (e) => {
		console.log('plug in AC now.');
	});

	powerMonitor.on('on-battery', (e) => {
		console.log('AC is off, battery support.');
	});

	powerMonitor.on('unlock-screen', (e) => {
		mainWindow.show();
	});
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
