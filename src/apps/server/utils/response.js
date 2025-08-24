exports.successResponse = (res, message, data = null, pagination = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
    data,
  };
  if (pagination) {
    response.pagination = pagination;
  }
  return res.status(statusCode).json(response);
};

exports.errorResponse = (res, message, errors = [], statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    statusCode,
  });
};
