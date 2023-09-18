const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://highcare.coffit.today:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  )
}