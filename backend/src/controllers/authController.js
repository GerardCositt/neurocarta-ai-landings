const { env } = require('../config/env');
const { registerUser } = require('../services/authService');

async function register(req, res) {
  const { user, token } = await registerUser(req.body);

  return res.status(201).json({
    success: true,
    message: 'Usuario registrado correctamente',
    data: {
      user,
      auth: {
        token,
        tokenType: 'Bearer',
        expiresIn: env.jwtExpiresIn
      }
    }
  });
}

module.exports = { register };
