const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const {
  CKEditorTranslationsPlugin,
} = require("@ckeditor/ckeditor5-dev-translations");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");
// 在 webpack.config.js 中添加

// 计算绝对路径（根据你的实际目录结构调整）
const CKEDITOR_SRC = path.resolve(__dirname, "../ckeditor5/packages"); // /Users/yuchen/Desktop/ckeditor/ckeditor5/packages

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // 1. 处理 CKEditor 5 SVG 图标
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ["raw-loader"],
      },

      // 2. 处理 CKEditor 5 CSS 文件
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "singletonStyleTag" },
          },
          {
            loader: "postcss-loader",
            options: styles.getPostCssConfig({
              themeImporter: {
                // themePath: require.resolve("@ckeditor/ckeditor5-theme-lark"),
              },
              minify: true,
            }),
          },
        ],
      },

      // 3. 处理 JS/TS 文件（转译 CKEditor 源码）
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            plugins: [
              // CKEditor 5 需要此插件
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // 处理 CKEditor 5 翻译
    new CKEditorTranslationsPlugin({
      language: "zh", // 设置中文
      additionalLanguages: "all", // 包含所有语言
    }),
  ],
  resolve: {
    // 关键配置：将 CKEditor 包指向本地源码
    alias: {
      // 映射所有 CKEditor 包
      "@ckeditor/ckeditor5-*": path.resolve(
        CKEDITOR_SRC,
        "ckeditor5-*/src" // 注意：这里移除了开头的斜线 "/"
      ),
      ckeditor5: path.resolve(__dirname, "../ckeditor5/src"),
    },
    extensions: [".ts", ".js", ".json"], // 支持 TypeScript
  },
  devtool: "source-map", // 启用源码映射
};
