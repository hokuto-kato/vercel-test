const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require("autoprefixer")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	optimization: {
		minimize: false,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: true,
					},
				},
				extractComments: true,
			}),
		],
	},
	output: {
		clean: true,
		path: `${__dirname}/dist/`,
		filename: "./js/[name].js",
	},
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: "asset/resource",
				generator: {
					filename: "./img/[name][ext]",
				},
			},
			{
				test: /\.sass$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: {
							url: true,
							sourceMap: true,
							importLoaders: 2,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									autoprefixer({
										grid: true,
										flexbox: true,
									}),
								],
							},
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.js$/i,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"],
				},
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
					},
				],
			},
			{
				test: /\.pug$/i,
				loader: "pug-loader",
				options: {
					pretty: true,
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "./css/[name].css",
		}),
	],
})
