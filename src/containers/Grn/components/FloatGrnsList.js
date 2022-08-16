import { Row, Col, Breadcrumb, Table, Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { FLOAT_GRN_COLUMNS, GRN_COLUMNS } from '..'
import FloatGrnDetails from '../../../shared/FloatGrnDetails'

const columns = props => FLOAT_GRN_COLUMNS.concat([
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (text, record) => (
      <>
        <Button 
          size='small'
          type='primary' 
          onClick={() => {
            props.onApprove(record)
          }}
        >
          APPROVE
        </Button>
      </>
    )
  }
])

const FloatGrnsList = props => {
  const {
    fetchGrns,
    grns,
    fetching_grns,
    updateFloatGrn,
    submitting_grn,
    submit_grn_success
  } = props

  const [visible, setVisible] = useState(false)
  const [selectedGrn, setSelectedGrn] = useState(null)

  useEffect(() => {
    fetchGrns({floatGrn: true})
  }, [])

  useEffect(() => {
    if(submit_grn_success && !submitting_grn) {
      setVisible(false)
      setSelectedGrn(null)
      fetchGrns({floatGrn: true})
    }
  }, [submit_grn_success, submitting_grn])

  return (
    <>
      <Row>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              Float GRNS
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            size='small'
            bordered
            rowKey='id'
            loading={fetching_grns}
            dataSource={grns}
            columns={columns({
              onApprove: row => {
                setSelectedGrn(row)
                setVisible(true)
              }
            })}
          />
        </Col>
      </Row>
      <Modal
        visible={visible}
        width={700}
        onCancel={()=> {
          setVisible(false)
          setSelectedGrn(null)
        }}
        footer={false}
      >
        <FloatGrnDetails 
          floatGrn={selectedGrn}
        />
        <Row style={{marginTop: 10}}>
          <Col span={24}>
            <Button 
              loading={submitting_grn}
              type='primary' 
              onClick={() => {
                const payload = {}
                updateFloatGrn(selectedGrn?.id, payload)
              }}
            >
              APPROVE
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default FloatGrnsList