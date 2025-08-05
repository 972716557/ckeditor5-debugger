const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.(ts)|(tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
        options: {
          transpileOnly: true, // 只转译，不做类型检查（由插件负责）
        },
      },
      {
        test: /.(js)|(jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  resolve: {
    alias: {
      ckeditor5: path.resolve(__dirname, "../ckeditor5-master"),
      "@ckeditor/ckeditor5-build-classic": path.resolve(
        __dirname,
        "../ckeditor5-master/packages/ckeditor5-editor-classic/src/index.js"
      ),
    },
  },
  devtool: "source-map", // 启用源码映射
};
