import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CircleView = ({color, size}) => {
  const fixSize = (size) ? size : 13;
  const fixColor = (color) ? '#444';
  const borderColor = fixColor.replace( 'rgb(', 'rgba(' ).replace( ')', ',0.5)' );  //Replace rgb to rgba

  return (
    <View style={{
        width: fixSize,
        height: fixSize,
        backgroundColor: color,
        borderColor: borderColor,
        borderWidth: 2,
        borderRadius: fixSize / 2,
      }}
    >
    </View>
  );
}

export default CircleView;
