class ApiError extends Error {
  statusCode: number;
  details: any;
  isOperational: boolean;
  isDBerror: boolean;
  constructor(
    statusCode: number,
    message: string,
    isDBerror = false,

    details?: any,
    isOperational = true,
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.isDBerror = isDBerror;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    if (details) {
      this.details = details;
    }
    if (isDBerror) {
    }
  }
}

export default ApiError;
