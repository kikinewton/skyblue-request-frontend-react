import { Button, Divider, FormControl, Grid, IconButton, InputLabel, makeStyles, Paper, Select, TextField, Typography } from '@material-ui/core';
import React, { FormEvent, Fragment, FunctionComponent, SyntheticEvent, useEffect, useState } from 'react'
import BackIcon from '@material-ui/icons/ChevronLeft'
import { useHistory } from 'react-router-dom';
import * as userService from '../../services/user-service'
import * as departmentService from '../../services/department-service'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { EmployeeLevel, employeeLevels } from '../../types/EmployeeLevel';
import { UserPayload } from '../../types/payloads';
import { IDepartment } from '../../types/types';

const useStyles = makeStyles(theme=> ({
  root: {

  },
  form: {
    width: '70%',
    padding: '20px',
    marginTop: '40px',
  },
  textField: {
    width: '100%',
    marginBottom: '20px'
  }

}));

interface StateType {
  firstName: string
  lastName: string
  email: string
  phoneNo: string
  employeeLevel: EmployeeLevel
  employeeId: string
  departmentId: number | string
}

const CreateUserPage: FunctionComponent = ()=> {
  const [payload, setPayload] = useState<StateType>(
    {firstName: '', lastName: '', phoneNo: '', email: '', 
    employeeLevel: EmployeeLevel.REGULAR, employeeId: '', departmentId: ''
  })

  const [departments, setDepartments] = useState<IDepartment[]>([])

  const history = useHistory()
  const classes = useStyles()

  const MySwal = withReactContent(Swal)

  const handleNavigateBack = ()=> {
    history.goBack()
  }

  const fetchAllDepartments = () => {
    departmentService.getAllDepartments()
      .then(response=> {
        const {data, status, message} = response
        if(status == 'OK') {
          setDepartments(data)
          setPayload({...payload, departmentId: data[0].id})
        }
      })
      .catch(error => {

      })
  }

  const handleInputChange = (event: FormEvent<EventTarget>)=> {
    const target = event.target as HTMLInputElement
    const eventName: string = target.name;
    const value: string = target.value;
    setPayload({...payload, [eventName]: value})
  }

  const handleSelectChange = (event: any) => {
    const target = event.target
    const eventName: string = target.name
    console.log('event', event.target.value)
    setPayload({...payload, [eventName]: target.value})
  }

  const handleSubmitEvent = (event: SyntheticEvent)=> {
    event.preventDefault()
    console.log('payload', payload)
    const department: any = departments.find(item=> item.id == payload.departmentId)

    const myPayload: UserPayload = {
      email: payload.email,
      phoneNo: payload.phoneNo,
      firstName: payload.firstName,
      lastName: payload.lastName,
      departmentId: payload.departmentId,
      employeeLevel: payload.employeeLevel,
      employeeId: payload.employeeId,
      department: department
    }

    userService.saveUser(myPayload)
      .then(response=> {
        const {status, data, message} = response
        if(status == 'OK') {
          MySwal.fire({
            icon: 'success',
            title: 'Success',
            text: message ? message : 'User Created Successfully',
            allowOutsideClick: false,
            willClose: ()=> {
              setPayload({email: '', phoneNo: '', firstName: '', lastName: '', departmentId: '', employeeId: '', employeeLevel: EmployeeLevel.REGULAR})
            }
          })
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'Failed!',
            text: message ? message : 'failed'
          })
        }
      })
      .catch(error=> {
        
      })
  }

  useEffect(() => {
    fetchAllDepartments()
    return () => {
      
    }
  }, [])

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}}>
        <IconButton color="primary" onClick={handleNavigateBack}>
          <BackIcon />
        </IconButton>
      </Paper>
      <Paper elevation={0} style={{padding: '5px', minHeight: '300px', marginTop: '10px', display:'flex', flexDirection: 'column'}}>
        <Typography variant="h5" color="textPrimary">
          Create User Form
        </Typography>
        <Divider />
        <div style={{width:'100%', display:'flex', justifyContent: 'center'}}>
          <form className={classes.form} autoComplete="off" onSubmit={handleSubmitEvent}>
            <TextField id="firstName" label="First Name" name="firstName" value={payload.firstName}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="lastName" label="Last Name" name="lastName" value={payload.lastName}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="phoneNo" label="Phone" name="phoneNo" value={payload.phoneNo}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="email" label="Email" name="email" value={payload.email}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="email" label="Employee ID" name="employeeId" value={payload.employeeId}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel htmlFor="outlined-age-native-simple">Department</InputLabel>
              <Select
                native
                value={payload.departmentId}
                onChange={handleSelectChange}
                label="Department"
                name="departmentId"
              >
                {departments && departments.map((department)=> {
                  return (
                    <option value={department.id} key={department.id}>{department.name}</option>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel htmlFor="outlined-age-native-simple">LEVEL</InputLabel>
              <Select
                native
                value={payload.employeeLevel}
                onChange={handleSelectChange}
                label="Employee Level"
                name="employeeLevel"
              >
                {employeeLevels.map((level)=> {
                  return (
                    <option value={level.id} key={level.id}>{level.label}</option>
                  )
                })}
              </Select>
            </FormControl>
            <Button variant="contained" color="secondary" style={{float: 'right'}} type="submit">
              <Typography variant="button">
                Create User
              </Typography>
            </Button>
          </form>
        </div>
      </Paper>
    </Fragment>
    
  )
}

export default CreateUserPage;