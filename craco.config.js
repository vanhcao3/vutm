const path = require("path");
module.exports = {
     webpack: {
          alias: {
               "@": path.resolve(__dirname, "src"),
               "react/jsx-runtime.js": "react/jsx-runtime",
               "react/jsx-dev-runtime.js": "react/jsx-dev-runtime",
          },
     },
     plugins: [
          { plugin: require('craco-cesium')() }
     ],
     style: {
          postcss: {
               mode: 'file',
               plugins: [require("tailwindcss"), require("autoprefixer")],
          },
     },
     devServer: {
          hot: true,
          liveReload: true,
          // proxy: {
          //      "/tiles/proxy": {
          //           target: "https://f361.c4i.vn/tiles/proxy",
          //           pathRewrite: { "^/tiles/proxy": "" },
          //           secure: false,
          //           changeOrigin: true,
          //           selfHandleResponse: true,
          //           onError(err, req, res) {
          //                console.log("Err", err);
          //                res.status(500).send({ error: "Not Reachable" });
          //           },
          //      },
          //      "/security/": {
          //           target: "https://f361.c4i.vn/security/",
          //           pathRewrite: { "^/security": "" },
          //           secure: false,
          //           changeOrigin: true,
          //      },
          //      "/socketio": {
          //           target: "https://f361.c4i.vn/socketio/socket.io",
          //           secure: false,
          //           ws: true,
          //           pathRewrite: {
          //                "^/socketio": "",
          //           },
          //           changeOrigin: true,
          //      },
          // },
     },
};

// module.exports = {
//      plugins: [
//           {
//                plugin: require('craco-cesium')()
//           }
//      ]
// }