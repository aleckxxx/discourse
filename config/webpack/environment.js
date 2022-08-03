const { environment } = require('@rails/webpacker')
environment.loaders.append('babel', {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
        presets: ['es2015']
    }
})
module.exports = environment
