var parseOptions = function (config) {
    var grunt = require('grunt'),
        _ = grunt.util._;

    var options = _.isArray(config.options) ? config.options : [config.options],
        result = {};

    options.forEach(function (option) {
        if (_.isObject(option)) {
            result = _.defaults(option, result);
            return;
        }

        if (option.match(/\.yaml$/)) {
            result = _.defaults(grunt.file.readYAML(option), result);
        } else if (option.match(/\.json$/)) {
            result = _.defaults(grunt.file.readJSON(option), result);
        } else if (option.match(/\.js$/)) {
            result = _.defaults(require(process.cwd() + '/' + option), result);
        }
    });

    return result;
};

module.exports = parseOptions;