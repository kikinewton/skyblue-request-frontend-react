import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, 
  TableRow, Typography, IconButton, LinearProgress, Fab } from '@material-ui/core';
import React, { Fragment, FunctionComponent, useState, useEffect, ChangeEvent, MouseEvent, useContext} from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom';
import {ITableColumn, IUser  } from '../../types/types'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import * as userService from '../../services/user-service'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { AppContext } from '../../context/AppProvider';
import useAuthentication from '../../components/hooks/use-authentication';
import { APP_PAGES_AND_ROLES } from '../../utils/constants';
import { userHasAnyOfRoles } from '../../services/auth-service';
import { UserContext } from '../../context/UserProvider';
import { Add } from '@material-ui/icons';


const tableColumns: ITableColumn[] = [
  {id: 'fullName', label: 'Name', minWidth: 170, align: 'left', format: (name: string)=> name.toUpperCase()},
  {id: 'phoneNo', label: 'Phone', minWidth: 170, align: 'left'},
  {id: 'email', label: 'Email', minWidth: 170, align: 'left'},
  {id: 'department', label: 'Department', minWidth: 100, align: 'left', format: (value: any) => (value || {}).name},
  {id: 'roles', label: 'Role', minWidth: 100, align: 'left'},
  {id: 'enabled', label: 'Status', align: 'left', format: (value: string)=> value ? 'Active' : 'Disabled'},
]

const useStyles = makeStyles(theme=> ({
  headerBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  tableContainer: {
    maxHeight: 440,
    padding: 10
  }
}))

const ListUserPage: FunctionComponent = ()=> {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  //lets authenticate and authorize roles
  useAuthentication({roles: APP_PAGES_AND_ROLES.listUserRoles})

  //states
  const appContext = useContext(AppContext)
  const userContext = useContext(UserContext)
  //let authorize use

  //router helpers
  const history = useHistory()
  const { path } = useRouteMatch()
  const classes = useStyles()

  const MySwal = withReactContent(Swal)

  const handleNavigateToCreatePageClick = ()=> {
    history.push(`${path}/create`)
  }

  const handleChangePage = (event: MouseEvent | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id: number, event: any): void => {
    history.push(`${path}/${id}/edit`)
  }

  const handleDelete = (id: number, event: any): void => {
    MySwal.fire({
      title: `Are you sure you want to delete supplier?`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      preConfirm: ()=> {
        console.log('left confirm')
        deleteUser(id)
      }
    })
    
  }

  const deleteUser = (id: number): void => {
    setLoading(true)
    userService.deleteUser(id)
      .then(response => {
        const {message, status} = response
        if(status === 'OK') {
          setUsers(users.filter(user => user.id !== id))
          MySwal.fire({
            icon: 'success',
            title: 'Success',
            text: message ? message : 'Deleted Successfully!'
          })
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'Failed',
            text: message ? message : 'Delete Failed!'
          })
        }
      })
      .catch(error=> {

      })
      .finally(()=> {
        setLoading(false)
      })
  }

  const fetchAllUsers = ()=> {
    setLoading(true)
    userService.getAllUsers()
      .then((response)=> {
        //if(response.status == 'OK') {}
        const { status, data } = response
        if(status === 'SUCCESS') {
          setUsers(data)
        }
      })
      .catch(error=> {
        
      })
      .finally(()=> {
        setLoading(false)
      })
  }

  useEffect(() => {
    appContext.updateCurrentPage('USERS')
    fetchAllUsers();
  }, [])

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}} aria-label="department bar">
        <div className={classes.headerBar}>
          {userHasAnyOfRoles(userContext.user.roles, APP_PAGES_AND_ROLES.createUserRoles) ? <Fab size="small" color="primary" 
          aria-label="Create Department Button" onClick={handleNavigateToCreatePageClick}>
            <Add />
          </Fab> : null}
        </div>
      </Paper>
      
      <Paper elevation={0} style={{padding: '5px', minHeight: '300px', marginTop:'10px', position: 'relative'}}>
        <TableContainer className={classes.tableContainer}>
          {loading ? <LinearProgress color="secondary" style={{width: '100%'}}/> : null}
          <Table stickyHeader aria-label="list of departments table">
            <TableHead>
              <TableRow>
                {tableColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{minWidth: column.minWidth}}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="chckbox" tabIndex={-1} key={row.id}>
                    {tableColumns.map((column) => {
                      const value: any = row[column.id as keyof IUser]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) || '--' : value || '--'}
                        </TableCell>
                      )
                    })}
                    <TableCell align="right">
                      <IconButton onClick={(e)=> handleEdit(row.id, e)} size="small" disabled={loading}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={(e)=> handleDelete(row.id, e)} size="small" disabled={loading}>
                        <DeleteIcon fontSize="small"/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Fragment>
    
  );
}

export default ListUserPage;