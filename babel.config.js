const plugins = ["@babel/plugin-transform-runtime"];
if (process.env.NODE_ENV === "development") {
  plugins.push("react-refresh/babel");
}

module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { esmodules: true, node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins,
};
