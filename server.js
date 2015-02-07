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
    var data = {data: request.body};
    
    // allow arrays of geojson objects, too
    if (Array.isArray(request.body)) {
      // NOTE: this is naively assuming we'll be receiving an array of features and not geometries.
      data = {};
      for (var i = request.body.length - 1; i >= 0; i--) {
        var item = request.body[i];
        var key = item.properties && item.properties.id || i;
        data[key] = item;
      }
    }
    
    var topology = topojson.topology(data);
    response.end(JSON.stringify(topology));
  });
 
app.listen(PORT);
console.log("topojson-service server listening on port %d", PORT);
