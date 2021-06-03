import React from 'react'
import { Line, Doughnut, Pie, Bar } from 'react-chartjs-2'
import { generateHexColorString } from '../../util/common-helper'

export const LineChart = (props) => {
  const { data, label, labels, maintainAspectRation=false } = props
  return (
    <Line 
      options={{maintainAspectRatio: maintainAspectRation}}
      type="line"
      data={{
        label: label,
        labels,
        datasets: [{
          label,
          data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }}
    />
  )
}

export const BarChart = (props) => {
  const { data, label, labels, maintainAspectRatio=false} = props
  return (
    <Bar 
      options={{ maintainAspectRatio: maintainAspectRatio }}
      type="Line"
      data={{
        label: label,
        labels,
        datasets: [{
          backgroundColor: labels.map(it=> generateHexColorString()),
          label,
          data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        }]
      }}
    />
  )
}

export const PieChart = (props) => {
  const { data, label, labels, type='Pie' } = props
  return (
    <>
      {type === 'Pie'
      ? <Pie 
          options={{ aspectRatio: 1, maintainAspectRatio: false }}
          data={{
            labels: labels,
            datasets: [
              {
                label: label,
                backgroundColor: labels?.map(it=> generateHexColorString()),
                data: data
              }
            ]
          }}
          title={label}
          type="Pie"
        />
      : <Doughnut
          options={{ aspectRatio: 1, maintainAspectRatio: false }}
          data={{
            label: label,
            labels: labels,
            datasets: [
              {
                label: label,
                backgroundColor: labels.map(it=> generateHexColorString()),
                data: data,
              }
            ]
          }}
          title={label}
          type="Doughnut"
        />}
    </>
  )
}