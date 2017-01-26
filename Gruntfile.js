'use strict';

// # Config/Tasks
// Added test comments to test jenkins plungin
// All Grunt tasks are now stored in /grunt.
// registerTask has been replaced by /grunt/aliases.js
//
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'


module.exports = function(grunt) {
	
  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
	 jshint: {
	      files: ['Gruntfile.js','app/**/*.js'],
	      
	      options: {
	    	 reporterOutput: ""
	    	
	      }
	 },
	 connect:{
		 server:{
			
			 options:{
				 hostname:'localhost',
				 port:8080,
				 base:'app',
				 reporterOutput: ""
			 }
		 }
	 },
	 injector:{
		 options: {
			 reporterOutput: "",
			 template:'app/index.html',
			 addRootSlash : false,
			 ignorePath: 'app/'
		
		    },
		    local_dependencies:{
		    	files: {
		            'app/index.html': ['app/**/*.js', 'app/**/*.css'],
		          }
		    }
	 }
	    
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-injector');
  grunt.registerTask('default', [ 'connect:server','injector']);
};


