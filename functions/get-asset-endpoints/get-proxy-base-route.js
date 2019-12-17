"use strict";

const co = require("co");
const root = process.env.root;

module.exports.handler = co.wrap(function* (event, context, callback) {
    var response = {
        statusCode: 301,
        headers: {
            Location: root
        },
        body: "Redirecting..."
    };
    callback(null, response);
});
