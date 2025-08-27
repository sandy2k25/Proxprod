import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// Serve static files from public/
app.use(express.static("public"));

// Proxy route (Replit site)
app.use(
  "/app",
  createProxyMiddleware({
    target: "https://b0649f53-58ef-4bd9-8e40-da9e830d721b-00-3kzfhoenmg85d.sisko.replit.dev",
    changeOrigin: true,
    pathRewrite: { "^/app": "" }, // so /app/foo → /foo
  })
);

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
  console.log("➡️  Proxy available at http://localhost:3000/app");
});
