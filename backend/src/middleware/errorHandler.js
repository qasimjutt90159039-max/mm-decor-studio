export const notFound = (req, res, next) => {
  // Only handle routes starting with /api
  if (!req.originalUrl || !req.originalUrl.startsWith('/api')) {
    return next();
  }
  const error = new Error(`Resource not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors ? Object.values(err.errors).map((e) => e.message) : undefined,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
