import { AppBar, Toolbar } from '@material-ui/core';
import React, { FunctionComponent } from 'react'
import { User } from '../../types/User';

interface HeaderProps {
  user: User
}

const Header: FunctionComponent<HeaderProps> = ({ user }) => {
  console.log('user', user);

  return (
    <AppBar>
      <Toolbar>
        
      </Toolbar>
    </AppBar>
  );

}

export default Header;