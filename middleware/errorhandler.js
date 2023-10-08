import { logEvents } from '../middleware/logEvents.js';

export const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name} : ${err.message}`, 'errorLog.txt');
  console.log(err.stack);
  res.status(500).send(err.message);
};
