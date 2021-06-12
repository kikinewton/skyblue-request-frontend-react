import React from 'react'
import { Line, Doughnut, Pie, Bar } from 'react-chartjs-2'
import { generateHexColorString } from '../../util/common-helper'

export const LineChart = (props) => {
  const { data, label, labels, maintainAspectRation=false } = props
  return (
    <Line 
      options={{maintainAspectRatio: maintainAspectRation, responsive: true, offset: true}}
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
      height="250px"
      options={{ maintainAspectRatio: maintainAspectRatio, responsive: true }}
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
          barThickness: 25,
          barPercentage: 0.5
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
          height="250px"
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
          height="250px"
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