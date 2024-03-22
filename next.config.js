// next.config.js
const { webpack } = require('next/dist/compiled/webpack/webpack');

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve('buffer/'),
      };
    }
    
    return config;
  },
};
