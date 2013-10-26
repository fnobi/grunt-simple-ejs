grunt-simple-ejs
================

process ejs template

## usage

```javascript
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ejs: {
           dev: {
               templateRoot: 'src/ejs',
               template: [ '*.ejs', 'article/*.ejs' ],
               dest: './',
               include: ['bower_components/external-templates/*.ejs'],
               options: [ 'option.dev.json', { env: 'dev' } ]
           }
        }
    });

    grunt.loadNpmTasks('grunt-simple-ejs');
    grunt.registerTask('default', ['ejs:dev']);
};
```
