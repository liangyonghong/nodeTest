// vue.config.js
module.exports = {
    devServer: {
        disableHostCheck: true,
        compress: true,
        port: 5000,
        proxy: {
            '/api/': {
                target: 'http://localhost:4000',
                changeOrigin: true,
            },
        },
    },
}