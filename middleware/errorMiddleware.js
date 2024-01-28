const notFound = (req, res, next) => {
  const eror = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(eror);
};
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Recource not found';
  }
  res.status(statusCode).json(message);
};

export { notFound, errorHandler };
