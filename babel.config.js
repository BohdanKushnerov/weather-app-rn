module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@api": "./api",
            "@assets": "./assets",
            "@screens": "./screens",
            "@components": "./components",
            "@utils": "./utils",
            "@interfaces": "./interfaces",
            "@customEnums": "./customEnums",
            "@customTypes": "./customTypes",
          },
        },
      ],
    ],
  };
};