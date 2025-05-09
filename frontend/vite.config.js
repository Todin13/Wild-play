import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://wild-play-api.vercel.app",
  //       changeOrigin: true,
  //     },
  //   },
  // },
  envDir: path.resolve(__dirname, "../"), //loads env for stripe pub key
});
