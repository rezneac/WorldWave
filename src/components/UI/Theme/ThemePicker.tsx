import {ExtendedTheme} from '@react-navigation/native';

const getThemePallete = (themePallete?: string): ExtendedTheme => {
  switch (themePallete) {
    case 'grayTheme':
      return {
        dark: false,
        colors: {
          primary: '#C5C5C5',
          secondary: '#fff',
          tertiary: '#C5C5C5',
          danger: '#fff',
          background: '#293241',
          card: '#344051',
          text: '#141414',
          subtext: '#344051',
          separator: '#fff',
          border: '#fff',
          highlight: '#fcfcfc',
          notification: '#fff',
          topBar: '#596673',
        },
      };
    case 'lightTheme':
      return {
        dark: false,
        colors: {
          primary: '#C5C5C5',
          secondary: '#fff',
          tertiary: '#C5C5C5',
          danger: '#fff',
          background: '#3E6B89',
          card: '#122D42',
          text: '#141414',
          subtext: '#202426',
          separator: '#fff',
          border: '#D9D9D9',
          highlight: '#fcfcfc',
          notification: '#fff',
          topBar: '#122D42',
        },
      };
    case 'blackTheme':
      return {
        dark: true,
        colors: {
          primary: '#1e1e1e',
          secondary: '#fff',
          tertiary: '#898F9C',
          danger: '#fff',
          background: '#121212',
          card: '#181927',
          text: '#fcfcfc',
          subtext: '#fff',
          separator: '#fff',
          border: '#181927',
          highlight: '#fcfcfc',
          notification: '#fff',
          topBar: '#1e1e1e',
        },
      };
    case 'chocolateTheme':
      return {
        dark: false,
        colors: {
          primary: '#524B4E',
          secondary: '#fff',
          tertiary: '#C5C5C5',
          danger: '#fff',
          background: '#26292B',
          card: '#524B4E',
          text: '#f0f0f0',
          subtext: '#C5C5C5',
          separator: '#fff',
          border: '#524B4E',
          highlight: '#fcfcfc',
          notification: '#fff',
          topBar: '#524B4E',
        },
      };
    default:
      return {
        dark: false,
        colors: {
          primary: '#C5C5C5',
          secondary: '#fff',
          tertiary: '#fff',
          danger: '#fff',
          background: '#293241',
          card: '#344051',
          text: '#141414',
          subtext: '#fff',
          separator: '#fff',
          border: '#fff',
          highlight: '#fff',
          notification: '#fff',
          topBar: '#596673',
        },
      };
  }
};

export default getThemePallete;
