"use strict";

const fs = require("fs");

module.exports.handler = (event, context, callback) => {
    console.log("Event path might be bad??", event.path.split('/')[2])
    const content = fs.readFileSync("static/favicons/" + event.path.split('/')[2]);

  //if your run into issues here you need to set 
  //the Binary Media Types in the API Gateway dashboard to "*/*"
  //to make this work 

  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
    },
    body: content.toString("base64"),
    isBase64Encoded: true
  };

  return callback(null, response);
};