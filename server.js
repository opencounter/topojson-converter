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
    
    var topology = topojson.topology(data, buildOptions(request));
    response.json(topology);
  });

function buildOptions(request) {
  var options = {};
  if ("properties" in request.query) {
    // In the future, it might be nice to accept a list of props to preserve
    options["property-transform"] = function(object) { return object.properties; };
  }
  if ("id" in request.query) {
    options["id"] = function(object) { return object.properties[request.query.id]; };
  }
  if ("stitch-poles" in request.query) {
    options["stitch-poles"] = true;
  }
  if ("cooordinate-system" in request.query) {
    options["cooordinate-system"] =
      request.query["cooordinate-system"] == "cartesian" ? "cartesian" : "spherical";
  }
  if ("quantization" in request.query) {
    options.quantization = +request.query.quantization;
  }

  return options;
}
 
app.listen(PORT);
console.log("topojson-converter server listening on port %d", PORT);
