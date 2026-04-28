const express = require('express');
const { register } = require('../controllers/authController');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

router.post('/register', asyncHandler(register));

module.exports = { authRouter: router };
