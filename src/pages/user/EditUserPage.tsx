import { Button, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, LinearProgress, makeStyles, Paper, Select, TextField, Typography } from '@material-ui/core';
import React, { FormEvent, Fragment, FunctionComponent, SyntheticEvent, useState, useEffect } from 'react'
import BackIcon from '@material-ui/icons/ChevronLeft'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import * as userService from '../../services/user-service'
import * as departmentService from '../../services/department-service'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { UserPayload } from '../../types/payloads';
import { EmployeeLevel, employeeLevels } from '../../types/EmployeeLevel';
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

interface ParamTypes {
  userId: string
}

interface StateType {
  firstName: string
  lastName: string
  email: string
  phoneNo: string
  employeeLevel: EmployeeLevel
  employeeId: string
  departmentId: number | string
}

const EditUserPage: FunctionComponent = ()=> {
  //local states
  const [payload, setPayload] = useState<StateType>(
    {firstName: '', lastName: '', phoneNo: '', email: '', 
    employeeLevel: EmployeeLevel.REGULAR, employeeId: '', departmentId: ''
  })
  const [departments, setDepartments] = useState<IDepartment[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { userId } = useParams<ParamTypes>() //department id from url params

  const history = useHistory()
  const { path } = useRouteMatch()
  const classes = useStyles()

  const MySwal = withReactContent(Swal)

  const handleNavigateBack = ()=> {
    history.goBack()
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
  
  const fetchAllDepartments = () => {
    departmentService.getAllDepartments()
      .then(response=> {
        const {data, status, message} = response
        if(status == 'OK') {
          setDepartments(data)
        }
      })
      .catch(error => {

      })
  }

  const initUser = () => {
    setLoading(true)
    userService.getUser(parseInt(userId))
      .then(response=> {
        const {status, data, message} = response;
        console.log('data', data)
        if(status === 'OK') {
          if(data) {
            setPayload({email: data.email, phoneNo: data.phoneNo, firstName: data.firstName, lastName: data.lastName, departmentId: data.department, employeeId: data.employeeId, employeeLevel: data.employeeLevel})
          } else {
            MySwal.fire({
              icon: 'error',
              title: 'Failed',
              text: 'Department Not Found'
            })
          }
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'Failed',
            text: message ? message : 'Department Not Found'
          })
        }
      })
      .catch(error=> {

      })
      .finally(()=> {
        setLoading(false)
      })
  }

  const handleSubmitEvent = (event: SyntheticEvent)=> {
    event.preventDefault()
    console.log('payload', payload)

    const payloadModel: UserPayload = {
      id: parseInt(userId),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phoneNo: payload.phoneNo,
      employeeId: payload.employeeId,
      employeeLevel: payload.employeeLevel,
      departmentId: payload.departmentId
    }
    userService.updateUser(parseInt(userId), payloadModel)
      .then(response=> {
        const {status, data, message} = response
        if(status == 'CREATED') {
          MySwal.fire({
            icon: 'success',
            title: 'Success',
            text: message ? message : 'Supplier Created Successfully',
            allowOutsideClick: false,
            willClose: ()=> {
              //setPayload({email: '', phoneNo: '', firstName: '', lastName: '', departmentId: '', employeeId: '', employeeLevel: EmployeeLevel.REGULAR})
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
    initUser()
    fetchAllDepartments()
    return () => {
    }
  }, [userId])

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}}>
        <IconButton color="primary" onClick={handleNavigateBack}>
          <BackIcon />
        </IconButton>
      </Paper>
      <Paper elevation={0} style={{padding: '5px', minHeight: '300px', marginTop: '10px', display:'flex', flexDirection: 'column'}}>
        <Typography variant="h5" color="textPrimary">
          Edit Supplier Form
        </Typography>
        <Divider />
        {loading ? <LinearProgress color="secondary" style={{width: '100%'}}/> : null}
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
                Edit Supplier
              </Typography>
            </Button>
          </form>
        </div>
      </Paper>
    </Fragment>
    
  )
}

export default EditUserPage;