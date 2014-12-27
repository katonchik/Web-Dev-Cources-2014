var fs = require('fs')
var dummyjson = require('dummy-json');
var Handlebars = require("handlebars");
var jstoxml = require("jstoxml");
var express = require();

var dataTemplate = fs.readFileSync('./practics/ajax/database.hbs', {encoding: 'utf8'});
var htmlTemplate = Handlebars.compile(fs.readFileSync('./practics/ajax/html-template.hbs', {encoding: 'utf8'}));

var data = JSON.parse(dummyjson.parse(dataTemplate));
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});


app.get('/users.json', function (req, res) {
  var from = parseInt(req.query.from, 10) || 0;
  var to = parseInt(req.query.to, 10) || 10;
  var result = {users: data.slice(from, to)};
  res.send(result);
});

app.get('/users.xml', function (req, res) {
  var from = parseInt(req.query.from, 10) || 0;
  var to = parseInt(req.query.to, 10) || 10;

  var resultData = {users: data.slice(from, to).map(function (user) {
    return {user : user};
  })}

  var result = '<?xml version="1.0" encoding="UTF-8"?>\n';
  result += jstoxml.toXML(resultData);

  res.set('Content-Type', 'text/xml');
  res.send(result);
});

app.get('/users.html', function (req, res) {
  var from = parseInt(req.query.from, 10) || 0;
  var to = parseInt(req.query.to, 10) || 10;

  var resultData = {users: data.slice(from, to)};

  var result = {users: data.slice(from, to)};

  res.set('Content-Type', 'text/html');

  res.send(htmlTemplate(result));
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)

})
