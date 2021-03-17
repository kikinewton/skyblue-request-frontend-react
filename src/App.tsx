import React, { useContext } from 'react';
import 'fontsource-roboto';
import './App.css';
import AppLayout from './components/layouts/AppLayout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from '@material-ui/core';
import { darkTheme, lightTheme } from './utils/theme';
import AppProvider, { AppContext } from './context/AppProvider';
import UserProvider from './context/UserProvider';
import { LIGHT_THEME_MODE } from './utils/constants';
import NotAuthorizedPage from './pages/NotAuthorizedPage';

function App() {

  const appContext = useContext(AppContext)
  
  const themeData = appContext.theme == LIGHT_THEME_MODE ? lightTheme : darkTheme;
  console.log('theme data', themeData)
  return (
    <AppProvider>
      <ThemeProvider theme={themeData}>
        <UserProvider>
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
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
