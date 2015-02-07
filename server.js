var topojson = require("topojson");
var express = require("express");
var bodyParser = require('body-parser')
var app = express();

var PORT = process.env.PORT || 3000;
 
app.get("/", function (request, response) {
  response.send("To use this service, POST GeoJSON data to '/'");
});

app.post("/",
  bodyParser.json({ limit: "10mb"}),
  function (error, request, response, next) {
    return response.end("You sent malformed JSON data.");
  },
  function (request, response) {
    // TODO: validate posted data
    // TODO: accept options for transforming
    var topology = topojson.topology({data: request.body});
    response.end(JSON.stringify(topology));
  });
 
app.listen(PORT);
console.log("topojson-service server listening on port %d", PORT);
