const config = {
    mode: "none",
    entry: './src/index.ts',
    output: {
        path: __dirname,
        filename: 'index.min.js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            // {
            //   include: /\.pug/,
            //   loader: ['raw-loader', 'pug-html-loader']
            // }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ]
    },
    devServer: {
        open: true
    }
}

module.exports = config;