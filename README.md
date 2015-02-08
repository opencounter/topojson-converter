# topojson-converter

This is an extremely simple web service for converting GeoJSON to TopoJSON. At the moment, it is basically the simplest possible approach. Simply send a POST with GeoJSON as the body and you’ll get back TopoJSON.

## Why?

For starters, getting TopoJSON out of PostGIS can be [surprisingly slow](http://postgis.17.x6.nabble.com/Performance-comparison-between-PostGIS-s-topology-creation-and-topojson-the-module-td5005884.html). If you have a JS runtime at your disposal, you can easily use the official [TopoJSON library](https://github.com/mbostock/topojson) to convert data. If not, or if you prefer to keep your various tools and services more cleanly separated, this service might be useful.

## Copyright

Copyright (c) 2015 Open Counter Enterprises, Inc. See LICENSE for details.
