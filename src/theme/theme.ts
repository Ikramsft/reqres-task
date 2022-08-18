/**
 * @format
 */
import {extendTheme} from 'native-base';

const newColorTheme = {
  brand: {
    950: '#02284D',
    900: '#8287af',
    850: '#004281',
    800: '#7c83db',
    700: '#b3bef6',
    600: '#05213C',
  },
  white: {
    900: '#fff',
    800: '#f4f4f4',
  },
  black: {
    900: '#000',
  },
  red: {
    900: '#FF0000',
    800: '#EC1C24',
  },
  gray: {
    500: '#AEAEAE',
    400: 'rgba(137, 137, 137, 0.4)',
    300: '#CCCCCC',
    200: 'rgba(0, 0, 0, 0.12)',
  },
  transparent: 'rgba(255,255,255,0)',
};
export const theme = extendTheme({colors: newColorTheme});
