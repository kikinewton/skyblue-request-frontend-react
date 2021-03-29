import { makeStyles } from '@material-ui/core';
import React, { FunctionComponent, useContext, useEffect} from 'react'
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {ITableColumn  } from '../../types/types'
import * as _ from 'lodash'
import useAuthentication from '../../components/hooks/use-authentication';
import { APP_PAGES_AND_ROLES } from '../../utils/constants';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { UserContext } from '../../context/UserProvider';
import { AppContext } from '../../context/AppProvider';
import SettingsPage from '../SettingsPage';

const tableColumns: ITableColumn[] = [
  {id: 'name', label: 'Name', minWidth: 170, align: 'left'},
  {id: 'description', label: 'Description', minWidth: 100, align: 'left'},
]

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

const SettingsIndexPage: FunctionComponent = ()=> {
  //lets authorize user
  useAuthentication({roles: APP_PAGES_AND_ROLES.listDepartmentsRoles})

  //router helpers
  const { path } = useRouteMatch()
  const location = useLocation()

  //states
  const userContext = useContext(UserContext)
  const appContext = useContext(AppContext)
  const classes = useStyles()


  useEffect(() => {
    appContext.updateCurrentPage('ITEM REQUEST MANAGEMENT')
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
            <Route path={`${path}`} component={SettingsPage}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default SettingsIndexPage;