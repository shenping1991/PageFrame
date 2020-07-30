var path=require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const {VueLoaderPlugin}=require('vue-loader');
var babelpolyfill = require("babel-polyfill");
module.exports=[{
	entry:{
		'index':__dirname+'/origin/origin.js',
		//'/css/index':__dirname+'/origin/css.js',
	},
	output:{
		filename:'[name].js',
		path:path.resolve(__dirname,'app/js/')
	},
	devtool: 'inline-source-map',//有助于解释说明我们的目的（仅解释说明，不要用于生产环境）
	devServer: {//告诉开发服务器(dev server)，在哪里查找文件
	    contentBase: './dist',//在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
    	inline: true,//实时刷新
    	historyApiFallback: true,//不跳转
    	hot: true,
    	progress: true,
    	//port:"8083"
    },
    mode: 'development',//模式 通过选择 development 或 production 之中的一个你可以启用相应模式下的 webpack 内置的优化
	module:{
		rules:[
	        {
				test:/\.scss$/,
				use: ExtractTextPlugin.extract({
				    use:[{
				    loader:'css-loader'
				    },{
				    loader:'sass-loader'
				    }],
				    fallback:'style-loader'
			    })
			},
			{
				test:/\.sass$/,
				use:[
					'sass-loader',
				]
			},
			{
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			},
			{
				test:/\.vue$/,
				use:[
					'vue-loader',
					'style-loader',
					'css-loader'
				]
			},
			{
				test:/\.js$/,
				use:[
					'babel-loader',
				],
				exclude:/node_modules/
			}
    	],
    	
	},
	plugins:[
		// new ExtractTextPlugin({
		// 	filename: '[name].css',
		// 	allChunks: true,
		// }),
		// new CleanWebpackPlugin('dist/'),//每次生产前清理dist文件夹
		// new HtmlWebpackPlugin({//插件
		// 	title:'spdemo',//它会用新生成的 index.html 文件，把我们的原来的替换 HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中
		// 	filename:'index.html',//就是html文件的文件名，默认是index.html
		// 	template:'indextp.html'//指定你生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等。但是要注意的是，如果想使用自定义的模板文件的时候，你需要安装对应的loader哦。
		// }),
		// new ExtractTextPlugin({
		// 	filename: '[name].css',
		// 	allChunks: true,
		// }),
		new HtmlWebpackPlugin({
			//title:'spdemo',//它会用新生成的 index.html 文件，把我们的原来的替换 HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中
			filename:'index.html',//就是html文件的文件名，默认是index.html
			template:'index.html'//指定你生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等。但是要注意的是，如果想使用自定义的模板文件的时候，你需要安装对应的loader哦。
		}),
	    new VueLoaderPlugin()

	],
	resolve: {//支持vue
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
},
{
	entry:{
		'index':__dirname+'/origin/css.js',
	},
	output:{
		filename:'[name].css',
		path:path.resolve(__dirname,'app/css/')
	},
	plugins:[
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true,
		}),
	],
	module:{
		rules:[
	        {
				test:/\.scss$/,
				use: ExtractTextPlugin.extract({
				    use:[{
				    loader:'css-loader'
				    },{
				    loader:'sass-loader'
				    }],
				    fallback:'style-loader'
			    })
			},
			{
				test:/\.sass$/,
				use:[
					'sass-loader',
				]
			},
			{
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			}
    	],
    	
	},
}
];