const path = require('path');

module.exports = {
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },

    devServer: {
        port: 3000,
    },
};
