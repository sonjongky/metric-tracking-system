import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';

import { AppError } from './error';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { errorCode } = err;

  if (err instanceof ValidationError) {
    errorCode = 'INVALID_INPUT_DATA';
    res.status(400);
  } else if (err instanceof AppError) {
    res.status(err.httpStatusCode);
  }

  res.json({
    code: errorCode,
    message: err.message,
    details: err.details,
  });

  next(err);
};
