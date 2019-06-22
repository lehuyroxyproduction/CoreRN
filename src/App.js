import 'registerComponent'
import DeviceInfo from 'react-native-device-info'
import { Navigation } from 'react-native-navigation'
import { getStoredState } from 'redux-persist'
import I18n from 'react-native-i18n'
import { en, vi } from 'locales'
import config from 'config'
import { hp, LOCALE } from 'constant'
import { authSelectors } from 'reducers'
import { persistor } from 'store'
import { api } from 'services'
import { Text, TextInput } from 'react-native'
import addNetworkListener from 'utils/network'

if (config.reactotron.enable) {
  import('utils/reactotron').then(() => console.log('Reactotron Configured'))
}

console.disableYellowBox = true
I18n.fallbacks = true
I18n.translations = {
  en,
  vi
}
let locale = I18n.currentLocale()
console.log('currentLocale : ', locale)
if (locale.includes(LOCALE.VI)) {
  I18n.locale = 'vi'
} else if (locale.includes(LOCALE.EN)) {
  I18n.locale = LOCALE.EN
} else {
  I18n.locale = LOCALE.EN
}

class App {
  constructor() {
    Text.defaultProps = { ...{ allowFontScaling: false } }
    TextInput.defaultProps = { ...{ allowFontScaling: false } }
    Navigation.events().registerAppLaunchedListener(() => {
      getStoredState(config.persist).then(state => {
        // this.startSlideShow()
        // this.startProgressTracker()
        this.startSplash()
        // this.startTest('Stop')
        // this.startTest('Rewards')
        const user = authSelectors.getUser(state)
        /* console.log(
          '----------------registerAppLaunchedListener',
          DeviceInfo.getModel()
        ) */

        console.log('----------------setAuthToken : ', user)
        if (user.account_id || user.id) {
          console.log('----------------api.setAuthToken : ', user.token)
          api.setAuthToken(user.token)
        }

        // console.log('----------------registerAppLaunchedListener', user)
        // this.startMain()

        // this.startSplash()
        // this.startTest()
        // this.startRegister()
        // this.startApp()
      })
    })
    addNetworkListener()
  }

  startApp() {
    persistor(() => {
      this.startSplash()
    })
  }

  startTest(screen) {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: screen
              }
            }
          ],
          options: {
            topBar: {
              visible: false,
              drawBehind: true
            }
          }
        }
      }
    })
  }

  startProgressTracker() {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'ProgressTracker'
              }
            }
          ],
          options: {
            topBar: {
              visible: false,
              drawBehind: true
            }
          }
        }
      }
    })
  }

  startSplash = () => {
    Navigation.setDefaultOptions({
      layout: {
        componentBackgroundColor: '#fff',
        orientation: ['portrait']
      },
      _animations: {
        push: {
          waitForRender: false
        }
      },
      topBar: {
        visible: false,
        drawBehind: true
      },
      statusBar: {
        backgroundColor: 'transparent',
        style: 'light',
        drawBehind: true
      },
      animations: {
        setRoot: {
          alpha: {
            from: 0,
            to: 1,
            duration: 300
          }
        },
        push: {
          enabled: 'true',
          content: {
            x: {
              from: 2000,
              to: 0,
              duration: 200
            }
          }
        },
        pop: {
          enabled: 'true',
          content: {
            x: {
              from: 0,
              to: 2000,
              duration: 200
            }
          }
        }
      }
    })
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                id: 'splash',
                name: 'Splash'
              }
            }
          ],
          options: {
            topBar: {
              visible: false,
              drawBehind: true
            }
          }
        }
      }
    })
  }

  startSlideShow() {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                id: 'slideshow',
                name: 'SlideShow'
              }
            }
          ],
          options: {
            topBar: {
              visible: false,
              drawBehind: true
            }
          }
        }
      }
    })
  }

  startRegister = () => {
    Navigation.setDefaultOptions({
      layout: {
        componentBackgroundColor: '#fff',
        orientation: ['portrait']
      },
      _animations: {
        push: {
          waitForRender: false
        }
      },
      topBar: {
        visible: false,
        drawBehind: true
      },
      statusBar: {
        backgroundColor: 'transparent',
        style: 'dark'
      },
      animations: {
        setRoot: {
          alpha: {
            from: 0,
            to: 1,
            duration: 300
          }
        },
        push: {
          enabled: 'true',
          content: {
            x: {
              from: 2000,
              to: 0,
              duration: 200
            }
          }
        },
        pop: {
          enabled: 'true',
          content: {
            x: {
              from: 0,
              to: 2000,
              duration: 200
            }
          }
        }
      }
    })
    Navigation.setRoot({
      root: {
        stack: {
          id: 'Register',
          children: [
            {
              component: {
                name: 'Register'
              }
            }
          ]
          // options: {
          //   topBar: {
          //     visible: false,
          //     drawBehind: true
          //   },
          //   statusBar: {
          //     backgroundColor: 'transparent',
          //     style: 'dark'
          //   }
          // }
        }
      }
    })
  }

  startTabView() {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Main'
              }
            }
          ],
          options: {
            topBar: {
              visible: false,
              drawBehind: true
            }
          }
        }
      }
    })
  }

  startQuickStart() {
    Navigation.setDefaultOptions({
      statusBar: {
        backgroundColor: 'transparent',
        style: 'dark'
      },
      topBar: {
        background: {
          color: 'transparent'
        },
        borderHeight: 0
      }
    })
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              topTabs: {
                children: [
                  {
                    component: {
                      name: 'Events',
                      options: {
                        topTab: {
                          title: 'My Events'
                        }
                      }
                    }
                  },
                  {
                    component: {
                      name: 'Start',
                      options: {
                        topTab: {
                          title: 'Quick Start'
                        }
                      }
                    }
                  },
                  {
                    component: {
                      name: 'Challenges',
                      options: {
                        topTab: {
                          title: 'My Challenges'
                        }
                      }
                    }
                  }
                ],
                options: {
                  topBar: {
                    height: hp(15),
                    // visible: false,
                    drawBehind: true
                  },
                  statusBar: {
                    backgroundColor: 'transparent',
                    style: 'dark'
                  },
                  topTabs: {
                    height: hp(5)
                  }
                }
              }
            }
          ]
        }
      }
    })
  }

  startLogin = () => {
    console.log('startLogin')
    Navigation.setStackRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Login'
              }
            }
          ],
          options: {
            topBar: {
              visible: false,
              drawBehind: true
            }
          }
        }
      }
    })
  }

  goLogin = () => {
    console.log('goLogin')
    try {
      Navigation.setDefaultOptions({})
    } catch (e) {}

    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Login'
              }
            }
          ],
          options: {
            topBar: {
              visible: false,
              drawBehind: true
            }
          }
        }
      }
    })
  }

  startMain() {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Main'
              }
            }
          ],
          options: {
            topBar: {
              visible: false,
              drawBehind: true
            }
          }
        }
      }
    })
  }
}

export default new App()

console.disableYellowBox = true
