/*!
 * PoistueJS's Gruntfile
 * https://github.com/iskandarjamil/PoistueJS
 * Copyright (c) 2016 iskandarjamil
 * Licensed under MIT (https://github.com/iskandarjamil/PoistueJS/blob/master/LICENSE)
 */

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * PoistueJS v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
    jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\'PoistueJS\\\'s JavaScript requires jQuery\') }\n\n',
	});

	require('time-grunt')(grunt);

	require('load-grunt-config')(grunt, {
		jitGrunt: true
	});
	
};
