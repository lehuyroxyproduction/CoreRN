import Devices from '../Devices';

const { displayScale } = Devices;

export default {
  spacing: {
    xsmall: 2 * displayScale,
    small: 4 * displayScale,
    medium: 8 * displayScale,
    large: 16 * displayScale,
    xlarge: 32 * displayScale,
    xxlarge: 72 * displayScale,
  },
  text: {
    h1: 96 * displayScale,
    h2: 60 * displayScale,
    h3: 48 * displayScale,
    h4: 48 * displayScale,
    h5: 24 * displayScale,
    h6: 20 * displayScale,
    h7: 18 * displayScale,
    subtitle_1: 16 * displayScale,
    subtitle_2: 14 * displayScale,
    body_1: 16 * displayScale,
    body_2: 14 * displayScale,
    button: 14 * displayScale,
    caption: 12 * displayScale,
    overline: 10 * displayScale,
  }
};
