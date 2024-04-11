const { autoUpdater } = require('electron-updater');
const { dialog, app } = require('electron');
const path = require('node:path');
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.autoDownload = false;

if (!app.isPackaged) {
	autoUpdater.forceDevUpdateConfig = true;
	autoUpdater.updateConfigPath = path.join(__dirname, './dev-update.yml');
}

module.exports = () => {
	// console.log('Auto update...');
	autoUpdater.checkForUpdates();

	autoUpdater.on('update-available', () => {
		dialog
			.showMessageBox({
				title: 'New update available',
				type: 'info',
				message: 'A new version, do you want to update?',
				buttons: ['Update', 'No'], // Update=> 0, No=>1
			})
			.then((result) => {
				if (result.response === 0) {
					autoUpdater.downloadUpdate();
				}
			});
	});

	autoUpdater.on('update-downloaded', () => {
		dialog
			.showMessageBox({
				title: 'Update is ready',
				type: 'info',
				message: 'Install and restart app now?',
				buttons: ['Yes', 'Later'], // Yes=> 0, Later=>1
			})
			.then((result) => {
				if (result.response === 0) {
					autoUpdater.quitAndInstall(false, true);
				}
			});
	});
};
