import { PageHeader } from 'antd'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'


const GoodsReceivedNoteList = (props) => {
  const {
    fetchGrns,
    grns,
    fetching_grns  
  } = props
  const history = useHistory()
  useEffect(() => {
    fetchGrns({})
  }, [])
  return (
    <>
      <PageHeader title="Goods Receive Notes Not Closed" onBack={() => history.goBack()} />
    </>
  )
}

export default GoodsReceivedNoteList