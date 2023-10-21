import * as GlobalPolyFill from "@esbuild-plugins/node-globals-polyfill";
import inject from "@rollup/plugin-inject";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": "{NODE_ENV: 'production'}",
    "process.env.NODE_ENV": '"production"',
    "process.version": "'v0.0.1'",
    // process: `{env: {}, version: "v0.0.1"}`,
  },
  plugins: [react()],
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
      stream: "stream-browserify",
      util: "util",
      // process: "process/browser",
      // zlib: "browserify-zlib",
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        inject({
          // include: ["node_modules/tweetnacl-util/**"],
          modules: { Buffer: ["buffer", "Buffer"] },
        }),
      ],
    },
  },
});
