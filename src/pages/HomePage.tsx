import { Card, CardActions, CardContent, CardHeader, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import useAuthentication from '../components/hooks/use-authentication'
import { APP_PAGES_AND_ROLES } from '../utils/constants'

const useStyles = makeStyles(theme=> ({
  root: {
    width: '100%',
    // display: 'flex',
    // flexDirection: 'column'
  },
  card: {
    width: '100%'
  }
}))
const HomePage: FunctionComponent = (props)=> {
  useAuthentication({roles: APP_PAGES_AND_ROLES.dashboardRoles})
  const classes = useStyles()

  return (
    <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Card className={classes.card}>
              <CardHeader title="Number of Users" subheader="Total Users"/>
              <CardContent>
                <Typography variant="h3" align="left">
                    101
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Typography variant="button" color="primary" style={{textDecoration: 'underline', cursor: 'pointer'}}>
                  View All
                </Typography>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={3} lg={3} sm={12} xs={12}>
            <Card className={classes.card}>
              <CardHeader title="Number of Users" subheader="Total Users"/>
              <CardContent>
                <Typography variant="h3" align="left">
                    101
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Typography variant="button" color="primary" style={{textDecoration: 'underline', cursor: 'pointer'}}>
                  View All
                </Typography>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <Card className={classes.card}>
              <CardHeader title="Number of Users" subheader="Total Users"/>
              <CardContent>
                <Typography variant="h3" align="left">
                    101
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Typography variant="button" color="primary" style={{textDecoration: 'underline', cursor: 'pointer'}}>
                  View All
                </Typography>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={12} lg={12} sm={12} xs={12}>
            <Card className={classes.card}>
              <CardHeader title="Number of Users" subheader="Total Users"/>
              <CardContent>
                <Typography variant="h3" align="left">
                    101
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Typography variant="button" color="primary" style={{textDecoration: 'underline', cursor: 'pointer'}}>
                  View All
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
    </div>
  )
}

export default HomePage