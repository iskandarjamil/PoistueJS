module.exports = {

    options: {
        reporter: require('jshint-stylish')
    },

    main: [
        'source/scripts/PoistueJS.js',
				'source/scripts/PoistueJS.init.js',
				'source/scripts/PoistueJS.controller.js',
				'source/scripts/library/PoistueJS.*.js',
				'source/scripts/PoistueJS.definition.js'
    ]
};
