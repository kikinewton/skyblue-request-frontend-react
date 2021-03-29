import { makeStyles } from '@material-ui/core';
import React, { FunctionComponent, useContext} from 'react'
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {ITableColumn  } from '../../types/types'
import * as _ from 'lodash'
import useAuthentication from '../../components/hooks/use-authentication';
import { APP_PAGES_AND_ROLES } from '../../utils/constants';
import { AuthUser } from '../../types/types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DepartmentCreatePage from './DepartmentCreatePage';
import EditDepartmentPage from './EditDepartment';
import DepartmentListPage from './DepartmentListPage';
import { UserContext } from '../../context/UserProvider';


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

interface Props{
  authUser: AuthUser
}

const DepartmentIndexPage: FunctionComponent<Props> = ({authUser})=> {
  //lets authorize user
  useAuthentication({roles: APP_PAGES_AND_ROLES.listDepartmentsRoles})

  //router helpers
  const history = useHistory()
  const { path } = useRouteMatch()
  const location = useLocation()

  //states
  const userContext = useContext(UserContext)

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="slide"
        >
          <Switch location={location}>
            <Route path={`${path}/departments/create`}>
              <DepartmentCreatePage authUser={userContext.user} />
            </Route>
            <Route path={`${path}/departments/:departmentId/edit`}>
              <EditDepartmentPage authUser={userContext.user} />
            </Route>
            <Route path={`${path}/departments`}>
              <DepartmentListPage authUser={userContext.user} />
            </Route>
            <Route path={`${path}`}>
              <DepartmentListPage authUser={userContext.user} />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default DepartmentIndexPage;