import { makeStyles } from '@material-ui/core';
import React, { FunctionComponent, useContext, useEffect} from 'react'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import useAuthentication from '../../components/hooks/use-authentication';
import { APP_PAGES_AND_ROLES } from '../../utils/constants';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CreateUserPage from './CreateUserPage';
import EditUserPage from './EditUserPage';
import ListUserPage from './ListUserPage';
import { AppContext } from '../../context/AppProvider';

const useStyles = makeStyles(theme=> ({
  root: {
    width: '100%'
  },
  headerBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tableContainer: {
    maxHeight: 440,
    padding: 10
  }
}))

const UserIndexPage: FunctionComponent = ()=> {
  //lets authorize user
  useAuthentication({roles: APP_PAGES_AND_ROLES.listDepartmentsRoles})

  //router helpers
  const { path } = useRouteMatch()
  const location = useLocation()

  //states
  const appContext = useContext(AppContext)
  const classes = useStyles()

  useEffect(() => {
    appContext.updateCurrentPage('USER MANAGEMENT MODULE')
  }, [])

  return (
    <div className={classes.root}>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="slide"
        >
          <Switch location={location}>
            <Route path={`${path}/create`}>
              <CreateUserPage />
            </Route>
            <Route path={`${path}/:userId/edit`}>
              <EditUserPage />
            </Route>
            <Route path={`${path}`}>
              <ListUserPage />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default UserIndexPage;