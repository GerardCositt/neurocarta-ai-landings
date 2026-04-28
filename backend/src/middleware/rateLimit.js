const { env } = require('../config/env');

const buckets = new Map();

function getClientKey(req) {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.ip || req.socket.remoteAddress || 'unknown';
}

function rateLimitMiddleware(req, res, next) {
  const now = Date.now();
  const key = `${getClientKey(req)}:${req.path}`;
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, {
      count: 1,
      resetAt: now + env.rateLimitWindowMs
    });

    res.setHeader('X-RateLimit-Limit', String(env.rateLimitMaxRequests));
    res.setHeader('X-RateLimit-Remaining', String(env.rateLimitMaxRequests - 1));
    return next();
  }

  bucket.count += 1;
  const remaining = Math.max(env.rateLimitMaxRequests - bucket.count, 0);

  res.setHeader('X-RateLimit-Limit', String(env.rateLimitMaxRequests));
  res.setHeader('X-RateLimit-Remaining', String(remaining));
  res.setHeader(
    'X-RateLimit-Reset',
    String(Math.ceil(bucket.resetAt / 1000))
  );

  if (bucket.count > env.rateLimitMaxRequests) {
    return res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Has superado el limite de peticiones. Intentalo de nuevo mas tarde.'
      }
    });
  }

  return next();
}

module.exports = { rateLimitMiddleware };
