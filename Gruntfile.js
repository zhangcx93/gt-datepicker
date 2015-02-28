/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    ngtemplates: {
      app: {
        src: ['src/datePicker.html'],
        dest: 'src/template.js',
        options: {
          url: function (url) {
            return url.replace('app', '');
          },
          module: 'gtDatePicker',
          htmlmin: {collapseBooleanAttributes: true}
        }
      }
    },
    concat: {
      default: {
        src: ['src/date-picker.js', 'src/template.js'],
        dest: 'dist/datepicker.js'
      }
    },
    uglify: {
      options: {
        sourceMap: true
      },
      js: {
        src: '<%= concat.default.dest %>',
        dest: 'dist/datepicker.min.js'
      }
    },
    copy: {
      main: {
        src: 'src/style.css',
        dest: 'dist/datepicker.css'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-angular-templates');

  // Default task.
  grunt.registerTask('default', ['ngtemplates', 'concat', 'uglify', 'copy']);

};