import config from 'config'

const Navigation = {
  appStyle: {
    orientation: config.app.orientation
  },
  navigatorStyle: {
    navBarHidden: true,
    statusBarTextColorSchemeSingleScreen: 'light' // iOS only
  },
  modalStyle: {},
  tabbarStyle: {}
}

export default { Navigation }
