import React from 'react'
import { Card } from 'antd'

const DashboardCard = (props) => {
  const { title, value } = props
  return (
    <Card title={title} bordered={false} hoverable>
      <div style={{width: '100%', height: '100%', display:'flex', flexDirection: 'row', alignItems:'flex-end', justifyContent: 'flex-end'}}>
        <div style={{}}>
          <span style={{fontSize: '30px', color: '#7e8082'}}>{value ? value : 0}</span>
        </div>
      </div>
    </Card>
  )
}

export default DashboardCard