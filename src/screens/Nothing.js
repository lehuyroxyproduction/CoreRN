// import React, { Component } from 'react'
// import {
//   StyleSheet,
//   Image,
//   ImageBackground,
//   Animated,
//   TouchableOpacity,
//   Dimensions,
//   Slider
// } from 'react-native'
// import Interactable from 'react-native-interactable'

// const Screen = Dimensions.get('window')

// import { Container } from 'components'
// import { View, Text, Touchable } from 'components/uielements'

// import { Colors, Metrics } from 'themes'

// import { Icons, Images } from 'images'

// export default class RowActions2 extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       damping: 1 - 0.7,
//       tension: 300
//     }
//   }

//   render() {
//     // <Row damping={this.state.damping} tension={this.state.tension}>
//     //   <View style={styles.rowContent}>
//     //     <View style={styles.rowIcon} />
//     //     <View>
//     //       <Text style={styles.rowTitle}>Row Title</Text>
//     //       <Text style={styles.rowSubtitle}>
//     //         Drag the row left and right
//     //       </Text>
//     //     </View>
//     //   </View>
//     // </Row>
//     return (
//       <Container>
//         <Row damping={this.state.damping} tension={this.state.tension}>
//           <ImageBackground
//             style={{
//               width: Metrics.screen.width - 24,
//               height: 93,
//               marginTop: 4,
//               marginBottom: 4
//             }}
//             source={Images.card}
//           >
//             <TouchableOpacity
//               style={{
//                 height: 93,
//                 paddingVertical: 12,
//                 flexDirection: 'row',
//                 backgroundColor: 'transparent'
//               }}
//               onPress={() => this.props.push('JobDetails', { job: item })}
//             >
//               <View
//                 style={{
//                   width: 47,
//                   height: 47,
//                   borderRadius: 47 / 2,
//                   marginHorizontal: 16,
//                   alignSelf: 'center',
//                   backgroundColor: 'powderblue'
//                 }}
//               />

//               <View
//                 flex
//                 style={{ marginRight: 14, justifyContent: 'space-around' }}
//               >
//                 <View row center style={{ justifyContent: 'space-between' }}>
//                   <Text bold small color={Colors.slate} numberOfLines={1}>
//                     1
//                   </Text>

//                   <Text bold color={Colors.dustyOrange}>
//                     2 đ
//                   </Text>
//                 </View>

//                 <Text small color={Colors.steel} numberOfLines={1}>
//                   3
//                 </Text>

//                 <View row center style={{ justifyContent: 'flex-start' }}>
//                   <View row style={{ marginRight: 8 }}>
//                     <Image style={{ marginRight: 8 }} source={Icons.calendar} />

//                     <Text small>4</Text>
//                   </View>

//                   <Text small color="#rgba(230,230,230,1)">
//                     |
//                   </Text>

//                   <View row>
//                     <Image
//                       style={{ marginHorizontal: 8 }}
//                       source={Icons.address}
//                     />

//                     <Text small numberOfLines={1}>
//                       5
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </ImageBackground>
//         </Row>
//       </Container>
//     )
//   }
// }

// class Row extends Component {
//   constructor(props) {
//     super(props)
//     this._deltaX = new Animated.Value(0)
//   }

//   render() {
//     return (
//       <View style={{ backgroundColor: 'white' }}>
//         <View
//           style={{ position: 'absolute', left: 0, right: 0, height: 75 }}
//           pointerEvents="box-none"
//         >
//           <Animated.View
//             style={[
//               styles.trashHolder,
//               {
//                 transform: [
//                   {
//                     translateX: this._deltaX.interpolate({
//                       inputRange: [-155, 0],
//                       outputRange: [0, 155]
//                     })
//                   }
//                 ]
//               }
//             ]}
//           >
//             <Touchable
//               rippleCentered={false}
//               gradient
//               gradientType={2}
//               gradientStyle={{ paddingLeft: 24, alignItems: 'flex-start' }}
//             >
//               <Text color="white">Press</Text>
//             </Touchable>
//             {/* <TouchableOpacity
//               onPress={this.onButtonPress.bind(this, 'trash')}
//               style={styles.button}
//             >
//               <Image
//                 style={styles.button}
//                 source={require('../../assets/icon-trash.png')}
//               />
//             </TouchableOpacity> */}
//           </Animated.View>
//         </View>

//         <Interactable.View
//           horizontalOnly={true}
//           snapPoints={[
//             // {
//             //   x: 78,
//             //   damping: 1 - this.props.damping,
//             //   tension: this.props.tension
//             // },
//             {
//               x: 0,
//               damping: 1 - this.props.damping,
//               tension: this.props.tension
//             },
//             {
//               x: -155,
//               damping: 1 - this.props.damping,
//               tension: this.props.tension
//             }
//           ]}
//           animatedValueX={this._deltaX}
//         >
//           <View
//             style={{ left: 0, right: 0, height: 75, backgroundColor: 'white' }}
//           >
//             {this.props.children}
//           </View>
//         </Interactable.View>
//       </View>
//     )
//   }

//   onButtonPress(name) {
//     alert(`Button ${name} pressed`)
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   rowContent: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderColor: '#eeeeee'
//   },
//   rowIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#73d4e3',
//     margin: 20
//   },
//   rowTitle: {
//     fontWeight: 'bold',
//     fontSize: 20
//   },
//   rowSubtitle: {
//     fontSize: 18,
//     color: 'gray'
//   },
//   button: {
//     width: 40,
//     height: 40
//   },
//   trashHolder: {
//     position: 'absolute',
//     top: 0,
//     left: Screen.width - 155,
//     width: Screen.width,
//     height: 75,
//     // paddingLeft: 18,
//     backgroundColor: '#f8a024',
//     justifyContent: 'center'
//   },
//   snoozeHolder: {
//     position: 'absolute',
//     top: 0,
//     left: Screen.width - 78,
//     width: Screen.width,
//     height: 75,
//     paddingLeft: 18,
//     backgroundColor: '#4f7db0',
//     justifyContent: 'center'
//   },
//   doneHolder: {
//     position: 'absolute',
//     top: 0,
//     right: Screen.width - 78,
//     width: Screen.width,
//     height: 75,
//     paddingRight: 18,
//     backgroundColor: '#2f9a5d',
//     justifyContent: 'center',
//     alignItems: 'flex-end'
//   },
//   playground: {
//     marginTop: Screen.height <= 500 ? 0 : 80,
//     padding: 20,
//     width: Screen.width - 40,
//     backgroundColor: '#5894f3',
//     alignItems: 'stretch',
//     alignSelf: 'center'
//   },
//   playgroundLabel: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 15
//   },
//   slider: {
//     height: 40
//   }
// })

import React from 'react'

import { Container } from 'components'
import { Text, View } from 'components/uielements'

import LinearGradient from 'react-native-linear-gradient'

export default class Nothing extends React.Component {
  render() {
    return (
      <Container
        statusbarColor="light-content"
        background={'white'}
        isNavbarHidden>
        <LinearGradient
          start={{ x: 0.1, y: 0.6 }}
          end={{ x: 0.8, y: 1.0 }}
          colors={['rgba(251,190,38,1)', 'rgba(234,100,66,1)']}
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 85,
            position: 'absolute',
            top: 0,
            paddingTop: 16,
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text bold color="white">
            THÔNG BÁO
          </Text>
        </LinearGradient>

        <View flex center padding={24}>
          <Text small center>
            Chức năng này đang trong giai đoạn phát triển, vui lòng quay lại
            sau.
          </Text>
        </View>
      </Container>
    )
  }
}
