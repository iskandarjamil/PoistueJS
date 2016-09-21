module.exports = {
	dev: {
		options: {
			compass : true,
			cacheLocation : '/.sass-cache/',
			loadPath:	['/Library/','/Users/iskandarjamil/WORKS/Library/'],
			style: 'expanded'
		},
		files: {
			'dist/css/<%= package.name %>.css': 'source/sass/<%= package.name %>.scss'
		}
	},
	prod: {
		options: {
			compass : true,
			//sourcemap : 'none',
			cacheLocation : '/.sass-cache/',
			loadPath:	['/Library/','/Users/iskandarjamil/WORKS/Library/'],
			style: 'compressed'
		},
		files: {
			'dist/css/<%= package.name %>.min.css': 'source/sass/<%= package.name %>.scss'
		}
	}
};
