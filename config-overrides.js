const path = require('path')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function override(config, env) {
   //do stuff with the webpack config...
   config.resolve.plugins = config.resolve.plugins.filter((plugin) => !(plugin instanceof ModuleScopePlugin))
   const defaultAlias = config.resolve.alias || {}

   config.resolve.alias = {
      ...defaultAlias,
      '@Components': path.resolve(__dirname, './src/components/'),
      '@Layout': path.resolve(__dirname, './src/layout/'),
      '@Context': path.resolve(__dirname, './src/context/'),
      '@Pages': path.resolve(__dirname, './src/pages/'),
      '@Utilities': path.resolve(__dirname, './src/utilities/'),
      '@Styles': path.resolve(__dirname, './src/styles/'),
      '@Image': path.resolve(__dirname, './assets/image/'),
      '@Icon': path.resolve(__dirname, './assets/icon/'),
      '@Logo': path.resolve(__dirname, './assets/logo/'),
   }

   config.optimization = {
      minimizer: [
         new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            uglifyOptions: {
               warnings: false,
               parse: {},
               compress: {},
               mangle: true, // Note `mangle.properties` is `false` by default.
               output: {
                  comments: false,
               },
               toplevel: false,
               nameCache: null,
               ie8: false,
               keep_fnames: false,
            },
         }),
      ],
   }

   return config
}
