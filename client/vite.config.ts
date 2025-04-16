import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), componentTagger()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8083, // Match your current port
    proxy: {
      // Proxy API requests to avoid CORS and CSP issues
      '/api': {
        target: 'https://inferno-neon.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    },
  },
});

