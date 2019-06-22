import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from 'store'
import Wrapper from 'components/Wrapper'

import screens from 'screens'

export default Object.entries(screens).map(([id, screen]) => {
  Navigation.registerComponentWithRedux(
    id,
    () => Wrapper(screen),
    Provider,
    store
  )
})
