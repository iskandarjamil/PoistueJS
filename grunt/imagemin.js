module.exports = {
    all: {
        files: [{
            expand: true,
            cwd: 'source/',
            src: ['images/*.{png,jpg,gif}'],
            dest: 'dist/images/'
        }]
    }
};
