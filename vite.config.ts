import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    define: {
      __CONTRACT_ADDRESS__: JSON.stringify(env.VITE_CONTRACT_ADDRESS),
      __CHAIN_ID__: JSON.stringify(env.VITE_CHAIN_ID),
      __NGROK_URL__: JSON.stringify(env.VITE_NGROK_URL),
      __BASE_RPC__: JSON.stringify(env.VITE_BASE_RPC_URL)
    },
    server: {
      port: 5173,
      strictPort: true
    }
  };
});
