import { Divider, Grid, List, ListSubheader, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { FunctionComponent, SyntheticEvent } from 'react'

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
}))

const SettingsPage: FunctionComponent = ()=> {
  const classes = useStyles()
  const handleThemeToggle = (event: SyntheticEvent)=> {
    console.log(event)
  }

  return(
    <Paper elevation={0} style={{padding: '5px', minHeight: '300px'}}>
      <Grid container spacing={3}>
        <Grid item md={12} lg={12} style={{textAlign: 'left'}}>
          <Typography variant="h5" color="textPrimary">
            My Settings
          </Typography>
          <Divider />
        </Grid>
        <Grid item md={12} lg={12}>
          <List subheader={<ListSubheader>App Settings</ListSubheader>} className={classes.settingsDiv}>

          </List>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SettingsPage;