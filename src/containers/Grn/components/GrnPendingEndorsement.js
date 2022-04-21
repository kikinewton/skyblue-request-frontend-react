import { Card, Button, Table, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { GRN_COLUMNS } from '..'
import GrnDocumentReview from '../../../presentation/GrnDocumentReview'
import { prettifyDateTime } from '../../../util/common-helper'

const columns = props => GRN_COLUMNS.concat([
  {
    title: "Invoice Number",
    dataIndex: "invoice",
    key: "invoice",
    render: (text, row) => row?.invoice?.invoiceNumber
  },
  // {
  //   title: "Created On",
  //   dataIndex: "createdDate",
  //   key: "createdDate",
  //   render: (text) => prettifyDateTime(text)
  // },
  {
    title: "Amount",
    dataIndex: "invoiceAmountPayable",
    key: "invoiceAmountPayable"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text,row) => (<><Button size="small" type="primary" onClick={() => props.onEndorse(row)}>Endorse GRN</Button></>)
  },
])

const GrnPendingEndorsement = (props) => {
  const {
    grns,
    fetching_grns,
    fetchGrns,
    resetGrn,
    submitting_grn,
    submit_grn_success,
    updateGrn,
  } = props
  const [visible, setVisible] = useState(false)
  const [selectedGrn, setSelectedGrn] = useState(null)

  useEffect(() => {
    resetGrn()
    fetchGrns({notApprovedByHOD: true})
  }, [])

  useEffect(() => {
    if(!submitting_grn && submit_grn_success) {
      setVisible(false)
      setSelectedGrn(null)
      fetchGrns({notApprovedByHOD: true})
    }
  }, [submit_grn_success, submitting_grn])

  return (
    <>
      <Card
        title="Goods Received Notes Awaiting Endorsement"
        size="small"
      >
        <Table
          columns={columns({
            onEndorse: (row) => {
              setSelectedGrn(row)
              setVisible(true)
            }
          })}
          dataSource={grns}
          loading={fetching_grns}
          size="small"
          bordered
          rowKey="id"
        />
      </Card>
      <Drawer
        forceRender
        visible={visible}
        title="Review and endorse"
        placement="right"
        width={800}
        maskClosable={false}
        onClose={() => {
          setSelectedGrn(null)
          setVisible(false)
        }}
      >
        <GrnDocumentReview
          loading={submitting_grn} 
          grn={selectedGrn}
          invoice={selectedGrn?.invoice}
          invoiceDocument={selectedGrn?.invoice?.invoiceDocument}
          onFinishText="Endorse Goods Received Note"
          onFinish={() => {
            updateGrn(selectedGrn?.id, {updateType: "approve"})
          }}
        />
      </Drawer>
    </>
  )
}

export default GrnPendingEndorsement