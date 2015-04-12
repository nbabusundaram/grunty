sassFiles = {
    'css/mystyle.css': 'sass/sitestyle.scss'
}

module.exports = function(grunt) {
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	clean: {
	      build: [
	        'css'
      		]
    	},
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: sassFiles
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: sassFiles
            }
        },
	jshint: {
	      work: [
		'js/custom/*.js',
		'Gruntfile.js' 
		]
    	},

	uglify: {
		      production: {
			files: {
			  'js/out/mins/mvAuth.min.js': 'js/custom/mvAuth.js',
			  'js/out/mins/mvIdentity.min.js': 'js/custom/mvIdentity.js'
			
			}
		      },
		      all: {
			   src : 'js/**/*.js',
			   dest : 'js/out/build.min.js'

			}
	      },
	concat: {
		    basic: {
		      src: ['css/*.css'],
		      dest: 'css/bundle/site.css',
		    },
		    extras: {
		      src: ['src/main.js', 'src/extras.js'],
		      dest: 'dist/with_extras.js',
		    }
		},

	cssmin: {
			  target: {
			    files: [{
			      expand: true,
			      cwd: 'css/bundle',
			      src: ['*.css', '!*.min.css'],
			      dest: 'release/css',
			      ext: '.min.css'
			    }]
			  }
		},
		hashres: {
			  options: {
			    encoding: 'utf8',
			    fileNameFormat: '${name}.${hash}.cache.${ext}',
			    renameFiles: true
			  },
			  prod: {
			    options: {
			    },
			    src: [
			      'js/custom/*.js'],
			      
			    dest: 'views/*.html',
			  }
},
        watch: {
            sass: {
                files: 'sass/*.scss',
                tasks: ['sass:dev']
            },
	    jshint: {
		
		files: 'js/custom/*.js',
                tasks: ['jshint:work']

		}
        }
	
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-hashres');

    grunt.registerTask('buildcss', ['clean','sass:dist']);
    grunt.registerTask('buildcssdev', ['clean','sass:dev']);
    grunt.registerTask('quality', ['jshint:work']);
    grunt.registerTask('default', ['uglify:production','jshint:work']);
};	
