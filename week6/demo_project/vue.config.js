module.exports = {
  publicPath: '/JStask/week6/demo_project/dist/'
}

const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      }),
    ],
  },

  publicPath: '/JStask/week6/demo_project/dist/'
};