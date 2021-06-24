var http = require("http");

http.createServer(function(request, response){
  response.end("<h1>Welcome to my first NodeJS server</h1>");
}).listen(3001);
