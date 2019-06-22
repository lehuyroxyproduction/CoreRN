import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import SplashPage  from 'screens/SplashPage'

// import { StylesGlobal } from '../../constants/constants'

const AppStackNavigator = createStackNavigator({
    
  Splash: {
    screen: SplashPage,
    navigationOptions: {
      header: null,
    },
  },
},
{
  initialRouteName: 'Splash',
  // initialRouteName: 'ChangePassword',
  /* headerMode: 'float', */
  /* headerMode: 'none', */
  navigationOptions: {
    gesturesEnabled: false, /* Turn off swipe */
    headerStyle: StylesGlobal.header,
    headerTintColor: 'white',
  },
  transitionConfig: () => ({
    screenInterpolator: (sceneProps) => {
      const { position, layout, scene, index, scenes } = sceneProps;
      const toIndex = index;
      const thisSceneIndex = scene.index;
      const height = layout.initHeight;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      });

      const slideFromRight = { transform: [{ translateX }] };
      const slideFromBottom = { transform: [{ translateY }] };

      return slideFromRight;
    },
  }),
});
    
export default AppStackNavigator;
