/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    siteKey: process.env.siteKey,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_PROJECT_REGION: process.env.AWS_PROJECT_REGION,
    AWS_COGNITO_IDENTITY_POOL_ID: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
    AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
    AWS_USER_POOLS_ID: process.env.AWS_USER_POOLS_ID,
    AWS_USER_POOLS_WEB_CLIENT_ID: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
  },
};

module.exports = nextConfig;
