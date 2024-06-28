

export const handleCatchError = (res, message, error, statusCode = 500) => {
  if (error.name === 'CastError') {
    return res.json({ success: false, message: "Invalid Id" })
  }
  return res.status(statusCode).json({
    success: false,
    message: message || 'Internal Server Error',
    error: error ? error.message : null
  });
};