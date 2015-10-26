var express = require('express');
var app = express();
var port = process.env['PORT'] || 8080;
var path = require('path');

app.use(express.static(path.join(__dirname, 'htdocs')));
app.get('/', function (req, res) {
  res.render('htdocs/index.html');
});

var server = app.listen(port);
