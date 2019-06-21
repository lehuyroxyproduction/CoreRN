import { createStackNavigator } from 'react-navigation';
import ScanQRPage from '../../containers/ScanQRPage';

const ScanQRStackNavigator = createStackNavigator(
{
    ScanQR: {
        screen: ScanQRPage,
    },
    
},
{
    initialRouteName: 'ScanQR',
    navigationOptions: {
        gesturesEnabled: false,
    },
    transitionConfig: () => ({
        screenInterpolator: sceneProps => {
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

export default ScanQRStackNavigator;