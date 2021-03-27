import { Avatar, CircularProgress, CssBaseline, FormControlLabel, Grid, makeStyles, TextField, Typography, Button, Box, Paper, Checkbox, Link, InputLabel, Select, FormControl } from '@material-ui/core';
import { CheckCircleOutlineTwoTone, CheckTwoTone, LockOutlined, PersonAdd } from '@material-ui/icons';
import React, { ChangeEvent, FormEvent, FunctionComponent, SyntheticEvent, useState } from 'react'
import backgroungImg from '../assets/images/shopping2.jpg'
import CopyRight from '../components/core/CopyRight';
import { EmployeeLevel } from '../types/EmployeeLevel';
import { IDepartment } from '../types/types';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${backgroungImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
  password: string
  departmentId: number | string
  confirmPassword: string
}

const SignupPage: FunctionComponent = ()=> {

  const [payload, setPayload] = useState<StateType>({ firstName: '', lastName: '', email: '', phoneNo: '', password: '', confirmPassword: '', departmentId: '' })
  const [departments, setDepartments] = useState<IDepartment[]>([])
  
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

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

  const handleSignupSubmit = (e: SyntheticEvent)=> {
    e.preventDefault();
    setLoading(true)
    
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} autoComplete="off" onSubmit={handleSignupSubmit} autoCorrect="off">
            <TextField id="firstName" label="First Name" name="firstName" value={payload.firstName}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="lastName" label="Last Name" name="lastName" value={payload.lastName}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="phoneNo" label="Phone" name="phoneNo" value={payload.phoneNo}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="email" label="Email" name="email" value={payload.email} autoComplete="off"
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
            <TextField id="password" label="Password" name="password" value={payload.password} type="password"
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="confirmPassword" label="Confirm Password" name="confirmPassword" value={payload.confirmPassword} type="password"
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <Button variant="contained" color="secondary" style={{float: 'right'}} type="submit">
              {loading ? <CircularProgress /> : null }
              <CheckTwoTone />
              <Typography variant="button">
                Sign Up
              </Typography>
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default SignupPage;