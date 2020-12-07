const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();

const port = 3000;

const heatingProxy = createProxyMiddleware({
  target: 'http://192.168.0.102',
  changeOrigin: true,
  pathRewrite: {
    '^/api/heating/status': '/',
    '^/api/heating/on': '/on',
    '^/api/heating/off': '/off',
  },
});

const webProxy = createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
});

app.use('/api/heating', heatingProxy);
app.use('/', webProxy);

app.listen(port, () => {
  console.log(`seiiki-api listening at http://localhost:${port}`);
});
