require('dotenv').config()
module.exports = {
  reactStrictMode: true,
  target: 'serverless',
  env: {
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  },
}
