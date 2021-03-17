import { Avatar, Divider, Grid, Icon, List, ListSubheader, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import React, { FunctionComponent, SyntheticEvent, useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppProvider';
import { UserContext } from '../context/UserProvider';

// interface Props {

// }

const useStyles = makeStyles(theme=> ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  headerDiv: {
    display: 'flex'
  },
  settingsDiv: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  myAvatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  userField: {
    marginTop: '10px',
    width: '100%'
  }
}))

interface UserPayloadState {
  oldPassword: string
  newPassword: string
}

const SettingsPage: FunctionComponent = ()=> {
  const [page, setPage] = useState<string>('My Settings');
  const [userPayload, setUserPayload] = useState<UserPayloadState>({oldPassword: '', newPassword: ''})
  const appContext = useContext(AppContext)
  const userContext = useContext(UserContext)
  const classes = useStyles()
  const handleThemeToggle = (event: SyntheticEvent)=> {
    console.log(event)
  }

  useEffect(()=> {
    appContext.updateCurrentPage('SETTINGS')
  }, [])

  return(
    <Paper elevation={0} style={{padding: '5px', minHeight: '300px'}}>
      <Grid container spacing={3}>
        <Grid item md={12} lg={12} sm={12} style={{textAlign: 'left'}}>
          <Typography variant="h5" color="textPrimary">
            {page}
          </Typography>
          <Divider />
        </Grid>
        <Grid item md={12} lg={12}>
          <Grid container>
            <Grid item md={6} sm={12} style={{padding: '20px'}}>
              <Grid container spacing={3}>
                <Grid item md={12} sm={12} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                  <Avatar className={classes.myAvatar} style={{width: '40px', height: '40px'}}>
                    {`${userContext.user.firstName[0]}${userContext.user.lastName[0]}`.toUpperCase()}
                  </Avatar>
                </Grid>
                <Grid item sm={12} md={6} >
                  <TextField className={classes.userField} variant="outlined" size="small"
                    label="First Name" value={userContext.user.firstName} disabled />
                </Grid>
                <Grid item sm={12} md={6} >
                  <TextField className={classes.userField} variant="outlined" size="small"
                    label="Last Name" value={userContext.user.lastName} disabled />
                </Grid>
                <Grid item sm={12} md={12} lg={12} xs={12}>
                  <TextField className={classes.userField} variant="outlined" size="small"
                    label="Email" value={userContext.user.email} disabled />
                </Grid>
                <Grid item sm={12} md={12} lg={12} xs={12}>
                  <TextField className={classes.userField} variant="outlined" size="small"
                    label="Phone" value={userContext.user.phoneNumber} disabled />
                </Grid>
                <Grid item sm={12} md={6} lg={6} xs={12}>
                  <TextField className={classes.userField} variant="outlined" size="small"
                    label="Role" value={userContext.user.roles} disabled />
                </Grid>
                <Grid item sm={12} md={6} lg={6} xs={12}>
                  <TextField className={classes.userField} variant="outlined" size="small"
                    label="Department" value={userContext.user.department.name} disabled />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} sm={12}>
              adasdasdadsads
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SettingsPage;