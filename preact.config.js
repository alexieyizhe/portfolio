import { resolve } from 'path';

export default {
  webpack(config, env, helpers, options) {
    // Use any `index` file, not just index.js
    config.resolve.alias['preact-cli-entrypoint'] = resolve(
      process.cwd(),
      'src',
      'index'
    );

    config.resolve.modules.push(env.src); // allow absolute path imports
  },
};
