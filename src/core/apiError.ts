class ApiError extends Error {
  statusCode: number;
  details: any;
  isOperational: boolean;
  constructor(
    statusCode: number,
    message: string,
    details?: any,
    isOperational = true,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    if (details) {
      this.details = details;
    }
  }
}

export default ApiError;
