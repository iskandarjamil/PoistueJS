module.exports = {
	options: {
		banner: '/*!\n' +
            ' * PoistueJS v<%= package.version %> (<%= package.homepage %>)\n' +
            ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= package.author.name %> <<%= package.author.email %>>\n' +
            ' * Licensed under <%= package.license.type %> (<%= package.license.url %>)\n' +
            ' */\n',
		stripBanners: true
	},
	dev: {
    src: [
			'source/scripts/PoistueJS.js',
			'source/scripts/PoistueJS.init.js',
			'source/scripts/PoistueJS.controller.js',
			'source/scripts/library/PoistueJS.*.js',
			'source/scripts/PoistueJS.definition.js'
    ],
    dest: 'dist/js/<%= package.name %>.js',
  },
	prod: {
		src: [
			'dist/js/<%= package.name %>.min.js'
		],
    dest: 'dist/js/<%= package.name %>.min.js',
	}
};
