/** @type {import('next').NextConfig} */

const fs = require("fs");

const dotenv = require("dotenv");

const env = dotenv.parse(fs.readFileSync(".env"));

const nextConfig = {
  reactStrictMode: true,

  env: env,
};

module.exports = nextConfig;
