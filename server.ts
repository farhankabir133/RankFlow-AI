import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import { env } from "./src/backend/config/env";
import { logger } from "./src/backend/config/logging";
import { app } from "./src/backend/app";
import authRouter from "./api/auth";
import usersRouter from "./api/users";
import memoryRouter from "./api/memory";
import analyticsRouter from "./api/analytics";
import circularsRouter from "./api/circulars";
import leaderboardRouter from "./api/leaderboard";

async function startServer() {
  const PORT = env.PORT;

  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/memory", memoryRouter);
  app.use("/api/analytics", analyticsRouter);
  app.use("/api/circulars", circularsRouter);
  app.use("/api/leaderboard", leaderboardRouter);

  if (env.NODE_ENV !== "production") {
    logger.info("🔧 Running Express in development mode with Vite HMR middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    logger.info("📦 Running Express in production mode serving compiled static bundle.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`🚀 [RankFlow AI Engine] Server live on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  logger.error(`❌ Critical server startup failure: ${error.message}`, { stack: error.stack });
  process.exit(1);
});
