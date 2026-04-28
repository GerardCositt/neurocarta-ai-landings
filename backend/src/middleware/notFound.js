function notFound(req, res) {
  return res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Ruta ${req.method} ${req.originalUrl} no encontrada`
    }
  });
}

module.exports = { notFound };
