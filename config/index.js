'use strict'
// Template version: 1.2.4
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/elm":{
        target:"https://mainsite-restapi.ele.me",
        pathRewrite: {"^/elm" : ""},
        secure:false,
        changeOrigin:true,
        headers:{
          Cookie:"ubt_ssid=nz43ousxcknxqp1o00rhpfbba8iwp3xy_2020-03-08; ut_ubt_ssid=ii5ixdgy2btyzpwawwsx5l9xi7su3kek_2020-03-08; cna=31OpFiIS8xQCAXUdiA0qlZBi; _utrace=d3e06862ca1c3c8d04df726bd9aed09e_2020-03-08; t=1915f1336c559aa36121010a52a40873; tzyy=4d4a720804fcdfac1a7c04e002dc8848; track_id=1583724767|b3a6cbac7de92c4db753656b371cc2b10b0e7c9f2a753df351|82f42bd5df0b1ee827b6130fc2f8a964; UTUSER=49876194; munb=2204299526991; USERID=49876194; _samesite_flag_=true; cookie2=1ab5e9368ae81214edc9964223d809c3; _tb_token_=085e533ee333; ZDS=1.0|1584199959|A2pXp5Vh+pqwsae4Umc7fwxpVctyxTXXMaIzCC4X+VExHbe5st5m0g7lVZDXGXqC; csg=e67a59e2; t_eleuc4=id4=0%40BA%2FvuHCrrRkY5xY4mAOGFnt%2Fmm9McTJ1kVKiOg%3D%3D; SID=7rLxdGLUEL0LHRh3BetODMEVnTpwT2JxaDyw29; x5check_ele=%2BkSFf7QHbeAqveYwPEiPPg%3D%3D; l=dBTSgnlPQx3dQAJSBOCMlDeF1s2E7IRqmulK8c0Hi_5al1L6ntQOok6eHep6DSWAG98e42Og6XyOoRt87_L13u4cLNpJPxDDb; isg=BNfX8unkRUOGfcGEeXU8zWmDZk0hHKt-xQYIHykE66YNWPaaMux3z7E6v7hgjIP2"
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 4000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}