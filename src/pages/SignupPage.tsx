import { Avatar, CircularProgress, CssBaseline, FormControlLabel, Grid, makeStyles, TextField, Typography, Button, Box, Paper, Checkbox, Link } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { ChangeEvent, FormEvent, FunctionComponent, SyntheticEvent, useState } from 'react'
import backgroungImg from '../assets/images/shopping2.jpg'
import CopyRight from '../components/core/CopyRight';
import { EmployeeLevel } from '../types/EmployeeLevel';

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
}));


interface StateType {
  firstName: string
  lastName: string
  email: string
  phoneNo: string
  password: string
  employeeLevel: EmployeeLevel
  employeeId: string
  departmentId: number | string
}

const SignupPage: FunctionComponent = ()=> {

  const [payload, setPayload] = useState<StateType>({ firstName: '', lastName: '', email: '', phoneNo: '', 
      password: '', employeeLevel: EmployeeLevel.REGULAR, employeeId: '', departmentId: '' })
  
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

  const handleLoginSubmit = (e: SyntheticEvent)=> {
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
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleLoginSubmit}>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              color="primary"
              className={classes.submit}
            >
              { 
                loading &&
                <CircularProgress size={25} style={{marginRight: '35px'}} color="secondary" />
              }
              
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  {"You have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <CopyRight />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default SignupPage;