import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, IconButton, LinearProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, ListItem, List, ListItemText, FormControl, InputLabel, Select, CircularProgress } from '@material-ui/core';
import React, { Fragment, FunctionComponent, useState, useEffect, ChangeEvent, MouseEvent, useContext, SyntheticEvent, FormEvent} from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom';
import {IRequestItem, ISupplier, ITableColumn  } from '../../types/types'
import * as requestService from '../../services/item-request-service'
import * as authService from '../../services/auth-service'
import * as supplierService from '../../services/supplier-service'
import { AppContext } from '../../context/AppProvider';
import { formatRequestStatusColor, prettifyDateTime, showErrorAlert, showSuccessAlert } from '../../utils/common-helper';
import { AuthUser } from '../../types/User';
import { EndorsementStatus } from '../../types/enums';
import { CheckCircleTwoTone } from '@material-ui/icons';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { ProcurementActOnRequestPayload } from '../../types/payloads';


const tableColumns: ITableColumn[] = [
  {id: 'name', label: 'Name', minWidth: 170, align: 'left'},
  {id: 'quantity', label: 'Quantity', minWidth: 100, align: 'left'},
  {id: 'reason', label: 'Reason', minWidth: 100, align: 'left'},
  {id: 'requestDate', label: 'Date Requested', minWidth: 100, align: 'left', format: (value: string)=> prettifyDateTime(value)},
  {id: 'endorsement', label: 'Endorsed', minWidth: 100, align: 'left'}
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
  },
  textField: {
    marginBottom: '20px'
  }
}))

interface EntryState {
  id: any
  name: string
  reason: string
  purpose: string
  quantity: number
  supplierId: any
  unitPrice: number
}

const initRequest = {id: null, name: '', reason: '', quantity: 0, unitPrice: 0, supplierId: '', purpose: ''}

const ProcurmentOfficerRequestListPage: FunctionComponent = ()=> {
  const [requests, setRequests] = useState<IRequestItem[]>([])
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [entry, setEntry] = useState<EntryState>(initRequest)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [suppliers, setSuppliers] = useState<ISupplier[]>([])

  const MySwal = withReactContent(Swal)

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

  const handleAssignClick = (request: IRequestItem)=> {
    const reason: EntryState = {id: request.id, name: request.name, reason: request.reason, purpose: request.purpose, quantity: request.quantity, unitPrice: 0, supplierId: suppliers[0].id}
    setEntry(reason)
    handleOpenDialog()
  }

  const handleOpenDialog = ()=> {
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setEntry({...initRequest, supplierId: suppliers[0].id})
    setDialogOpen(false)
  }

  const handleAddEntry = ()=> {
    const supplier = suppliers.find(supplier=> supplier.id == entry.supplierId) as ISupplier
    console.log('supplier', supplier)
    const payload: ProcurementActOnRequestPayload = {
      supplier: supplier,
      unitPrice: Number(entry.unitPrice)
    }
    setSubmitLoading(true)
    requestService.procurementActOnRequest(entry.id, payload)
      .then(response => {
        const {status, message} = response
        if(status === 'OK') {
          setRequests(requests.filter(rq=> rq.id != entry.id))
          handleCloseDialog()
          showSuccessAlert('Success', message)
        } else {
          handleCloseDialog()
          showErrorAlert('Procurement', message)
        }
      })
      .catch(error => {
        handleCloseDialog()
      })
      .finally(()=> {
        setSubmitLoading(false)
      })
  }
  const handleCancelEntry = ()=> {
    handleCloseDialog()
  }

  const handleInputChange = (event: FormEvent<EventTarget>)=> {
    const target = event.target as HTMLInputElement
    const eventName: string = target.name;
    const value: string = target.value;
    setEntry({...entry, [eventName]: value})
  }

  const handleSelectChange = (event: any) => {
    const target = event.target
    const eventName: string = target.name
    console.log('event', event.target.value)
    setEntry({...entry, [eventName]: target.value})
  }

  const fetchMyRequests = ()=> {
    setLoading(true)
    requestService.getEndorsedRequestItems(authUser.id as number)
      .then((response)=> {
        const { status, data } = response
        console.log('res', data)
        if(status === 'FOUND') {
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

  const fetchSuppliers = ()=> {
    supplierService.getAllSuppliers()
      .then(response => {
        const {status, data} = response
        if(status==='SUCCESS') {
          setSuppliers(data)
          setEntry({...entry, supplierId: data[0].id})
        }
      })
      .catch(error=> {})
      .finally(()=> {

      })
  }

  useEffect(() => {
    appContext.updateCurrentPage('ENDORSED ITEM REQUEST')
    fetchMyRequests();
    fetchSuppliers()
  }, [])

  const disableButton = (row: IRequestItem): boolean => {
    return (row.endorsement != EndorsementStatus.ENDORSED) || row.unitPrice > 0
  }

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}} aria-label="department bar">
        <div className={classes.headerBar}>
          <Typography variant="h6">
            Endorsed Requests
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
                      <Button disabled={disableButton(row)} size="small" disableElevation
                      variant="contained" onClick={()=> handleAssignClick(row)} style={{backgroundColor: disableButton(row) ? '#e3e1e1' :'#30fc19', marginRight: '5px', color: '#ffffff'}}>
                        <CheckCircleTwoTone />
                      </Button>
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
      <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title" disableBackdropClick={true}>
        <DialogTitle id="form-dialog-title">Procurement Form</DialogTitle>
        <DialogContent>
          <div style={{width: '400px'}}>
              <List>
                <ListItem>
                  <ListItemText primary="Item" secondary={entry.name}/>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Reason" secondary={entry.reason}/>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Purpose" secondary={entry.purpose}/>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Quantity" secondary={entry.quantity}/>
                </ListItem>
              </List>
              <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <FormControl variant="outlined" className={classes.textField}>
                  <InputLabel htmlFor="outlined-age-native-simple">Supplier</InputLabel>
                  <Select
                    native
                    value={entry.supplierId}
                    onChange={handleSelectChange}
                    label="Supplier"
                    name="supplierId"
                  >
                    {suppliers && suppliers.map((supplier)=> {
                      return (
                        <option value={supplier.id} key={supplier.id}>{supplier.name}</option>
                      )
                    })}
                  </Select>
                </FormControl>
                <TextField
                type="number"
                label="Unit Price"
                variant="outlined"
                name="unitPrice"
                value={entry.unitPrice}
                onChange={handleInputChange}
                className={classes.textField}
                />
              </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEntry} color="primary" disabled={submitLoading}>
            <Typography variant="button">
              Cancel
            </Typography>
          </Button>
          <Button onClick={handleAddEntry} color="primary" disabled={submitLoading}>
            {submitLoading ? <CircularProgress /> : null}
            <Typography variant="button">
              Submit
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
    
  );
}

export default ProcurmentOfficerRequestListPage;