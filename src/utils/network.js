import store from 'store'

import { NetInfo } from 'react-native'

import { actions } from 'redux/reducers/app'

const onChange = (isConnected: Boolean) => store.dispatch(actions.updateNetwork(isConnected))

const listenNetInfo = () => {
  NetInfo.isConnected.addEventListener('connectionChange', onChange)
}

export default listenNetInfo
