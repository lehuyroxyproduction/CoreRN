import config from './config'

import Reactotron, { trackGlobalErrors, openInEditor, networking } from 'reactotron-react-native'
// import sagaPlugin from 'reactotron-redux-saga'
import { reactotronRedux } from 'reactotron-redux'

const { enable, host, port } = config.Reactotron

const reactotron =
  enable &&
  Reactotron.configure({ host, port })
    .useReactNative()
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(networking())
    .use(reactotronRedux())
    // .use(sagaPlugin())
    .connect()

Reactotron.clear()

console.log = Reactotron.log

export default reactotron
