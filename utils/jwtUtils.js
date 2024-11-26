// utils/jwtUtils.js

const jwt = require('jsonwebtoken');

// Function to generate access token
const generateAccessToken = (payload) => {
  return jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

// Function to generate refresh token
const generateRefreshToken = (payload) => {
  return jwt.sign({ payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = { generateAccessToken, generateRefreshToken };
