import React from 'react'
import { Card } from 'antd'
import PropTypes from "prop-types"

const DashboardCard = (props) => {
  const { title, value, onClick } = props
  return (
    <Card title={title} bordered={false} hoverable onClick={() => onClick()}>
      <div style={{width: '100%', height: '100%', display:'flex', flexDirection: 'row', alignItems:'flex-end', justifyContent: 'flex-end'}}>
        <div style={{}}>
          <span style={{fontSize: '30px', color: '#7e8082'}}>{value ? value : 0}</span>
        </div>
      </div>
    </Card>
  )
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onClick: PropTypes.func
}

export default DashboardCard