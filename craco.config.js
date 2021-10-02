const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            modifyVars: { '@primary-color': '#0075c9' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  eslint: {
    enable: true,
    mode: "extends" /* (default value) */ || "file",
    configure: { /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */ },
    configure: (eslintConfig, { env, paths }) => { return eslintConfig; },
    loaderOptions: { /* Any eslint-loader configuration options: https://github.com/webpack-contrib/eslint-loader. */ },
    loaderOptions: (eslintOptions, { env, paths }) => { return eslintOptions; }
  }
};