const express = require('express');
const { authRouter } = require('./routes/authRoutes');
const { corsMiddleware } = require('./middleware/cors');
const { notFound } = require('./middleware/notFound');
const { rateLimitMiddleware } = require('./middleware/rateLimit');
const { securityHeaders } = require('./middleware/securityHeaders');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', 1);
app.use(securityHeaders);
app.use(corsMiddleware);
app.use(express.json({ limit: '100kb' }));

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'El backend de NeuroCarta esta operativo'
  });
});

app.use('/api/v1/auth', rateLimitMiddleware, authRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = { app };
