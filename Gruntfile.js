module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ejs: {
           dev: {
               template: [ 'examples/src/ejs/*.ejs' ],
               dest: './examples/',
               options: [ { env: 'dev' } ],
               withExtensions: true
           }
        }
    });

    grunt.loadTasks('tasks');
    grunt.registerTask('default', ['ejs:dev']);
};