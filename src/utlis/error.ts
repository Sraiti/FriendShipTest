/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mongoose from "mongoose";

import { NextFunction, Request, Response } from "express";
import ApiError from "../core/apiError";
import { IS_PRODUCTION, IS_TEST } from "../config/config";

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message = error.message || statusCode;
    error = new ApiError(statusCode, message as string, true, err.stack);
  }
  next(error);
};

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;

  const { details } = err;

  if (IS_PRODUCTION && !err.isOperational) {
    statusCode = 500;
    message = "500";
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    details,
    ...(!IS_PRODUCTION && { stack: err.stack }),
  };

  if (!IS_PRODUCTION && !IS_TEST) {
    console.error(err);
  }

  res.status(statusCode).send(response);
};
