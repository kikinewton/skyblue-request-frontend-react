import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, IconButton } from '@material-ui/core';
import React, { Fragment, FunctionComponent, useState, useEffect, ChangeEvent, MouseEvent, useContext} from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom';
import {IRequestItem, ITableColumn  } from '../../types/types'
import * as requestService from '../../services/item-request-service'
import * as authService from '../../services/auth-service'
import { AppContext } from '../../context/AppProvider';
import { formatRequestStatusColor, prettifyDateTime, showErrorAlert } from '../../utils/common-helper';
import { AuthUser } from '../../types/User';


const tableColumns: ITableColumn[] = [
  {id: 'name', label: 'Name', minWidth: 170, align: 'left'},
  {id: 'reason', label: 'Reason', minWidth: 100, align: 'left'},
  {id: 'quantity', label: 'Quantity', minWidth: 100, align: 'left'},
  {id: 'endorsement', label: 'Endorsed', minWidth: 100, align: 'left'},
  {id: 'requestDate', label: 'Date Requested', minWidth: 100, align: 'left', format: (value: string)=> prettifyDateTime(value)},
  {id: 'status', label: 'Status', minWidth: 100, align: 'left'},
]

const useStyles = makeStyles(theme=> ({
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

const initDepartments: IRequestItem[] = []

const HODItemRequestListPage: FunctionComponent = ()=> {
  const [requests, setRequests] = useState<IRequestItem[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  //router helpers
  const history = useHistory()
  const { path } = useRouteMatch()
  const classes = useStyles()

  const authUser = authService.getUserDetailsFromStorage() as AuthUser;

  const appContext = useContext(AppContext)

  const handleNavigateToCreatePageClick = ()=> {
    history.push(`${path}/create`)
  }

  const handleChangePage = (event: MouseEvent | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    //const value = event.
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const fetchMyRequests = ()=> {
    setLoading(true)
    requestService.getAllDepartmentItemRequests(authUser.department.id as number, authUser.id as number)
      .then((response)=> {
        const { status, data } = response
        console.log('res', data)
        if(status === 'FOUND') {
          setRequests(data)
        }
        //return (<Alert severity="error">Hey</Alert>)
        console.log('requests', requests)
      })
      .catch(error=> {
        showErrorAlert('My requests', 'Failed to Fetch Requests!')
      })
      .finally(()=> {
        setLoading(false)
      })
  }

  useEffect(() => {
    console.log('hey') 
    appContext.updateCurrentPage('HOD ITEM REQUESTS')
    fetchMyRequests();
    return () => {
      
    }
  }, [])

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}} aria-label="department bar">
        <div className={classes.headerBar}>
          <Typography variant="h6">
            My Requests
          </Typography>
          <Button variant="contained" color="primary" 
            disableElevation aria-label="Create Department Button" onClick={handleNavigateToCreatePageClick}>
            <Typography variant="button">
              New Request
            </Typography>
          </Button>
        </div>
      </Paper>
      
      <Paper elevation={0} style={{padding: '5px', minHeight: '300px', marginTop:'10px'}}>
        <TableContainer className={classes.tableContainer}>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {requests && requests.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {tableColumns.map((column) => {
                      const id: any = column.id
                      const value: any = row[column.id as keyof IRequestItem]
                      const formatedValue = column.format ? column.format(value) : value
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'status' ? <span style={{backgroundColor: formatRequestStatusColor(value), padding: '5px', borderRadius: '10px', color: '#ffffff'}}>{formatedValue}</span> : formatedValue}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Fragment>
    
  );
}

export default HODItemRequestListPage;