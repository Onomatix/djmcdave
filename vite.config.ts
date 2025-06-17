import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/', // Serve from root since we're using a subdomain
  server: {
    host: "::",
    port: 8080,
    headers: {
      // Basic CORS headers for development
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      // Allow framing for widgets
      'X-Frame-Options': 'SAMEORIGIN',
      // Production-ready Permissions Policy for Mixcloud embeds
      'Permissions-Policy': 'encrypted-media=(self "https://player-widget.mixcloud.com" "https://*.mixcloud.com"), autoplay=(self "https://player-widget.mixcloud.com" "https://*.mixcloud.com"), picture-in-picture=*, fullscreen=*'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-toast', '@radix-ui/react-tooltip', '@radix-ui/react-dialog'],
        },
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
