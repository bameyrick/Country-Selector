var path = require("path");
var webpack = require("webpack");

module.exports = {

	entry: [
		"./src/app/index"
	],

	output: {
		path: path.join(__dirname, "../build/js"),
    publicPath: "/js/",
    filename: "app.js"
	},

	devServer: {
		noInfo: true
	},

	module: {
			loaders: [
					{
						test: /\.js?$/,
						exclude: /(node_modules)/,
						loader: "babel-loader"
					},
					{
						test: /\.tsx?$/,
						exclude: /(node_modules)/,
						loader: "babel-loader!ts-loader"
					},
					{
						test: /\.pug$/,
						loader: "pug-loader"
					},

					{
						test: /\.json$/,
						loader: "json-loader"
					}
			]
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.pug']
	},

	plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true
      },
      minify: true
    })
	]
}
