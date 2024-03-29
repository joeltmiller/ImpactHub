/**
 * Created by joelmiller on 10/13/15.
 */
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//uglify: {
		//	options: {
		//		banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		//	},
		//	build: {
		//		src: 'client/app.js',
		//		dest: 'server/public/assets/scripts/app.min.js'
		//	}
		//},
		copy: {
			main: {
				expand: true,
				cwd: "node_modules/",
				src: [
					"angular/angular.js",
					"angular-route/angular-route.min.js",
					"angular-route/angular-route.min.js.map",
					"angular-animate/angular-animate.min.js",
					"angular-animate/angular-animate.min.js.map",
					"sweetalert/dist/sweetalert.min.js",
					"sweetalert/dist/sweetalert.css",
					"v-accordion/**",
					"angular-date-picker/**",
					"angular-filter/dist/angular-filter.min.js"
				],
				"dest": "public/vendors/"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['copy']);

};
