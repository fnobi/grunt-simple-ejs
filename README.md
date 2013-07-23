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
               template: [ 'src/ejs/*.ejs' ],
               dest: './',
               options: [ 'option.dev.json', { env: 'dev' } ]
           }
        }
    });

    grunt.loadNpmTasks('grunt-simple-ejs');
    grunt.registerTask('default', ['ejs:dev']);
};
```
