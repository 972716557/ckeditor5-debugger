const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript", // 添加 TypeScript 支持
              ],
            },
          },
          "ts-loader",
        ],
        include: path.resolve(__dirname, "../ckeditor5-master/packages"),
      },
      {
        test: /.(js)|(jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
        include: [
          path.resolve(__dirname, "src"), // 你的项目源码
          path.resolve(__dirname, "../ckeditor5-master"), // ckeditor5源码
        ],
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  // resolve: {
  //   extensions: [".ts", ".js"], // 添加 .ts 扩展名
  //   alias: {
  //     // "@ckeditor": path.resolve(__dirname, "../ckeditor5-master/packages"),
  //     "@ckeditor/ckeditor5-build-classic": path.resolve(
  //       __dirname,
  //       "../ckeditor5-master/packages/ckeditor5-editor-classic/src"
  //     ),
  //     // 通用 CKEditor 核心库路径
  //     "@ckeditor/ckeditor5-[a-z/-]+$": path.resolve(
  //       __dirname,
  //       "../ckeditor5-master/packages"
  //     ),
  //   },
  // },
  devtool: "source-map", // 启用源码映射
};
