import React from 'react'
import { Pie } from "@ant-design/charts"


const MyPieChart = (props) =>{
  const {
    data
  } = props
  
  const config = {
    appendPadding: 1,
    
    padding:1,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14
      }
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
  }

  return <Pie {...config} />
}

export default MyPieChart