import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://cuidaterm-server.onrender.com",
      },
      "/auth": {
        target: "https://cuidaterm-server.onrender.com",
      },
    },
  },
});
