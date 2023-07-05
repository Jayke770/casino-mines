const million = require("million/compiler")
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}
module.exports = process?.env?.NODE_ENV !== "production" ? nextConfig : million.next(nextConfig)
