import * as React from 'react'
import { Polyline as VendorPolyline, MapPolylineProps } from 'react-native-maps'
import { Colors } from 'themes'

export default class Polyline extends React.PureComponent<MapPolylineProps> {
  render = () => {
    const { ...otherProps } = this.props

    return (
      <VendorPolyline
        strokeWidth={4}
        strokeColor={[Colors.electricBlue, Colors.white]}
        {...otherProps}
      />
    )
  }
}
