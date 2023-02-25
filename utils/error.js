export class AppError extends Error {
  constructor(status = 500, message = "エラーが発生しました", stack) {
    super();
    this.status = status;
    this.message = message;
    this.stack = stack;
    this.success = false;
  }
}

export const castErrorHandler = (errorStatus, stack) => {
  return new AppError(
    errorStatus,
    "CastErrorが発生しました" + "詳細 => " + stack
  );
};
