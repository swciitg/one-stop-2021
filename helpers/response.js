// import _ from 'lodash';
import { omit } from 'lodash-es';

export const writeResponse = function writeResponse(res, response, status) {
  res.status(status || 200).send(JSON.stringify(response));
};

export const writeError = function writeError(res, error, status) {
  res.status(error.status || status || 400).send(JSON.stringify(omit(error, ['status'])));
};
