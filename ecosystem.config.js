module.exports = {
  apps: [
    {
      name: "telegram-bot",
      cwd: __dirname + "/bot",
      script: "dist/index.js",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
