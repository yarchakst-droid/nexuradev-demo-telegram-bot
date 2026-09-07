module.exports = {
  apps: [
    {
      name: "telegram-bot",
      cwd: __dirname + "/bot",
      script: "dist/index.js",
      max_memory_restart: "150M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
