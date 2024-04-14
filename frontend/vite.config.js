
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig((mode) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === "production",
    }),
  ],
  server: {
    port:3000,
    open: true,
    proxy: {
            "/api": {target:"http://127.0.0.1:5000"},
            "/socket.io": {
              target: 'ws://127.0.0.1:5000',
              changeOrigin: true,
              secure: false,
              ws: true,
            },


          },



  }




}));







// import { defineConfig } from "vite";
// import eslintPlugin from "vite-plugin-eslint";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig((mode) => ({
//   plugins: [
//     react(),
//     eslintPlugin({
//       lintOnStart: true,
//       failOnError: mode === "production",
//     }),
//   ],
//   server: {
//     port:3000,
//     open: true,
//     proxy: {
//             "/api": "http://127.0.0.1:5000",
//             "/socket.io":"http://127.0.0.1:5000",


//           },



//   }




// }));
