const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './main.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders:ExtractTextPlugin.extract({
                    use:['css-loader'],
                }),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename:`[name]_[hash:8].css`})
    ]
};