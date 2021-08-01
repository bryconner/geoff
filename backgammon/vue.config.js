const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack(config) {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/svg")) // This is your svg icon directory.
      .end();

    config.module
      .rule("svg-icon")
      .test(/\.(svg)(\?.*)?$/)
      .include.add(resolve("src/assets/svg")) // This is your svg icon directory.
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]" // This is your icon prefix
      })
      .end()
      .use("svgo-loader")
      .loader("svgo-loader")
      .options({
        externalConfig: resolve("svgo.yml") // svgo config file
      })
      .end();
  }
};