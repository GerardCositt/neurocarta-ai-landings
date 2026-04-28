const { ApiError } = require('../utils/ApiError');
const { reportError } = require('../services/monitoringService');

function errorHandler(err, _req, res, _next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details
      }
    });
  }

  if (err && err.name === 'ValidationError') {
    reportError(err, { type: 'mongoose_validation_error' }).catch(() => {});

    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'La validacion de la peticion ha fallado',
        details: Object.values(err.errors).map((item) => item.message)
      }
    });
  }

  reportError(err, { type: 'unhandled_request_error' }).catch(() => {});

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ha ocurrido un error interno inesperado'
    }
  });
}

module.exports = { errorHandler };
