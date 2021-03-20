import { Avatar, CircularProgress, CssBaseline, FormControlLabel, Grid, makeStyles, TextField, Typography, Button, Box, Paper, Checkbox, Link } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { ChangeEvent, FormEvent, FunctionComponent, SyntheticEvent, useContext, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import backgroungImg from '../assets/images/shopping2.jpg'
import CopyRight from '../components/core/CopyRight';
import { UserContext } from '../context/UserProvider';
import * as authservice from '../services/auth-service'
import { AuthUser, User } from '../types/User';
import { showErrorAlert } from '../utils/common-helper';
import { APP_PAGES_AND_ROLES } from '../utils/constants';

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
  image1: {
    backgroundColor: '#0075c9'
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
  email: string
  password: string
  rememberMe: boolean
}

const LoginPage: FunctionComponent = ()=> {
  const [payload, setPayload] = useState<StateType>({email: '', password: '', rememberMe: false})
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory()
  const { path } = useRouteMatch()
  const MySwal = withReactContent(Swal)

  const userContext = useContext(UserContext)

  const payloadValid = ()=> {
    return payload.email && payload.password
  }

  //handle onChange event on inputs
  const handleInputChange = (event: FormEvent<EventTarget>)=> {
    const target = event.target as HTMLInputElement
    const eventName: string = target.name;
    const value: string = target.value;
    setPayload({...payload, [eventName]: value})
  }

  const handleLoginSubmit = (event: SyntheticEvent)=> {
    event.preventDefault();
    setLoading(true)
    authservice.login(payload)
      .then(response => {
        console.log('res', response)
        const {data, message, status} = response
        if(status === 'SUCCESS') {
          const employee = data.employee as User
          //construct authuser
          const authUser: AuthUser = {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            fullName: employee.fullName,
            email: employee.email,
            phoneNumber: employee.phoneNo,
            roles: employee.roles,
            employeeId: employee.employeeId,
            employeeLevel: employee.employeeLevel,
            department: employee.department,
            createdAt: employee.createdAt,
            token: data.token
          }
          
          window.localStorage.setItem("user", JSON.stringify(authUser));
          userContext.saveUser(authUser)
          if(!authservice.userHasAnyOfRoles(authUser.roles, APP_PAGES_AND_ROLES.dashboardRoles)) {
            return history.push('/request-management/my-requests')
          } else {
            return history.push(`/`)
          }
          
        } else {
          showErrorAlert('Login', message ? message : 'Failed to login!')
        }
      })
      .catch(error => {
        MySwal.fire({
          icon: 'error',
          title: 'Login',
          text: 'Login Failed'
        })
      })
      .finally(()=> {
        setLoading(false)
      })
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
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={payload.email}
              name="email"
              autoComplete="email"
              autoFocus 
            />
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={payload.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value={rememberMe} color="primary" name="remember" onChange={handleInputChange} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || !payloadValid()}
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
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
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

export default LoginPage;