var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;
 
app.get("/", function (request, response) {
  response.send("To use this service, POST GeoJSON data to '/'");
  console.log("Got request");
});

app.post("/", function (request, response) {
  response.send("Sorry, should have returned TopoJSON, getting there.");
});
 
app.listen(PORT);
console.log("topojson-service server listening on port %d", PORT);
