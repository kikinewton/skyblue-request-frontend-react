import { ThemeOptions } from "@material-ui/core"

export const lightTheme: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#0075c9',
      dark: '#f4f3ef',
      light: '#f4f3ef'
    },
    secondary: {
      main: '#ff9e00',
      dark: '#ff9e00',
      light: '#ff9e00'
    },
    background: {
      default: '#dae0e6',
    }
  }
}

export const darkTheme: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#0075c9',
      dark: '#1a1a1b',
      light: '#1a1a1b'
    },
    background: {
      default: '#303030',
      paper: '#424242'
    },
    secondary: {
      main: '#ff9e00',
      dark: '#ff9e00',
      light: '#ff9e00'
    },
  }
}