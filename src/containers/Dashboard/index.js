import { Spin } from 'antd'
import React from 'react'
import { RESPONSE_SUCCESS_CODE } from '../../services/api/apiRequest'
import { getDashboardData as getDashboardDataApi} from '../../services/api/dashboard'
import openNotification from '../../util/notification'
import AppLayout from '../AppLayout'
import DashboardComponent from './components/Dashboard'

const Dashboard = (props) => {
  const [data, setData] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  const initPage = async ()=> {
    setLoading(true)
    try {
      const response = await getDashboardDataApi({})
      if(response.status === RESPONSE_SUCCESS_CODE) {
        const reasponseData = response.data
        setData(reasponseData)
      } else {
        openNotification('error', 'Get Dashboard', response.message)
      }
    } catch(err) {
      openNotification('error', 'get dashboard data', 'Failed!')
    }
    setLoading(false)
  }

  React.useEffect(()=> {
    initPage()
  }, [])

  return (
    <React.Fragment>
      <AppLayout>
        {loading ? <Spin /> :
          <DashboardComponent 
            data={data}
          />
        }
      </AppLayout>
    </React.Fragment>
  )
}

export default Dashboard
