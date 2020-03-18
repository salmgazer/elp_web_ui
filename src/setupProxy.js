const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/sms_proxy',
        createProxyMiddleware({
            target: 'https://konnect.kirusa.com/api/v1/Accounts',
            changeOrigin: true,
        })
    );
};