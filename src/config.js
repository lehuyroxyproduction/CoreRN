import persistUtils from 'utils/persist'

const DEV = __DEV__

const app = {
  name: 'LIV3LY',
  orientation: 'portrait'
}

const api = {
  baseURL: DEV ? 'http://api.dev.liv3ly.io/api/v1/' : 'http://api.dev.liv3ly.io/api/v1/',
  timeout: 20000,
  // rwUrl: DEV ? 'http://dev.rw.liv3ly.io' : 'http://rw.liv3ly.io'
  rwUrl: DEV ? 'http://dev.in.liv3ly.io' : 'http://in.liv3ly.io'
}
const google = {
  webClientId: '1044900339794-7fl4pk40nchcgsoikdo9jf0a8bi87d0n.apps.googleusercontent.com',
  iosClientId: '1044900339794-t4kjicl8b33vk592is0nr5gldh1jc2e3.apps.googleusercontent.com'
}

const urlEvents = {
  socialURL: 'http://159.65.9.63/api/sso/auth',
  internalURL: 'https://liv3ly.com/event/details/'
}

const reactotron = {
  enable: true,
  // enable: DEV,
  host: '192.168.1.3',
  port: 9090
}

const persist = persistUtils.getConfig(['auth', 'signin', 'locations', 'sessions'])

export default { app, api, persist, reactotron, google, urlEvents }
