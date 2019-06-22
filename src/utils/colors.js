import tinycolor from 'tinycolor2'

import { Colors } from 'themes'

export const isValidColor = (color: String) => tinycolor(color).isValid()
export const isLightColor = (color: String) => {
  if (color === Colors.primary) {
    return false
  }

  if (color === 'white') {
    return true
  }

  return tinycolor(color).isLight()
}
