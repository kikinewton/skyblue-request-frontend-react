import { Card, CardActions, CardContent, CardHeader, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { FunctionComponent, useEffect, useState } from 'react'
import useAuthentication from '../components/hooks/use-authentication'
import { APP_PAGES_AND_ROLES } from '../utils/constants'
import * as dashboardService from '../services/dashboard-service'
import { IRequestPerDepartment } from '../types/types'
import { Pie, PieChart } from 'recharts'

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
  const [requestPerDepartment, setRequestPerDepartment] = useState<IRequestPerDepartment[]>([])
  const [loadinRequestPerDepartment, setLoadingRequestPerDepartment] = useState<boolean>(false)
  const classes = useStyles()

  const fetchRequestPerCurrentMonthPerDepartment = ()=> {
    setLoadingRequestPerDepartment(true)
    dashboardService.requestPerCurrentMonthPerDepartment()
      .then(response => {
        const {status, data} = response
        if(status === 'SUCCESS') {
          setRequestPerDepartment(data)
        }
      })
      .catch(()=> {})
      .finally(()=> {
        setLoadingRequestPerDepartment(false)
      })
  }

  useEffect(()=> {
    fetchRequestPerCurrentMonthPerDepartment()
  }, [])

  return (
    <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={4} lg={4} sm={12} xs={12}>
            <Card className={classes.card}>
              <CardHeader title="Department Request" subheader="This Month"/>
              <CardContent>
                <PieChart width={530} height={100}>
                  <Pie data={requestPerDepartment} dataKey="Num_of_Request" nameKey="Department" />
                </PieChart>
              </CardContent>
              <CardActions disableSpacing>
                <Typography variant="button" color="primary" style={{textDecoration: 'underline', cursor: 'pointer'}}>
                  View All
                </Typography>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={4} lg={4} sm={12} xs={12}>
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
          <Grid item md={4} lg={4} sm={12} xs={12}>
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