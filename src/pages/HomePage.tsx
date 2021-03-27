import { Card, CardActions, CardContent, CardHeader, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { FunctionComponent, useEffect, useState } from 'react'
import useAuthentication from '../components/hooks/use-authentication'
import { APP_PAGES_AND_ROLES } from '../utils/constants'
import * as dashboardService from '../services/dashboard-service'
import { IRequestPerDepartment } from '../types/types'
import { Pie, PieChart } from 'recharts'
import FusionCharts from 'fusioncharts'
import ReactFC from 'react-fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import Column2D from "fusioncharts/fusioncharts.charts";

// ReactFC.fcRoot(FusionCharts, Charts, FusionTheme)
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

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

const chartConfigs: any = {
  type: 'column2d',
  width: 600,
  height: 260,
  dataFormat: 'json',
  dataSource: {

  }
}
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
        if(status === 'OK') {
          setRequestPerDepartment(data)
          console.log('data', requestPerDepartment)
        }
      })
      .catch(()=> {})
      .finally(()=> {
        setLoadingRequestPerDepartment(false)
      })
  }

  const requestPerDepartmentDataSource = ()=> {
    let dataObject: any = {}
    const chart: any = {
      showpercentvalues: "1",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1",
      theme: "fusion"
    }
    const data: any = requestPerDepartment.map(rq=> {
      return {
        label: rq.department,
        value: rq.num_of_Request
      }
    }) 
    dataObject.chart = chart
    dataObject.data = data;
    return dataObject
  }

  useEffect(()=> {
    fetchRequestPerCurrentMonthPerDepartment()
  }, [])

  return (
    <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <Card className={classes.card}>
              <CardHeader title="Department Request" subheader="This Month"/>
              <CardContent>
                <ReactFC type="pie2d"
                  width="100%"
                  height={200}
                  dataFormat="JSON"
                  dataSource={requestPerDepartmentDataSource()}
                />
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