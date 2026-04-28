const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { ApiError } = require('../utils/ApiError');
const { isValidEmail } = require('../utils/validators');
const { env } = require('../config/env');

function buildTokenPayload(user) {
  return {
    sub: user.id,
    email: user.email
  };
}

async function registerUser({ name, email, password }) {
  const normalizedName = String(name || '').trim();
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const rawPassword = String(password || '');

  if (!normalizedName || !normalizedEmail || !rawPassword) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'name, email y password son obligatorios', {
      fields: ['name', 'email', 'password']
    });
  }

  if (!isValidEmail(normalizedEmail)) {
    throw new ApiError(400, 'INVALID_EMAIL', 'El correo electronico no es valido');
  }

  if (rawPassword.length < 8) {
    throw new ApiError(400, 'WEAK_PASSWORD', 'La contrasena debe tener al menos 8 caracteres');
  }

  const existingUser = await User.findOne({ email: normalizedEmail }).lean();

  if (existingUser) {
    throw new ApiError(409, 'DUPLICATE_USER', 'Ya existe un usuario con este correo electronico');
  }

  const passwordHash = await bcrypt.hash(rawPassword, env.bcryptSaltRounds);

  try {
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      passwordHash
    });

    const token = jwt.sign(buildTokenPayload(user), env.jwtSecret, {
      expiresIn: env.jwtExpiresIn
    });

    return { user, token };
  } catch (error) {
    if (error && error.code === 11000) {
      throw new ApiError(409, 'DUPLICATE_USER', 'Ya existe un usuario con este correo electronico');
    }

    throw error;
  }
}

module.exports = { registerUser };
