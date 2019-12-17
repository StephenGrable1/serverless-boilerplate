"use strict";

const co = require("co");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const Mustache = require("mustache");

var html;

function* loadHtml() {
  if (!html) {
    html = yield fs.readFileAsync("static/index.html", "utf-8");
  }
  return html;
}

module.exports.handler = co.wrap(function*(event, context, callback) {
  console.log("Event coming in: ", event);
  let template = yield loadHtml();
  let view = {
    someDataHere: []
  };

  let html = Mustache.render(template, view);
  const response = {
    statusCode: 200,
    body: html,
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  };

  callback(null, response);
});
