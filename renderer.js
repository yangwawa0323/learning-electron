const { ipcRenderer } = require('electron');

let globalType;
const captureNow = (type) => {
	/* let capScreenBtn = document.querySelector('button#capture-screen');
	console.log(capScreenBtn); */
	globalType = type;

	ipcRenderer.send('capture', { type });
};

ipcRenderer.on('capture-result', (e, args) => {
	console.log(args);
	let img = document.querySelector('img#image-result');
	if (globalType === 'window') {
		let win = args.filter((a) => /Visual Studio Code/.test(a.name))[0];
		img.src = win.thumbnail.toDataURL();
	} else {
		img.src = args[0].thumbnail.toDataURL();
	}
});
