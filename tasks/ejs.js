module.exports = function (grunt) {
    var parseOptions = require('../lib/parseOptions');

    grunt.registerMultiTask('ejs', 'process ejs template', function () {
        var path = require('path'),
            ejs = require('ejs'),
            _ = grunt.util._,

            target = this.target,
            config = grunt.config('ejs')[target];

        var options = parseOptions(config),
            files = [],
            template = _.isArray(config.template) ? config.template : [config.template],
            withExtensions = config.withExtensions ? true : false;

        if (withExtensions) {
            options = _.defaults(options, require('../lib/extensions'));
        }

        template.forEach(function (pattern) {
            console.log(pattern);
            grunt.file.expandMapping(pattern, config.dest, {
                rename: function (dest, matchedSrcPath, options) {
                    return path.join(
                        dest,
                        path.basename(matchedSrcPath).replace(/\.ejs$/, '')
                    );
                }
            }).forEach(function (file) {
                console.log(file);

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