import React, { useContext } from 'react';
import 'fontsource-roboto';
import './App.css';
import AppLayout from './components/layouts/AppLayout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { darkTheme, lightTheme } from './utils/theme';
import AppProvider, { AppContext } from './context/AppProvider';
import UserProvider from './context/UserProvider';
import { LIGHT_THEME_MODE } from './utils/constants';
import NotAuthorizedPage from './pages/NotAuthorizedPage';

function App() {

  const appContext = useContext(AppContext)

  
  console.log('APP CONTEXT THEME', appContext.theme)
  
  const themeData = appContext.theme === 'light' ? createMuiTheme(lightTheme) : createMuiTheme(darkTheme);
  return (
    <ThemeProvider theme={themeData}>
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <AppLayout />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
