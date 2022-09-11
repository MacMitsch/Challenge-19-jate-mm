const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");



module.exports = () => {
  return {
    mode: "production",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name]bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // Configures workbox plugins 
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "webpack Plugin",
      }),
// Injects custom service worker from src-sw
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
// Creates a manifest file 
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E.",
        description:
          "A Text Editor using IndexedDB with online and offline Capabilites",
        background_color: "#000000",
        theme_color: "#31a9e1",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 144, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    // Adding babel and CSS loaders to webpack
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          user: "asset/resource",
        },
        {
          test: /\.css$/i,
          use:[ "style-loader","css-loader"],
        },
        {
          test: /\.n?js$/,
          exclude: /node_modules/,
          user: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/present-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
