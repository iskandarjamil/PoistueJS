module.exports = {

    options: {
        spawn: false,
        livereload: true
    },

    scripts: {
        files: [
						'source/scripts/PoistueJS.js',
						'source/scripts/PoistueJS.init.js',
						'source/scripts/PoistueJS.controller.js',
						'source/scripts/library/PoistueJS.*.js',
						'source/scripts/PoistueJS.definition.js'
        ],
        tasks: [
            'jshint',
						'concat:dev'
        ]
    },

    styles: {
        files: [
            'source/sass/*.scss',
            'source/sass/library/*.scss'
        ],
        tasks: [
            'sass:dev'
        ]
    },
};
