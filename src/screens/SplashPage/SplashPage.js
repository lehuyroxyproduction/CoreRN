import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetStackNavigator } from '../../helpers/helperReactNavigation/helperStackNavigator';
import { AsyncStorageItem } from '../../constants/constants';
import { saveUser } from '../../redux/actions/actionApp';
import { styles } from './styles';

class SplashPage extends Component {
  
  // #region NavigationOptions
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  }
  // #endregion

  // #region Component Lifecycle

  constructor(props) {
    super(props);

    AsyncStorage.getItem(AsyncStorageItem.User).then((value) => {
      if (value) {
        const user = JSON.parse(value);
        this.props.saveUser(user);

        // Login > 7 Days, Logout
        // const loginPeriod = new Date(new Date() - new Date(user.logInTime)).getDate();
        // console.log(new Date(), new Date(user.logInTime), loginPeriod);
        // if (loginPeriod > 7) {
        //   resetStackNavigator(this.props.navigation, 'SignIn');
        //   return;
        // }

        // Navigate ADMIN TAB, User TAB
        resetStackNavigator(this.props.navigation, 
          user.IsAdmin === true ? 'AdminTabNavigatorMain' : 'UserTabNavigatorMain'
        );
        return;
      } 

      // Not Save User, SIGN IN
      resetStackNavigator(this.props.navigation, 'SignIn');  
    });
  }

  render() {
    return (
      <View style={styles.container} >
        <p>SplashPage</p>
      </View>
    );
  }

  // #endregion

}

// #endregion

// #region Redux
const mapStateToProps = (state) => ({
    
});
  
function dispatchToProps(dispatch) {
    return bindActionCreators({
      saveUser
    }, dispatch);
}
  
export default connect(mapStateToProps, dispatchToProps)(SplashPage);
// #endregion