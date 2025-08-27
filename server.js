import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// Proxy your Replit app securely
app.use(
  "/alex",
  createProxyMiddleware({
    target: "https://b0649f53-58ef-4bd9-8e40-da9e830d721b-00-3kzfhoenmg85d.sisko.replit.dev/",
    changeOrigin: true,
    pathRewrite: { "^/alex": "" },
    onProxyRes(proxyRes) {
      // Remove headers that block embedding
      delete proxyRes.headers["x-frame-options"];
      delete proxyRes.headers["content-security-policy"];
    },
  })
);

app.listen(3000, () => {
  console.log("✅ Proxy running at http://localhost:3000/alex");
});
