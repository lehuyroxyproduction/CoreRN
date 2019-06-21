import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  headerText: string,
}
class HeaderView extends React.Component<Props> {
  render() {
    const { headerText } = this.props;
    const {container, title} = styles;

    return (
      <View style={container}>
        {/* this.props.headerText // Truyền Text */}
        <Text style={title}>{headerText}</Text>
      </View>
    );
  }
}

/* // --------- Stage Less Component -----------
const HeaderView = (props) => {
  const { headerText } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{headerText}</Text>
    </View>
  );
}; */

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', // Canh dọc
    alignItems: 'center', // Canh Ngang
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

export default HeaderView;
