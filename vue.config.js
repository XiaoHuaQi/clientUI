module.exports = {
    baseUrl: './',
    devServer: {
        host: "0.0.0.0",
        hotOnly: true,
        port: 80,
        proxy: {
            '/': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                ws:false
            }
        }
    }
}
// http://xiaopc.natapp1.cc
// http://xiaocc.natapp1.cc
