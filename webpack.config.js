import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	mode: 'development',
	entry: './src/index.ts',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'cjs'),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './cjs',
		port: 8081,
	},
};
