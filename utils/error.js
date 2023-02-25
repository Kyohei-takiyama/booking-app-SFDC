export class AppError extends Error {
  constructor(status = 500, message = "エラーが発生しました", stack) {
    super();
    this.status = status;
    this.message = message;
    this.stack = stack;
    this.success = false;
  }
}

const castErrorHandler = (errorStatus, stack) => {
  return new AppError(
    errorStatus,
    "CastErrorが発生しました::::" + "詳細 => " + stack
  );
};
const validateErrorHandler = (errorStatus, stack) => {
  return new AppError(
    errorStatus,
    "ValidationErrorが発生しました::::" + "詳細 => " + stack
  );
};

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    const customError = castErrorHandler(err.status, err.stack);
    return res.status(customError.status).json(customError);
  }
  if (err.name === "ValidationError") {
    const customError = validateErrorHandler(err.status, err.stack);
    return res.status(customError.status).json(customError);
  }
  return res.status(err.status).json(err);
};

export default errorHandler;
