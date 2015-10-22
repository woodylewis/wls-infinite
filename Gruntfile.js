module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['dist/js/*'],
        uglify: {
            options: {
                banner: '/*! Project: <%= pkg.name %> | Version #: <%= pkg.version %> | Created: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            js: {
                src: ['src/js/app.js',
                    'src/js/controllers/*.js',
                    'src/js/services/*.js'],
                dest: 'dist/js/wls-min.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                    'Gruntfile.js',
                    '.jshintrc',
                    'src/js/app.js',
                    'src/js/controllers/*.js',
                    'src/js/services/*.js']
        },
        less: {
            development: {
                options: {
                    compress: false,
                    cleancss: false,
                    optimization: 2,
                    dumpLineNumbers: 'false'
                },
                files: {
                    "src/css/skeleton.css": "src/less/skeleton.less",
                    "src/css/app.css": "src/less/app.less",
                    "src/css/override.css": "src/less/override.less",
                }
            }
        },
        watch: {
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            },
            options: {
                livereload: false,
            },
            styles: {
                files: ['src/less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['less', 'watch', 'jshint', 'uglify']);
};