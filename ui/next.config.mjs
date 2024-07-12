/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/facial-access-control", <==== required for github pages only.
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/models/',
            outputPath: 'static/models/',
            name: '[name].[ext]',
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
