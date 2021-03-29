import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, IconButton, LinearProgress } from '@material-ui/core';
import React, { Fragment, FunctionComponent, useState, useEffect, ChangeEvent, MouseEvent, useContext} from 'react'
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {IDepartment, ITableColumn  } from '../../types/types'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import * as departmentService from '../../services/department-service'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { AppContext } from '../../context/AppProvider';
import * as _ from 'lodash'
import useAuthentication from '../../components/hooks/use-authentication';
import { APP_PAGES_AND_ROLES } from '../../utils/constants';
import { userHasAnyOfRoles } from '../../services/auth-service';
import { AuthUser } from '../../types/User';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DepartmentCreatePage from './DepartmentCreatePage';
import EditDepartmentPage from './EditDepartment';
import DepartmentListPage from './DepartmentListPage';
import { UserContext } from '../../context/UserProvider';

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