module.exports = {
  apps: [
    {
      name: "api",
      script: "apps/api/dist/main.js",
      instances: 2,
      exec_mode: "cluster",
      env: {
        PORT: 3000,
        FRONTEND_URL: "https://dumpsyntax.suhaibfida.dev",
        JWT_SECRET: process.env.JWT_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    },
    {
      name: "socket-server",
      script: "apps/socket-server/dist/main.js",
      exec_mode: "fork",
      env: {
        PORT: 4001,
        FRONTEND_URL: "https://dumpsyntax.suhaibfida.dev",
        JWT_SECRET: process.env.JWT_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    },
  ],
};
