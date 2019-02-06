const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    devtool: 'source-map',
    entry: [__dirname + '/src/index.js'],
    output: {
        path: path.resolve(__dirname),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoader: 1,
                            modules: true,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                        }
                    }
                ]
            }, {
                enforce: "pre",
                exclude: /node_modules/,
                test: /\.js$/,
                loader: "source-map-loader"
            }, {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    externals: {
        'react': 'commonjs2 react',
        'prop-types': 'commonjs2 prop-types'
    }
};
