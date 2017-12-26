module.exports = function(grunt) {

  //Initializing the configuration object
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // PATHS
    paths: {
      assets: './public/assets/',
      css:    './public/css/',
      js:     './public/js/'
    },

    // CONCAT TASK
    concat: {
      // JS FILES TO CONCAT
      js: {
        src: [
          '<%= paths.js %>sticky.min.js',
          '<%= paths.js %>jquery-3.2.1.min.js',
          '<%= paths.js %>progressbar.js',
          '<%= paths.js %>autosize.js',
          '<%= paths.js %>slick.js',
          '<%= paths.js %>dropdown.min.js',
          '<%= paths.js %>transition.min.js',
          '<%= paths.js %>dimmer.min.js',
          '<%= paths.js %>modal.min.js',
          '<%= paths.js %>scrollreveal.js',
          '<%= paths.js %>featherlight.js',
          '<%= paths.js %>numeral.js',
          '<%= paths.js %>tippy.min.js',
          '<%= paths.js %>jquery.rwdImageMaps.min.js',
          '<%= paths.js %>script.js'
        ],
        dest: '<%= paths.assets %>script.js'
      },
      // CSS FILES TO CONCAT
      css: {
        src: [
          '<%= paths.css %>normalize.css',
          '<%= paths.css %>featherlight.css',
          '<%= paths.css %>skeleton.css',
          '<%= paths.css %>slick.css',
          '<%= paths.css %>slick-theme.css',
          '<%= paths.css %>dropdown.min.css',
          '<%= paths.css %>modal.min.css',
          '<%= paths.css %>dimmer.min.css',
          '<%= paths.css %>transition.min.css',
          '<%= paths.css %>tippy.css',
          '<%= paths.css %>styles.css',
        ],
        dest: '<%= paths.assets %>styles.css'
      }
    },

    // POSTCSS
    postcss: {
      options: {
        map: false, // inline sourcemaps
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: '<%= paths.assets %>styles.css'
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          '<%= paths.assets %>script.js': ['<%= paths.assets %>script.js']
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      concat: {
        files: [
          '<%= paths.js %>**/*.js',
          '<%= paths.css %>**/*.css',
        ],
        tasks: ['concat:js', 'concat:css'],
        options: {
          livereload: true
        }
      }
    }

  });

  // Loading Plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Task definition
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('production', [
    'concat:css',
    'postcss',
    'concat:js',
    'uglify',
  ]);

};
