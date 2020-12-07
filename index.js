const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();

const target = 'http://192.168.0.102';
const port = 3000;

const heatingProxy = createProxyMiddleware({
  target,
  changeOrigin: true,
  pathRewrite: {
    '^/heating/status': '/',
    '^/heating/on': '/on',
    '^/heating/off': '/off',
  },
});

app.use('/heating', heatingProxy);

app.listen(port, () => {
  console.log(`seiiki-api listening at http://localhost:${port}`);
});
