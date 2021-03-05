const { createProxyMiddleware } = require('http-proxy-middleware')
const BASE_URL = 'http://swapi.dev'
module.exports = function (app) {
   if (BASE_URL) {
      app.use(
         '/api',
         createProxyMiddleware({
            target: BASE_URL,
            changeOrigin: true,
            pathRewrite: {
               '^/api': '/',
            },
         })
      )
   }
}
