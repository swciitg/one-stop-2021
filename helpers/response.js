// let sw = require("swagger-node-express");
const _ = require('lodash');

const writeResponse = function writeResponse(res, response, status) {
  // sw.setHeaders(res);
  res.status(status || 200).send(JSON.stringify(response));
};

const writeError = function writeError(res, error, status) {
  // sw.setHeaders(res);
  res.status(error.status || status || 400).send(JSON.stringify(_.omit(error, ['status'])));
};

module.exports = { writeError, writeResponse };
