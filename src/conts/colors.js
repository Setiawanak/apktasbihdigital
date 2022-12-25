import {store} from '../context';

const COLORS = {
  white: '#fff',
  black: '#000',
  blue: '#5D5FEE',
  grey: '#BABBC3',
  light: '#F3F4FB',
  darkBlue: '#7978B5',
  red: 'red',
  dark: '#181a20',
};

export const darkModeColor = () => {
  const {state, dispatch} = store();

  return {
    container: state.darkMode ? COLORS.dark : COLORS.light,
    content: state.darkMode ? COLORS.light : COLORS.dark,
  };
};

export default COLORS;
