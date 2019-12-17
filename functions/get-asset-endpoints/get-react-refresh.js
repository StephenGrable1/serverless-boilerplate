"use strict";

const co = require("co");
const root = process.env.root;

module.exports.handler = co.wrap(function*(event, context, callback) {
  console.log("queryString coming in: ", event.queryStringParameters);
  console.log("path coming in: ", event.path);

  const cleanEventPath = event.path.slice(1);

  var response = {
    statusCode: 301,
    headers: {
      Location: root + "?go=" + cleanEventPath
    },
    body: "Redirecting..."
  };
  callback(null, response);
});
