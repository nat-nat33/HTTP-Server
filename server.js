var http = require('http');
var fs = require('fs');
var url = require('url');


var server = http.createServer().listen(8080, 'localhost');
  console.log('connected');
  server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html', 'Server-Name': 'NatNat'});
    console.log('poop');
    res.end();
  });
