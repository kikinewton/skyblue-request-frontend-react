import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Icon, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, makeStyles, Paper, Switch, TextField, ThemeProvider, Typography, useTheme } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { Settings } from '@material-ui/icons';
import React, { FormEvent, FunctionComponent, SyntheticEvent, useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppProvider';
import { UserContext } from '../context/UserProvider';
import { storeThemeInLocalStorage } from '../utils/common-helper';
import { DARK_THEME_MODE, LIGHT_THEME_MODE } from '../utils/constants';

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
  },
  textField: {
    marginBottom: '20px'
  }
}))

interface UserPayloadState {
  oldPassword: string
  newPassword: string
}

const SettingsPage: FunctionComponent = ()=> {
  const [page, setPage] = useState<string>('My Settings');
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState<boolean>(false)
  const [userPayload, setUserPayload] = useState<UserPayloadState>({oldPassword: '', newPassword: ''})
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const appContext = useContext(AppContext)
  const userContext = useContext(UserContext)
  const themeContext = useTheme()
  const classes = useStyles()
  const handleThemeToggle = (event: SyntheticEvent)=> {
    console.log(event)
  }
  const handleSubmitChangePassword = ()=> {
    console.log('payload', userPayload)
  }

  const handleDarkModeSwitch = (event: any)=> {
    const value = event.target.checked
    const theme = value ? DARK_THEME_MODE : LIGHT_THEME_MODE
    storeThemeInLocalStorage(theme)
    appContext.updateTheme(theme)
  }

  const handleOpenChangePasswordDialog = ()=> {
    setUserPayload({oldPassword: '', newPassword: ''})
    setChangePasswordDialogOpen(true)
  }

  const handleCloseChangePasswordDialog = ()=> {
    setChangePasswordDialogOpen(false)
  }

  const handleInputChange = (event: FormEvent<EventTarget>)=> {
    const target = event.target as HTMLInputElement
    const eventName: string = target.name;
    const value: string = target.value;
    setUserPayload({...userPayload, [eventName]: value})
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
                <Grid item sm={12} md={12} xs={12}>
                  <Button variant="outlined" onClick={handleOpenChangePasswordDialog}>
                    <Typography variant="button">
                      Change Password
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} sm={12} style={{padding: '20px'}}>
              <Grid container>
                <Grid item md={12}>
                  <Typography variant="h6" align="center">
                    General Settings
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <List>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Dark Model"/>
                      <ListItemSecondaryAction>
                        <Switch
                          edge="end"
                          onChange={handleDarkModeSwitch}
                          checked={appContext.theme === DARK_THEME_MODE}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={changePasswordDialogOpen} onClose={handleCloseChangePasswordDialog} aria-labelledby="form-dialog-title" disableBackdropClick={true}>
        <DialogTitle id="form-dialog-title">Change Password Form</DialogTitle>
        <DialogContent>
          <div style={{width: '400px'}}>
              <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <TextField
                type="password"
                label="Old Password"
                variant="outlined"
                name="oldPassword"
                value={userPayload.oldPassword}
                onChange={handleInputChange}
                className={classes.textField}
                />
                <TextField
                type="password"
                label="New Password"
                variant="outlined"
                name="newPassword"
                value={userPayload.newPassword}
                onChange={handleInputChange}
                className={classes.textField}
                />
              </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePasswordDialog} color="primary" disabled={submitLoading}>
            <Typography variant="button">
              Cancel
            </Typography>
          </Button>
          <Button onClick={handleSubmitChangePassword} color="primary" disabled={submitLoading}>
            {submitLoading ? <CircularProgress /> : null}
            <Typography variant="button">
              Submit
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default SettingsPage;