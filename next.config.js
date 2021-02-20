const withPreact = require('next-plugin-preact');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = withPreact({
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }
    return config;
  },
  rewrites: async () => [
    {
      source: '/work',
      destination: '/',
    },
    {
      source: '/ping',
      destination: '/',
    },
  ],
  experimental: {
    modern: true,
  },
});
