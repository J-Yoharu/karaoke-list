const path = require('path')
const { mergeSassVariables } = require('@vuetify/cli-plugin-utils')
const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  publicPath: '/',
  // Active just if use NGROK with SSL, WS server error
  // devServer: {
  //   hot: false,
  //   liveReload: false,
  //   webSocketServer: false,
  // },
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [
        new GenerateSW({
          swDest: 'service-worker.js',
          maximumFileSizeToCacheInBytes: 20000000,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: new RegExp(`^https:\/\/fonts\.googleapis\.com`),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-fonts',
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: new RegExp(`http.*\/\/.*api.*`),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'api',
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        }),
      ],
    },
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@axios': path.resolve(__dirname, 'src/plugins/axios.js'),
        '@user-variables': path.resolve(__dirname, 'src/styles/variables.scss'),
        apexcharts: path.resolve(__dirname, 'node_modules/apexcharts-clevision'),
      },
    },
  },
  chainWebpack: config => {
    const modules = ['vue-modules', 'vue', 'normal-modules', 'normal']
    modules.forEach(match => {
      config.module
        .rule('sass')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt => mergeSassVariables(opt, "'@/styles/variables.scss'"))
      config.module
        .rule('scss')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt => mergeSassVariables(opt, "'@/styles/variables.scss';"))
    })
  },
}
