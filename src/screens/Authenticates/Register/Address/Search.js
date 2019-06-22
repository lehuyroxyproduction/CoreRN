import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TouchableOpacity, StyleSheet } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { Container } from 'components'
import { View, Text, Touchable } from 'components/uielements'

import { actions } from 'redux/reducers/user'

class SearchAddress extends React.Component {
  state = { text: '' }

  renderSearch() {
    return (
      {/* <GooglePlacesAutocomplete
        styles={{
          textInputContainer: {
            marginTop: 50,
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0
          }
        }}
        autoFocus
        fetchDetails={true}
        placeholder="Tìm kiếm"
        minLength={3}
        debounce={200}
        getDefaultValue={() => this.props.value}
        textInputProps={{
          onChangeText: text => this.setState({ text })
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyD5G6WuRQ2oyisAz3uS5ALaVo6Isd2Id1o',
          language: 'vi', // language of the results
          types: 'address', // default: 'geocode',
          components: 'country:vn'
        }}
        listViewDisplayed="auto" // true/false/undefined
        onPress={(data, details) => {
          this.props.callback(data.description)

          if (details) {
            const { lat, lng } = details.geometry.location

            this.props.setUserInfo({
              latitude: lat,
              longitude: lng
            })
          }

          this.props.pop()
        }}
        renderRightButton={() =>
          <TouchableOpacity
            style={{
              flex: 0.3,
              //   width: '10%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => {
              this.props.callback(this.state.text)
              this.props.pop()
            }}
          >
            <Text center small color="white">
              Hủy
            </Text>
          </TouchableOpacity>}
      /> */}
    )
  }

  render() {
    return (
      <Container isDrawnUnderNavbar>
        <LinearGradient
          start={{ x: 0.1, y: 0.6 }}
          end={{ x: 0.8, y: 1.0 }}
          colors={['rgba(251,190,38,1)', 'rgba(234,100,66,1)']}
          style={[
            {
              width: '100%',
              height: 100,
              position: 'absolute',
              top: 0
            }
          ]}
        />
        {this.renderSearch()}
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setUserInfo: info => dispatch(actions.setUserInfo(info))
})

export default connect(null, mapDispatchToProps)(SearchAddress)
