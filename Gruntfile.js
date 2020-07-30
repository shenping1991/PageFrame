module.exports=function(grunt){
	grunt.initConfig({
		//模块配置
		//在Gruntfile.js中获取package.json中的内容
		pkg:grunt.file.readJSON('package.json'),
		concat:{//concat用来合并同类文件
			// 这里是concat任务的配置信息。
			options:{
				// 这里是任务级的Options，覆盖默认值 
				separator:';',//';'分隔文件
				stripBanners:true,
				banner:'/*!<%=pkg.name%>-<%=pkg.version%>.js<%=grunt.template.today("yyyy-mm-dd")%>*/'
			},
			dist:{
				// src:['src/**/*.js'],
				// dest:'dist/<%=pkg.name%>/js'
				src:['src/*.js'],
				dest:'dist/js/<%=pkg.name%>=<%=pkg.version%>.js.min.js'
			}
		},
		uglify: {//uglify模块用来压缩代码，减小文件体积。
			// 这里是uglify插件的配置信息
			//“options”中规定允许生成的压缩文件带banner，即在生成的压缩文件第一行加一句话说明。
			//注意，其中使用到了pkg获取package.json的内容。
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			//“build”中配置了源文件和目标文件。即规定了要压缩谁？压缩之后会生成谁？
			//注意，我们这里将目标文件的文件名通过pkg的name和version来命名。
			build: {
				// files: {
				//   'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				// }
				src: ['src/1.js','src/2.js'],
        		dest: 'dist/js/<%= pkg.name %>.min.js'
			}
			//（PS：上文中说过的package.json的内容终于找到了他被应用的地方了。
			//这样的好处是：例如，对文件版本的管理，你只需要在package.json中修改即可，
			//grunt会自动根据最新的版本号生成相应版本的文件。你不用手动去修改文件的文件名。）
	    },
	    //   qunit: {
			// files: ['test/**/*.html']
	    //   },
	    //jshint用来检查语法错误
	    jshint: {
	    	//指定files属性，表示检查目标是Gruntfile.js文件，以及src目录的所有子目录下面的JavaScript文件。
			files: ['Gruntfile.js', 'src/**/*.js'],
			options: {
				//eqeqeq: true,//eqeqeq表示要用严格相等运算符取代相等运算符
				//trailing: true,//trailing表示行尾不得有多余的空格
				//这里是覆盖JSHint默认配置的选项
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
	    },
	    cssmin:{
	    	//如果minify目标和combine目标的属性设置有重合的部分，
	    	//可以另行定义一个与minify和combine平行的options属性
	    	options: { /* ... */ },
	    	//用于压缩css文件
	    	minify:{
	    		expand:true,//如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
	    		cwd:'src/',//需要处理的文件（input）所在的目录。
	    		src:['*.css','!*.min.css'],//表示需要处理的文件。如果采用数组形式，数组的每一项就是一个文件名，可以使用通配符。
	    		dest:'dist/css/',//表示处理后的文件名或所在目录。
	    		ext:'.min.css'//表示处理后的文件后缀名。
	    		//filter：一个返回布尔值的函数，用于过滤文件名。只有返回值为true的文件，才会被grunt处理。
				//dot：是否匹配以点号（.）开头的系统文件。
				//makeBase：如果设置为true，就只匹配文件路径的最后一部分。比如，a?b可以匹配/xyz/123/acb，而不匹配/xyz/acb/123。
	    	},
	    	//用于将多个css文件合并一个文件
	    	combine:{
	    		files:{
	    			//会将src目录下的a.css和b.css文件合并压缩成dest/output.css文件
	    			'dist/css/out.min.css':['src/test.css','src/test01.css']
	    		}
	    	}
	    },
	    copy: {//用于复制文件与目录。
			main: {
			src: 'src/*',
			dest: 'dist/',
			},
			//如果要更准确控制拷贝行为，比如只拷贝文件、不拷贝目录、不保持目录结构，可以写成下面这样：
			// main: {
			//     expand: true,
			//     cwd: 'src/',
			//     src: '**',
			//     dest: 'dest/',
			//     flatten: true,
			//     filter: 'isFile',
			// },
		},
	    watch: {//用来在后台运行，监听指定事件，然后自动运行指定的任务。
	    	//任何的js代码变动，文件保存后就会自动运行jshint任务；任何sass文件变动，文件保存后就会自动运行sass任务。
			scripts: {
				files: ['**/*.js'],
				tasks: ['jshint'],
				options: {
				  spawn: false,
				},
			},
			css: {
				files: '**/*.sass',
				tasks: ['sass'],
				options: {
				//表示任务运行结束后，自动在浏览器中重载（reload）
				//这需要在浏览器中安装livereload插件。安装后，livereload的默认端口为localhost:35729，
				//但是也可以用livereload: 1337的形式重设端口（localhost:1337）。
				  livereload: true,
				},
			}
	    },
	 //    //grunt-contrib-clean 用于删除文件或目录。
	 //    clean: {
		// 	build: {
		// 	src: ["path/to/dir/one", "path/to/dir/two"]
		// 	}
		// },
		// //grunt-autoprefixer 用于为CSS语句加上浏览器前缀。
		// autoprefixer: {
		//   build: {
		//     expand: true,
		//     cwd: 'src',
		//     src: [ '**/*.css' ],
		//     dest: 'dist/css'
		//   }
		// },
		// //grunt-contrib-connect  用于在本机运行一个Web Server。
		// connect: {
		//   server: {
		//     options: {
		//       port: 4000,
		//       base: 'build',
		//       hostname: '*'
		//     }
		//   }
		// },
		// //grunt-htmlhint  用于检查HTML语法。
		// htmlhint: {
		//     build: {
		//         options: {
		//             'tag-pair': true,
		//             'tagname-lowercase': true,
		//             'attr-lowercase': true,
		//             'attr-value-double-quotes': true,
		//             'spec-char-escape': true,
		//             'id-unique': true,
		//             'head-script-disabled': true,
		//         },
		//         src: ['index.html']
		//     }
		// },
		// //grunt-contrib-sass模块  用于将SASS文件转为CSS文件。
		// sass: {
		//     build: {
		// 		options: {
		//             style: 'compressed'
		//         },
		//         files: {
		//             'dist/css/master.css': 'src/sass/master.scss'
		//         }
		//     }
		// },
		// //grunt-markdown  用于将markdown文档转为HTML文档。
		// markdown: {
		// 	//下面代码指定将md后缀名的文件，转为docs/html/目录下的html文件。
		//     all: {
		//       files: [
		//         {
		//           expand: true,
		//           src: '*.md',
		//           dest: 'docs/html/',
		//           ext: '.html'
		//         }
		//       ],
		//       options: {
		//         template: 'templates/index.html',
		//         //index.html
		//         // <!DOCTYPE html>
		// 		// <html>
		// 		// <head>
		// 		//     <title>Document</title>
		// 		// </head>
		// 		// <body>
				 
		// 		//     <div id="main" class="container">
		// 		//         <%=content%>
		// 		//     </div>
				 
		// 		// </body>
		// 		// </html>
		//       }
		//     }
		// }
	  });
	//grunt加载插件
	//压缩javascript代码
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//javascript语法错误检查；
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-qunit');
	//实时监控文件变化、调用相应的任务重新执行；
	grunt.loadNpmTasks('grunt-contrib-watch');
	//合并多个文件的代码到一个文件中
	grunt.loadNpmTasks('grunt-contrib-concat');
	//Contrib-clean——清空文件、文件夹；
	//Contrib-copy——复制文件、文件夹
	grunt.loadNpmTasks('grunt-contrib-copy');
	//karma——前端自动化测试工具
	//cssmin模块的作用是最小化CSS文件
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//这条语句的作用是自动分析package.json文件，自动加载所找到的grunt模块。
	//替代所有的grunt.loadNpmTasks语句。
	require('load-grunt-tasks')(grunt);

	//grunt.registerTask('test', ['jshint', 'qunit']);
	//告诉终端在输入grunt 时需要执行的任务
	grunt.registerTask('default', ['jshint','concat','uglify']);
	grunt.registerTask('cssminshit', ['cssmin:minify','cssmin:combine']);
	grunt.registerTask('check', ['jshint']);
};
//grunt cssmin # 默认情况下，先压缩后合并 如果不指明目标，只是指明模块，就表示将所有目标依次运行一遍。
//grunt cssmin:minify # 只压缩不合并
//grunt css:combine # 只合并不压缩

// grunt-contrib-clean：删除文件。
// grunt-contrib-compass：使用compass编译sass文件。
// grunt-contrib-concat：合并文件。
// grunt-contrib-copy：复制文件。
// grunt-contrib-cssmin：压缩以及合并CSS文件。
// grunt-contrib-imagemin：图像压缩模块。
// grunt-contrib-jshint：检查JavaScript语法。
// grunt-contrib-uglify：压缩以及合并JavaScript文件。
// grunt-contrib-watch：监视文件变动，做出相应动作。

//关于通配符，含义如下：
// *：匹配任意数量的字符，不包括/。
// ?：匹配单个字符，不包括/。
// **：匹配任意数量的字符，包括/。
// {}：允许使用逗号分隔的列表，表示“or”（或）关系。
// !：用于模式的开头，表示只返回不匹配的情况。

//foo/*.js匹配foo目录下面的文件名以.js结尾的文件，
//foo/**/*.js匹配foo目录和它的所有子目录下面的文件名以.js结尾的文件，
//!*.css表示匹配所有后缀名不为“.css”的文件

