var express = require("express");
var bodyParser = require('body-parser');
var cfenv = require("cfenv");
var path = require('path')
var appEnv = cfenv.getAppEnv();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));
app.use('/static',express.static(path.join(__dirname,'static')));

var port = appEnv.port;

app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname,'/index.html'))
});

var server = app.listen(port, '0.0.0.0', function () {
  console.log("Started on", port);
});
