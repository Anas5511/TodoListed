const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "something went wrong!";
  error.status = error.status || "error";

  return res
    .status(error.statusCode)
    .send({ status: error.status, message: error.message });
};

module.exports = globalErrorHandler;
