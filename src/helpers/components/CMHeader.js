import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// export default class Header extends Component {
  
//   render() {
//     const {container, title} = styles;

//     return (
//       <View style={container}>
//         {/* this.props.headerText // Truyền Text */}
//         <Text style={title}>{this.props.headerText}</Text>
//       </View>
//     );
//   }
// }

// --------- Stage Less Component -----------
const CMHeader = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', // Canh dọc
    alignItems: 'center',     // Canh Ngang
    backgroundColor: '#F8F8F8',
    height: 60,
    paddingTop: 15,
    position: 'relative',  
    // Android Shadow
    elevation: 2, 
    // IOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  title: {
    fontSize: 20,
  }
});

//export default CMHeader;
export { CMHeader };
