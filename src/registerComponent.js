import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from 'store'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import Wrapper from 'components/Wrapper'

import screens from 'screens'
import { isAndroid } from 'constant'

export default Object.entries(screens).map(([id, screen]) => {
  Navigation.registerComponentWithRedux(
    id,
    () =>
      isAndroid ? gestureHandlerRootHOC(Wrapper(screen)) : Wrapper(screen),
    Provider,
    store
  )
})
