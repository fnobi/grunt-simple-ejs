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
            include = config.include || [],
            withExtensions = config.withExtensions ? true : false;

        if (withExtensions) {
            options = _.defaults(options, require('../lib/extensions'));
        }



        template.forEach(function (pattern) {
            grunt.file.expandMapping(pattern, config.dest, {
                rename: function (dest, matchedSrcPath, options) {
                    return path.join(
                        dest,
                        path.basename(matchedSrcPath).replace(/\.ejs$/, '')
                    );
                }
            }).forEach(function (file) {
                var srcPath = file.src[0];
                var source = grunt.file.read(srcPath);

                // embed include ejs
                var includeStatements = [];
                include.forEach(function (pattern) {
                    grunt.file.expand(pattern).forEach(function (file) {
                        var includePath = path.relative(path.dirname(srcPath), file);
                        includeStatements.push(
                            '<% include ' + includePath + '%>'
                        );
                    });
                });
                source = includeStatements.join('') + source;

                options.filename = srcPath;
                grunt.file.write(
                    file.dest,
                    ejs.render(source, options),
                    { encoding: 'utf8' }
                );
                console.log('[write] %s', file.dest);
            });;
        });
    });
};


