// Empty renderer
console.log('Renderer process.');

let cron = require('node-cron');

let task = cron.schedule('*/5 * * * * *', () => {
	console.log(`${new Date().toLocaleString()} every 5 seconds.`);
});

setTimeout(() => {
	task.stop();
}, 40000);

alert('Hello world!');

let h1 = document.getElementsByTagName('h1');
console.log(h1);
