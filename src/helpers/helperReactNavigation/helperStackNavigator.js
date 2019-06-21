import { StackActions, NavigationActions } from 'react-navigation';

export const resetStackNavigator = (stackNavigator, routeName) => {
    const resetStackNavigatorAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: routeName})
        ]
    });
    stackNavigator.dispatch(resetStackNavigatorAction);
}