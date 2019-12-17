var express = require("express");
var app = express();

var path = require("path");

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/bundle.js", function(req, res) {
  res.sendFile("./static/bundle/bundle.js", {
    root: "./"
  });
});

app.get("/dev/x/:mediaFile", function(req, res) {
  res.sendFile(`./static/bundle/media/${req.params.mediaFile}`, {
    root: "./"
  });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(5000);
