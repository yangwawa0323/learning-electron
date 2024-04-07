module.exports = [
	{
		label: '51cloudclass',
		submenu: [
			{ label: 'Item 1' },
			{
				label: 'Item 2',
				submenu: [
					{
						label: 'Sub Item 2-1',
					},
				],
			},
			{
				label: 'Item 3',
				click: () => {
					console.log('Clicked Item 3');
				},
				accelerator: 'CommandOrControl+G',
			},
		],
	},
	{
		label: 'edit',
		submenu: [
			{
				role: 'copy',
			},
			{
				role: 'paste',
			},
			{
				role: 'undo',
			},
		],
	},
	{
		label: 'about',
		submenu: [
			{
				role: 'togglefullscreen',
			},
		],
	},
];
