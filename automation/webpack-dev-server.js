var webpackDebugConfig = require('../dev-server/webpack.debug.config.js');

module.exports = {
	options: {
		webpack: webpackDebugConfig,
		publicPath: webpackDebugConfig.output.publicPath,
		host: "0.0.0.0",
		disableHostCheck: true
	},
	start: {
		webpack: {
			devtool: "eval",
		},
	},
};
