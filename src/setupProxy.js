const { createProxyMiddleware } = require('http-proxy-middleware');
    
module.exports = function(app) {

    app.use(
    '/getQuestion', //this is your api
    createProxyMiddleware({
      target:'http://localhost:8079/getQuestion', //this is your whole endpoint link
      changeOrigin: true,
    })
  );

  app.use(
    '/chat', //this is your api
    createProxyMiddleware({
      target:'http://localhost:8079/chat', //this is your whole endpoint link
      changeOrigin: true,
    })
  );
  
};