import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, IconButton, LinearProgress } from '@material-ui/core';
import React, { Fragment, FunctionComponent, useState, useEffect, ChangeEvent, MouseEvent, useContext} from 'react'
import {IRequestItem, ISupplier, ITableColumn  } from '../../types/types'
import * as requestService from '../../services/item-request-service'
import { AppContext } from '../../context/AppProvider';
import { formatRequestStatusColor, prettifyDateTime, showErrorAlert, showSuccessAlert } from '../../utils/common-helper';
import { EndorsementStatus } from '../../types/enums';
import { CancelOutlined, CheckCircleTwoTone } from '@material-ui/icons';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { APP_PAGES_AND_ROLES, CURRENCY_CODE } from '../../utils/constants';
import { UserContext } from '../../context/UserProvider';
import useAuthentication from '../../components/hooks/use-authentication';


const tableColumns: ITableColumn[] = [
  {id: 'name', label: 'Name', minWidth: 170, align: 'left'},
  {id: 'quantity', label: 'Quantity', minWidth: 100, align: 'left'},
  {id: 'unitPrice', label: 'Unit Price', minWidth: 100, align: 'left'},
  {id: 'amount', label: 'Amount', minWidth: 100, align: 'left', format: (value)=> `${CURRENCY_CODE} ${value}`},
  {id: 'reason', label: 'Reason', minWidth: 100, align: 'left'},
  {id: 'purpose', label: 'Purpose', minWidth: 100, align: 'left'},
  {id: 'supplier', label: 'Supplier', format: (value: ISupplier)=> {
    return value.name
  }},
  {id: 'requestDate', label: 'Date Requested', minWidth: 100, align: 'left', format: (value: string)=> prettifyDateTime(value)},
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

const GeneralManagerItemRequestListPage: FunctionComponent = ()=> {
  const [requests, setRequests] = useState<IRequestItem[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const MySwal = withReactContent(Swal)
  const classes = useStyles()

  const appContext = useContext(AppContext)
  const userContext = useContext(UserContext)

  const handleChangePage = (event: MouseEvent | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    //const value = event.
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApproveClick = (requestId: number, )=> {
    MySwal.fire({
      title: `Are you sure you want to endorse request?`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      preConfirm: ()=> {
        console.log('left confirm')
        approveRequest(requestId, userContext.user.id as number);
      }
    })
  }

  const handleCancelRequestClick = (id: number)=> {
    MySwal.fire({
      title: `Are you sure you want to Cancel request?`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      preConfirm: ()=> {
        console.log('left confirm')
        cancelRequest(id, userContext.user.id as number);
      }
    })
  }

  const approveRequest = (requestId: number, employeeId: number) => {
    setLoading(true)
    requestService.approveRequest(requestId, employeeId)
      .then(response=> {
        const {status, message} = response
        if(status === 'OK') {
          setRequests(requests.filter(item => item.id != requestId))
          showSuccessAlert('Endorse Request', message)
        } else {
          showErrorAlert('Endorse Request', message)
        }
      })
      .catch(error=> {
        
      })
      .finally(()=> setLoading(false))
  }

  const cancelRequest = (requestId: number, employeeId: number) => {
    setLoading(true)
    requestService.cancelRequest(requestId, employeeId)
      .then(response=> {
        const {status, message} = response
        if(status === 'OK') {
          setRequests(requests.filter(item => item.id != requestId))
          showSuccessAlert('Endorse Request', message)
        } else {
          showErrorAlert('Endorse Request', message)
        }
      })
      .catch(error=> {
        
      })
      .finally(()=> setLoading(false))
  }

  const fetchMyRequests = ()=> {
    console.log('Lets fetch request', userContext.user)
    setLoading(true)
    requestService.getGeneralManagerRequests(userContext.user.id as number)
      .then((response)=> {
        const { status, data } = response
        console.log('res', data)
        if(status === 'OK') {
          setRequests(data)
        }
        console.log('requests', requests)
      })
      .catch(error=> {
        showErrorAlert('My requests', 'Failed to Fetch Requests!')
      })
      .finally(()=> {
        setLoading(false)
      })
  }

  useAuthentication({roles: APP_PAGES_AND_ROLES.generalManagerApproveRoles})
  
  useEffect(() => {
    appContext.updateCurrentPage('GENERAL MANAGER ITEM REQUESTS')
    fetchMyRequests();
    return () => {
      
    }
  }, [])

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}} aria-label="department bar">
        <div className={classes.headerBar}>
          <Typography variant="h6">
            Item Requests
          </Typography>
        </div>
      </Paper>
      
      <Paper elevation={0} style={{padding: '5px', minHeight: '300px', marginTop:'10px'}}>
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
                <TableCell align="right">
                  Actions
                </TableCell>
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
                    <TableCell align="right">
                      <div style={{minWidth: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Button disabled={row.unitPrice <= 0} size="small" disableElevation
                        variant="contained" onClick={()=> handleApproveClick(row.id as number)} style={{backgroundColor: '#30fc19', marginRight: '5px', color: '#ffffff'}}>
                          <CheckCircleTwoTone />
                        </Button>
                        <Button disabled={row.unitPrice <= 0} size="small" disableElevation
                        variant="contained" onClick={()=> handleCancelRequestClick(row.id as number)} style={{backgroundColor: '#fc0b03', color: '#ffffff'}}>
                          <CancelOutlined />
                        </Button>
                      </div>
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

export default GeneralManagerItemRequestListPage;