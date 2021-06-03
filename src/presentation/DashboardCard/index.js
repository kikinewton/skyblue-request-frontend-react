import React from 'react'
import { Card } from 'antd'

const DashboardCard = (props) => {
  const { title, value } = props
  return (
    <Card title={title} bordered={false}>
      <div style={{width: '100%', height: '100%', display:'flex', flexDirection: 'row', alignItems:'flex-end', justifyContent: 'flex-end'}}>
        <div style={{}}>
          <span style={{fontWeight: 'bold', fontSize: '30px', color: '#7e8082'}}>{value}</span>
        </div>
      </div>
    </Card>
  )
}

export default DashboardCard