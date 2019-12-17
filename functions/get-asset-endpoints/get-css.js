'use strict';

const co = require("co");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

var cssFile;

function* loadCSS(){
  if (!cssFile){
    cssFile = yield fs.readFileAsync('static/index.css', 'utf-8');
  } 
  return cssFile;
}

module.exports.handler = co.wrap(function* (event, context, callback) {
  let css = yield loadCSS();
  const response = {
    statusCode: 200,
    body: css,
    headers: {
      "Content-Type": 'text/css; charset=UTF-8'
    }
  };

  callback(null, response);
});
