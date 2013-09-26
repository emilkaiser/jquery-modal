module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
        files: {
          'dist/jquery.modal.js': ['src/jquery.modal.js']
        }
      }
    },
    csslint: {
      strict: {
        options: {
          'adjoining-classes': false,
          'known-properties': false,
          'universal-selector': false,
          'text-indent': false,
          'box-sizing': false
        },
        src: ['src/**/*.css']
      }
    },
    cssmin: {
      combine: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          'dist/jquery.modal.css': ['src/jquery.modal.css']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'csslint', 'cssmin']);
};
