import { Spin, Tag } from 'antd'
import React from 'react'
import { RESPONSE_SUCCESS_CODE } from '../../services/api/apiRequest'
import { getDashboardData as getDashboardDataApi} from '../../services/api/dashboard'
import openNotification from '../../util/notification'
import AppLayout from '../AppLayout'
import DashboardComponent from './components/Dashboard'
import { Creators as DashboardCreators} from "../../services/redux/dashboard/actions"
import { connect } from 'react-redux'

import { prettifyDateTime } from '../../util/common-helper'

export const REQUEST_ITEM_COLUMNS = [
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason"
  },
  {
    title: "purpose",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Request Category",
    dataIndex: "requestCategory",
    key: "requestCategory",
    render: (text, row) => row?.requestCategory?.name || "NA"
  },
  {
    title: "Request Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  }
]

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

  // React.useEffect(()=> {
  //   initPage()
  // }, [])

  return (
    <React.Fragment>
      <AppLayout>
        {loading ? <Spin /> :
          <DashboardComponent 
            data={data}
            {...props}
          />
        }
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = store => ({
  dashboard_data: store.dashboard.data || {},
  fetching_dashboard_data: store.dashboard.loading
})

const mapActionsToProps = dispatch => ({
  fetchDashboardData: () => dispatch(DashboardCreators.fetchDashboardData())
})

export default connect(mapStateToProps, mapActionsToProps)(Dashboard)
