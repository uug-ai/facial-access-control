/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/facial-access-control", <==== required for github pages only.
  // output: "export",  // <=== enables static exports
  reactStrictMode: true,
};

module.exports = {
  env: {
    API_LOGIN: "http://localhost:3000/api/login",
  },
};

export default nextConfig;
