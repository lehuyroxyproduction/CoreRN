import * as React from 'react'
import { StyleSheet } from 'react-native'
import VendorMapView, { MapViewProps, PROVIDER_GOOGLE } from 'react-native-maps'
import customMapStyle from './customMapStyle'

class MapView extends React.PureComponent<MapViewProps & { mapRef: any }> {
  render = () => {
    const { mapRef, style, ...otherProps } = this.props

    return (
      <VendorMapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMapStyle}
        style={[styles.mapView, style]}
        {...otherProps}
      />
    )
  }
}

export default MapView

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
    alignSelf: 'stretch'
  }
})
