const CracoLessPlugin = require("craco-less");
const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
    },
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: { localIdentName: "[local]_[hash:base64:5]" },
        },
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
        modifyLessRule: function (lessRule, _context) {
          lessRule.test = /\.(module)\.(less)$/;
          lessRule.exclude = path.join(__dirname, "node_modules");
          return lessRule;
        },
      },
    },
  ],
};
