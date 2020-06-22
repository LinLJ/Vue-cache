module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    // 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
    proxyTable: {
      '/': {
        target: 'http://47.94.103.120:80',
        changeOrigin:true
      }
    },

    // 本地访问 http://localhost:11000
    host: 'localhost', // can be overwritten by process.env.HOST
  }
}
