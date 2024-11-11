const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 백엔드 API 요청을 프록시
        changeOrigin: true,              // CORS 문제 해결
        pathRewrite: { '^/api': '' },    // /api 경로 제거
        logLevel: 'debug',               // 프록시 로그 추가 (디버깅에 유용)
        secure: false,                   // https 요청이 아닌 경우 false로 설정
      }
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
      })
    ]
  }
});
