const path = require('path')

module.exports = {
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      sagas: path.resolve(__dirname, 'src/sagas'),
      screens: path.resolve(__dirname, 'src/screens'),
      services: path.resolve(__dirname, 'src/services'),
      store: path.resolve(__dirname, 'src/store'),
      themes: path.resolve(__dirname, 'src/themes'),
      utils: path.resolve(__dirname, 'src/utils'),
      locales: path.resolve(__dirname, 'src/locales'),
      config: path.resolve(__dirname, 'src/config'),
      constant: path.resolve(__dirname, 'src/constant'),
      images: path.resolve(__dirname, 'src/images'),
      registerComponent: path.resolve(__dirname, 'src/registerComponent'),
      App: path.resolve(__dirname, 'src/App')
    }
  }
}
