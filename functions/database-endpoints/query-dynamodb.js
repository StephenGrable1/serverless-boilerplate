"use strict";
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();

exports.handler = async function(event, context, callback) {
  var paramsBundle = {
    TableName: "table-name-here",
    KeyConditionExpression: "PK = :PK",
    ExpressionAttributeValues: {
      ":PK": { S: "String-of-pk-you-want-here" }
    }
  };

  var response = await dynamodb.query(paramsBundle).promise();

  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/javascript; charset=UTF-8"
    },
    body: JSON.stringify({
      message: "success!",
      event
    })
  });
};
