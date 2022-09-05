import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { AliasOptions } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "#": path.resolve(__dirname, "./types"),
    } as AliasOptions,
  },
});
