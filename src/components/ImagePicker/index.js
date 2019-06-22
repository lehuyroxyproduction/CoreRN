import React from 'react'

import { ActionSheet } from 'components'
import RNImagePicker from 'react-native-image-crop-picker'

type Props = {
  quality?: Number,
  maxWidth?: Number,
  disableCameraOption?: Boolean,
  disableGalleryOption?: Boolean,
  onCancel?: Function,
  onSelected?: Function
}

export const ImagePicker = (props: Props) => {
  const { quality, maxWidth, disableCameraOption, disableGalleryOption, onCancel, onSelected } = props

  const pickerOptions = {
    compressImageQuality: quality,
    compressImageMaxWidth: maxWidth,
    includeBase64: true
  }

  const cameraOption = {
    title: 'Chụp ảnh',
    onPress: () => {
      RNImagePicker.openCamera(pickerOptions).then(({ data, mime }) => {
        onSelected(`data:${mime};base64,${data}`)
      })
    }
  }

  const galleryOption = {
    title: 'Chọn từ thư viện',
    onPress: () =>
      RNImagePicker.openPicker(pickerOptions).then(({ data, mime }) => {
        onSelected(`data:${mime};base64,${data}`)
      })
  }

  let options = [cameraOption, galleryOption]

  if (disableCameraOption) {
    options = [galleryOption]
  } else if (disableGalleryOption) {
    options = [cameraOption]
  }

  return <ActionSheet options={options} onCancel={onCancel} />
}

ImagePicker.defaultProps = {
  quality: 0.5,
  maxWidth: 800,
  hasCameraOption: true,
  hasGalleryOption: true,
  onCancel: () => {},
  onSelected: () => {}
}
