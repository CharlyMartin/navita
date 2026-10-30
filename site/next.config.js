const { createNavitaStylePlugin } = require("@navita/next-plugin");
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, { isServer }) {
    if (isServer) {
      // Content and MDX compilation run in Node at build time, don't bundle them
      config.externals.push({
        '@qino/cms': 'module @qino/cms',
        '@navita/core/createRenderer': 'module @navita/core/createRenderer',
        'prettier': 'commonjs prettier',
        'rehype-pretty-code': 'commonjs rehype-pretty-code',
      });
    }

    return config;
  },
};

module.exports = createNavitaStylePlugin({
  singleCssFile: false,
})(nextConfig);
