import 'registerComponent'
import 'utils/reactotron'
import { Navigation } from 'react-native-navigation'

import { getStoredState } from 'redux-persist'
import { Colors, Metrics } from 'themes'
import { persistConfig } from 'config'
import { Icons } from 'images'

import addKeyboardListener from 'utils/keyboard'
import addNetworkListener from 'utils/network'
import { firebase } from 'services'
import { selectors } from 'reducers/user'
import { isAndroid } from 'constants'
import store from 'store'
import { appActions } from 'reducers'

// const {appStyle, navigatorStyle, tabbarStyle} = Styles

class App {
  constructor() {
    addNetworkListener()
    addKeyboardListener()
    // const constants = await Navigation.constants()

    firebase
      .messaging()
      .getToken()
      .then(fcmToken => console.log('Your fcm token: ', fcmToken))

    Navigation.events().registerAppLaunchedListener(() => {
      getStoredState(persistConfig).then(async state => {
        const user = selectors.getUser(state)
        if (user.user_id) {
          this.startTest()
        } else {
          this.startLoginTest()
        }
      })
    })
  }

  startTest = () => {
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
        drawBehind: true
      },
      statusBar: {
        backgroundColor: 'transparent',
        drawBehind: true,
        visible: true,
        hideWithTopBar: false,
        blur: true,
        style: 'light'
      },
      bottomTab: {
        animate: true
      },
      sideMenu: {
        left: {
          enable: false,
          visible: false
        },
        right: {
          enabled: false,
          visible: false
        }
      }
    })
    Navigation.setRoot({
      root: {
        sideMenu: {
          id: 'sideMenu',
          right: {
            component: {
              id: 'jobFilter',
              name: 'JobFilter'
            }
          },
          center: {
            bottomTabs: {
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          id: 'jobs',
                          name: 'Jobs',
                          options: {
                            bottomTab: this.tabBarOptions('Tìm việc', Icons.search, Icons.searchHL)
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          id: 'userJobs',
                          name: 'UserJobs',
                          options: {
                            bottomTab: this.tabBarOptions('Việc của tôi', Icons.job, Icons.jobHL)
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          id: 'conversation',
                          name: 'Conversation',
                          options: {
                            bottomTab: this.tabBarOptions('Trò chuyện', Icons.send, Icons.sendHL)
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          id: 'notis',
                          name: 'Notis',
                          options: {
                            bottomTab: this.tabBarOptions('Thông báo', Icons.notify, Icons.notifyHL)
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          id: 'more',
                          name: 'More',
                          options: {
                            bottomTab: this.tabBarOptions('Thêm', Icons.more, Icons.moreHL)
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          options: {
            bottomTabs: {
              animate: true
            },
            sideMenu: {
              right: {
                enabled: false,
                visible: false,
                width: Metrics.screen.width * 0.75
              }
              // openGestureMode: 'bezel'
            }
          }
        }
      }
    })
  }

  startLoginTest = () => {
    Navigation.setRoot({
      root: {
        component: {
          id: 'login',
          name: 'Login'
        },
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    })
  }

  tabBarOptions = (text, icon, selectedIcon) => {
    return isAndroid
      ? { text, icon, selectedIcon, selectedIconColor: Colors.coral, selectedTextColor: Colors.coral }
      : { text, icon, selectedIcon, selectedTextColor: Colors.coral }
  }
  // startLogin = () => {
  //   Navigation.startSingleScreenApp({
  //     screen: {
  //       screen: 'Login',
  //       overrideBackPress: true,
  //       navigatorStyle
  //     },
  //     appStyle
  //   })
  // }

  // startRegister = () => {
  //   Navigation.startSingleScreenApp({
  //     screen: {
  //       screen: 'RegisterName',
  //       overrideBackPress: true,
  //       navigatorStyle
  //     },
  //     appStyle
  //   })
  // }

  // startMain() {
  //   Navigation.startTabBasedApp({
  //     tabs: this.createTabs(),
  //     animationType: 'fade',
  //     tabsStyle: {...tabbarStyle, ...appStyle},
  //     appStyle: {...tabbarStyle, ...appStyle},
  //     drawer: {
  //       right: {
  //         screen: 'JobFilter'
  //       },
  //       disableOpenGesture: true
  //     }
  //   })
  // }

  // createTabs = () => {
  //   return [
  //     {
  //       label: 'Tìm việc',
  //       screen: 'Jobs',
  //       navigatorStyle,
  //       ...Platform.select({
  //         ios: {icon: Icons.search},
  //         android: {icon: Icons.search}
  //       }),
  //       selectedIcon: Icons.searchHL // iOS only
  //     },
  //     {
  //       label: 'Việc của tôi',
  //       screen: 'UserJobs',
  //       navigatorStyle,
  //       ...Platform.select({
  //         ios: {icon: Icons.job},
  //         android: {icon: Icons.job}
  //       }),
  //       selectedIcon: Icons.jobHL // iOS only
  //     },
  //     {
  //       label: 'Trò chuyện',
  //       screen: 'Conversation',
  //       navigatorStyle,
  //       ...Platform.select({
  //         ios: {icon: Icons.send},
  //         android: {icon: Icons.send}
  //       }),
  //       selectedIcon: Icons.sendHL // iOS only
  //     },
  //     {
  //       label: 'Thông báo',
  //       screen: 'Notis', // this is a registered name for a screen
  //       navigatorStyle,
  //       ...Platform.select({
  //         ios: {icon: Icons.notify},
  //         android: {icon: Icons.notify}
  //       }),
  //       selectedIcon: Icons.notifyHL // iOS only
  //     },
  //     {
  //       label: 'Thêm',
  //       screen: 'More', // this is a registered name for a screen
  //       navigatorStyle,
  //       ...Platform.select({
  //         ios: {icon: Icons.more},
  //         android: {icon: Icons.more}
  //       }),
  //       selectedIcon: Icons.moreHL // iOS only
  //     }
  //   ]
  // }
}

export default new App()

console.disableYellowBox = true
