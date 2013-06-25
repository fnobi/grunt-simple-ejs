module.exports = function (grunt) {
    grunt.registerMultiTask('ejs', 'process ejs template', function () {
        var path = require('path'),
            ejs = require('ejs'),

            target = this.target,
            config = grunt.config('ejs')[target],
            options = grunt.file.readYAML(config.options);

        var files = [];

        if (!config.template[0]) {
            config.template = [config.template];
        }

        config.template.forEach(function (pattern) {
            grunt.file.expandMapping(pattern, config.dest, {
                rename: function (dest, matchedSrcPath, options) {
                    return dest + path.basename(matchedSrcPath).replace(/\.ejs$/, '');
                }
            }).forEach(function (file) {
                options.filename = file.src[0];

                grunt.file.write(
                    file.dest,
                    ejs.render(grunt.file.read(file.src[0]), options),
                    { encoding: 'utf8' }
                );
                console.log('[write] %s', file.dest);
            });;
        });
    });
};