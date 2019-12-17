'use strict';

const co = require("co");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

var jsFile;

function* loadJS(){
  if (!jsFile){
    jsFile = yield fs.readFileAsync('static/index.js', 'utf-8');
  } 
  return jsFile;
}

module.exports.handler = co.wrap(function* (event, context, callback) {
  let js = yield loadJS();
  const response = {
    statusCode: 200,
    body: js,
    headers: {
      "Content-Type": 'application/javascript; charset=UTF-8'
    }
  };

  callback(null, response);
});
