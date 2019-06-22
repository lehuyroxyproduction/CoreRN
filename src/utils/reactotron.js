import Reactotron, { trackGlobalErrors, openInEditor, networking } from 'reactotron-react-native'
import reactotronSaga from 'reactotron-redux-saga'
import { reactotronRedux } from 'reactotron-redux'
import { reactotron as rt } from 'config'

const reactotron =
  rt.enable &&
  Reactotron.configure({ host: rt.host, port: rt.port })
    .useReactNative()
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(networking())
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect()

Reactotron.clear()

console.log = Reactotron.log

export default reactotron
