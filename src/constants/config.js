 const AnimationConstants = {
    defaultDuration: 300,
}

 const RxConstants = {
    debounceTime: 300
}

 const Regex = {
    emailRegex:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordRegex: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
    passwordCharacters: 8,
    phoneRegex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
    nameCharacters: 4,
    phoneNumberCharacters: 8,
}

 const App = {
    title: 'GoPOS @adquestasia.com',
    version: '1.0.0',
}

 const Reactotron = {
    enable: true,
    // enable: DEV,
    host: '172.16.5.11',
    port: 9090
  }
const DEV = '__DEV__'
  export default { AnimationConstants ,DEV, RxConstants , Regex , App , Reactotron }