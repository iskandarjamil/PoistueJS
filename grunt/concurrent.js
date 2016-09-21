module.exports = {

    // Task options
    options: {
        limit: 4
    },

    // Dev tasks
    devJS: [
        //'clean',
        'jshint',
				'concat:dev'
    ],
    devScss: [
        'sass:dev'
    ],

    // Production tasks
    prodJS: [
        //'clean',
        'jshint',
				'concat:dev',
        'uglify'
    ],
    prodJSConcat: [
        'concat:prod'
    ],
    prodScss: [
        'sass:dev',
        'sass:prod'
    ],

    // Image tasks
    img: [
        'imagemin'
    ]
};
