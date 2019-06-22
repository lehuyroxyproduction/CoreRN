import config from 'config'

import Reactotron, { trackGlobalErrors, openInEditor, networking } from 'reactotron-react-native'
import apisaucePlugin from 'reactotron-apisauce'
import reactotronSaga from 'reactotron-redux-saga'
import { reactotronRedux } from 'reactotron-redux'

const { enable, host, port } = config.reactotron

const reactotron =
  enable &&
  Reactotron.configure({ host, port })
    .useReactNative()
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(networking())
    .use(apisaucePlugin())
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect()

Reactotron.clear()

console.log = Reactotron.log

export default reactotron
