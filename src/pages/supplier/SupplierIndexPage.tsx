import { makeStyles } from '@material-ui/core';
import React, { FunctionComponent, useContext} from 'react'
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {ITableColumn  } from '../../types/types'
import * as _ from 'lodash'
import useAuthentication from '../../components/hooks/use-authentication';
import { APP_PAGES_AND_ROLES } from '../../utils/constants';
import { AuthUser } from '../../types/types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { UserContext } from '../../context/UserProvider';
import CreateSupplierPage from './CreateSupplierPage';
import EditSupplierPage from './EditSupplierPage';
import SupplierListPage from './SupplierListPage';

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

const SupplierIndexPage: FunctionComponent = ()=> {
  //lets authorize user
  useAuthentication({roles: APP_PAGES_AND_ROLES.listDepartmentsRoles})

  //router helpers
  const history = useHistory()
  const { path } = useRouteMatch()
  const location = useLocation()

  //states
  const userContext = useContext(UserContext)
  console.log(userContext.user)

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
            <Route path={`${path}/create`}>
              <CreateSupplierPage authUser={userContext.user} />
            </Route>
            <Route path={`${path}/:supplierId/edit`}>
              <EditSupplierPage authUser={userContext.user} />
            </Route>
            <Route path={`${path}`}>
              <SupplierListPage authUser={userContext.user} />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default SupplierIndexPage;