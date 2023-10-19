import * as GlobalPolyFill from "@esbuild-plugins/node-globals-polyfill";
import inject from "@rollup/plugin-inject";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        GlobalPolyFill.NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      // process: "process/browser",
      stream: "stream-browserify",
      // zlib: "browserify-zlib",
      util: "util",
    },
  },
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ["buffer", "Buffer"] })],
    },
  },
});
