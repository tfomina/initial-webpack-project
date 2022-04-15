"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env, argv) => {
	const devMode = argv.mode === "development";

	const plugins = [];

	if (!devMode) {
		plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: "static",
				reportFilename: "../report.html",
			})
		);
	}

	return {
		entry: {
			app: "./src/index.ts",
		},
		devtool: devMode && "inline-source-map",
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "babel-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.css$/i,
					exclude: /node_modules/,
					use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
				},
			],
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
			alias: {
				src: path.resolve(__dirname, "./src"),
			},
		},
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "scripts/" + (devMode ? "[name].js" : "[name].[chunkhash].js"),
			chunkFilename: "scripts/" + (devMode ? "[name].js" : "[name].[chunkhash].js"),
			clean: true,
			publicPath: "/",
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: "Initial project",
				template: "./src/index.html",
			}),
			new MiniCssExtractPlugin({
				filename: "styles/" + (devMode ? "[name].css" : "[name].[contenthash].css"),
				chunkFilename: "styles/" + (devMode ? "[name].css" : "[name].[contenthash].css"),
			}),
			...plugins,
		],
		devServer: {
			static: {
				directory: path.join(__dirname, "dist"),
				publicPath: "/",
			},
			client: {
				progress: true,
				overlay: true,
			},
			hot: true,
			open: true,
			port: 3000,
			compress: true,
			historyApiFallback: true,
		},
		optimization: {
			usedExports: true,
			runtimeChunk: "single",
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
				},
			},
			moduleIds: "deterministic",
			minimize: true,
			minimizer: devMode ? [] : [new TerserPlugin({ parallel: true }), new CssMinimizerPlugin()],
		},
		stats: "minimal",
	};
};
