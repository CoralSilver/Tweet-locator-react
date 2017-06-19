const path = require('path');
const express = require('express');

const app = express();
const publicPath = express.static(path.join(__dirname, 'dist'));
const indexPath = path.join(__dirname, 'dist/index.html');

app.use('/', publicPath);
app.get('/*', function (_, res) {
  res.sendFile(indexPath);
});
app.listen(process.env.PORT || 8080);
