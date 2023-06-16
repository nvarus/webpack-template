const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require("path");
const FileManagerPlugin = require('filemanager-webpack-plugin');

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
	mode = 'production'
}
console.log(mode + ' mode')

module.exports = {
	mode: mode,
	
	//* при использовании JS закомментить
	entry: './src/index.ts',
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	// ************************************
	
	output: {
		assetModuleFilename: "assets/[hash][ext][query]",
		clean: true,
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new FileManagerPlugin({
			events: {
				onEnd: {
					copy: [
						{
							source: path.join('src', 'static'),
							destination: 'dist',
						}
					],
				},
			}
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].css'
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.pug"
		})],
	module: {
		rules: [
			// TS
			{
				test: /\.(tsx|ts)$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			// babel
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.html$/i,
				loader: "html-loader"
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					(mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
										{
										// Options
										},
									],
								],
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
				type: 'asset/resource',
				generator: {
					filename: './assets/[name][contenthash:8][ext]'
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: './fonts/[name][contenthash:8][ext]'
				},
			},
			{
				test: /\.pug$/,
				loader: "pug-loader",
				exclude: /(node_modules|bower_components)/,
			},
		]
	},
	devServer: {
		watchFiles: path.join(__dirname, 'src'),
		port: 9000,
	}
}
