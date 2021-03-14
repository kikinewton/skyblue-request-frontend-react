import { Box, Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, IconButton, CircularProgress, LinearProgress } from '@material-ui/core';
import React, { Fragment, FunctionComponent, useState, useEffect, ChangeEvent, MouseEvent, useContext} from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom';
import {IDepartment, ITableColumn  } from '../../types/types'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import * as departmentService from '../../services/department-service'
import { ServerResponse } from 'http';
import { Alert } from '@material-ui/lab';
import {ResponseData} from '../../types/types'
import { faColumns } from '@fortawesome/free-solid-svg-icons';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { AppContext } from '../../context/AppProvider';
import * as _ from 'lodash'

const tableColumns: ITableColumn[] = [
  {id: 'name', label: 'Name', minWidth: 170, align: 'left'},
  {id: 'description', label: 'Description', minWidth: 100, align: 'left'},
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

const initDepartments: IDepartment[] = []

const DepartmentListPage: FunctionComponent = ()=> {
  const [departments, setDepartments] = useState<IDepartment[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  //router helpers
  const history = useHistory()
  const { path } = useRouteMatch()
  const classes = useStyles()

  const appContext = useContext(AppContext)

  const MySwal = withReactContent(Swal)

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

  const handleEdit = (id: number, event: any): void => {
    history.push(`${path}/${id}/edit`)
  }

  const handleDelete = (id: number, event: any): void => {
    MySwal.fire({
      title: `Are you sure you want to delete department?`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      preConfirm: ()=> {
        console.log('left confirm')
        deleteDepartment(id)
      }
    })
    
  }

  const deleteDepartment = (id: number): void => {
    departmentService.deleteDepartment(id)
      .then(response => {
        const {message, status} = response
        setDepartments(departments.filter(dpt => dpt.id != id))
        if(status === 'SUCCESS') {
          MySwal.fire({
            icon: 'success',
            title: 'Success',
            text: message ? message : 'Deleted Successfully!'
          })
        }
      })
      .catch(error=> {

      })
  }

  const fetchAllDepartments = ()=> {
    setLoading(true)
    departmentService.getAllDepartments()
      .then((response)=> {
        const { status, data } = response
        if(status === 'OK') {
          setDepartments(data)
        }
        //return (<Alert severity="error">Hey</Alert>)
        console.log('departments', departments)
      })
      .catch(error=> {
        
      })
      .finally(()=> {
        setLoading(false)
      })
  }

  useEffect(() => {
    appContext.updateCurrentPage('DEPARTMENT')
    fetchAllDepartments();
    return () => {
      
    }
  }, [])

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}} aria-label="department bar">
        <div className={classes.headerBar}>
          <Button variant="contained" color="primary" 
          disableElevation aria-label="Create Department Button" onClick={handleNavigateToCreatePageClick}>
            <Typography variant="button">
              Add Department
            </Typography>
          </Button>
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
                <TableCell
                align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments && departments.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="chckbox" tabIndex={-1} key={row.id}>
                    {tableColumns.map((column) => {
                      const id: any = column.id
                      const value: any = row[column.id as keyof IDepartment]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      )
                    })}
                    <TableCell align="right">
                      <IconButton onClick={(e)=> handleEdit(row.id, e)} size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={(e)=> handleDelete(row.id, e)} size="small">
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
          count={departments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Fragment>
    
  );
}

export default DepartmentListPage;