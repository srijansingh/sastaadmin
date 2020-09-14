const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "https://price-api.datayuge.com",
      secure: false,
      changeOrigin: true
    })
  );

};