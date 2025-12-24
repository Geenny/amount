const path = require("path");
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	externals: {
		config: 'config'
	},
    entry: "./src/index.ts",
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
        fallback: {
            "fs": false,
            "module": false
        },
        alias: {
            app: path.join(__dirname, "../", "src/app"),
            elecir: path.join(__dirname, "../", "src/elecir"),
        }
	},
	plugins: [
		new HTMLWebpackPlugin({
			title: 'Entry',
			template: "./src/index.html"
		}),
        new CopyWebpackPlugin({
            patterns: [
            	{ from: './resources/favicon.ico', to: './favicon.ico' },
				{ from: './src/css', to: './css' },
                { from: "./resources/load.json", to: "load.json" },
                { from: "./resources/setup/", to: "setup/" },
                { from: "./resources/layouts/", to: "layouts/" }
            ],
        })
	],
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [{
					loader: 'file-loader',
				}]
			}
		]
	}
}