import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const target = "https://b0649f53-58ef-4bd9-8e40-da9e830d721b-00-3kzfhoenmg85d.sisko.replit.dev/";

// Proxy everything under /alex
app.use(
  "/alex",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { "^/alex": "" },
    onProxyRes(proxyRes) {
      // Remove frame-blocking headers
      delete proxyRes.headers["x-frame-options"];
      delete proxyRes.headers["content-security-policy"];
    },
    selfHandleResponse: false
  })
);

app.listen(3000, "0.0.0.0", () => {
  console.log("✅ Proxy running at http://0.0.0.0:3000/alex");
});
