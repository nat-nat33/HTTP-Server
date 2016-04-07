var http = require('http');
var fs = require('fs');
var methods = {
  GET: 'GET',
  POST: 'POST',
  HEAD: 'HEAD',
  PUT: 'PUT',
  DELETE: 'DELETE'
};


var server = http.createServer(function(request, response) {
  function respond(code, body, type) {
    if (!type) type = 'text/html';
    response.writeHead(200, {'Content-Type': 'text/html'});
    if (body && body.pipe)
      body.pipe(response);
    else
      response.end(body);
    }

    if (request.method in methods)
    methods[request.method](urlToPath(request.url),respond, request);
    else
    respond(405, "Method " + request.method + " not allowed.");

  }).listen(8080);

function urlToPath(url) {
  var path = require('url').parse(url).pathname;
  return '.' + decodeURIComponent(path);
}


methods.GET = function (path, respond){
  fs.stat(path, function (error, stats){
    if(error && error.code == 'ENOENT')
      respond(404, 'File not found');
    else if(error)
      respond(500, error.toString());
    else if(stats.isDirectory())
      fs.readdir(path, function (error, files) {
        if(error)
          respond(500, error.toString());
        else
          respond(200, files.join('\n'));
      });
      else
        respond(200, fs.createReadStream(path),
          require('mime').lookup(path));
  });
};