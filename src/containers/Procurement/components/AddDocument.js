import { Button, Card, Col, Row, Spin, Table, Upload } from 'antd'
import React from 'react'
import { RightOutlined, UploadOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import { QUOTATIONS_WITHOUT_DOCUMENT_TEST } from '../../../util/quotation-types'
import { prettifyDateTime } from '../../../util/common-helper'

const itemColumns = [
  {
    title: 'Description',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Request Date',
    dataIndex: 'requestDate',
    key: 'requestDate',
    render: (text) => prettifyDateTime(text)
  },
]

const columns = (props) => [
  {
    title: 'SUPPLIER',
    dataIndex: 'supplierName',
    key: 'supplierName',
  },
  {
    title: 'Actions', key: 'operation', fixed: 'right', width: 100,
    render: (text, row) => {
      return (
        <Row>
          <Col md={24} sm={24}>
            {props.selectedRow?.supplierId === row.supplierId ? "Selected" : (<RightOutlined style={{cursor: 'pointer'}} onClick={()=> props.onSelectRow(row)} />)}  
          </Col>
        </Row>
      )
  }
}
]

const AddDocument = (props) => {
  const { currentUser, quotations, fetchQuotations, quotationSubmitSuccess, quotationLoading, createQuotation, quotationSubmitting } = props
  const [files, setFiles] = React.useState([]) // eslint-disable-next-line
  const [ quotation, setQuotation ] = React.useState({}) 
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedRow, setSelectedRow] = React.useState({supplierId: null, requests: []})
  const [ items, setItems ] = React.useState([])

  const handleSubmit = async ()=> {
    const files =  files.map(it => it.originFileObj)
    const payload = {
      files,
      supplierId: selectedRow?.supplierId
    }
    createQuotation(payload)
    // console.log('SUBMIT', currentUser.id)
    // try {
    //   const response = await saveDocumentApi({file: file, employeeId: currentUser.id})
    //   if(response.status === 'SUCCESS') {
    //     console.log('hello success', response)
    //     const responseData = response.data
    //     const docId = responseData[0].id
    //     await updateQuotation(quotation.id, {documentId: docId})
    //     await fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT_TEST })
    //   }
    //   setFiles([])
    //   setModalOpen(false)
    // } catch (e) {
    //   console.log('err')
    // }
  }

  React.useEffect(()=> {
    if(quotationSubmitSuccess) {
      setFiles(null)
      fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT_TEST })
      setSelectedRow({})
      setItems([])
      setModalOpen(false)
    } // eslint-disable-next-line
  }, [quotationSubmitSuccess])

  React.useEffect(()=> {
    fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT_TEST }) // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <Row style={{marginBottom: 20}}>
        <Col md={24}>
          <span className="bs-page-title">Attach Quotation Document</span>
        </Col>
      </Row>
      {quotationLoading ? (<Spin />) : 
        <Row gutter={12}>
          <Col md={10}>
            <Card title="Suppliers with assigned requests">
              <Table 
                columns={columns({ onSelectRow: (row)=> {
                  setSelectedRow(row)
                  setItems(row.requests)
                  console.log('items', items)
                }, selectedRow: selectedRow })}
                dataSource={quotations}
                rowKey="supplierId"
                size="small"
                onCancel={()=> console.log('row clicked')}
                pagination={false}
              />
            </Card>
          </Col>
          <Col md={14}>
            <Card 
              title="Items"
              extra={[
                <Button
                      disabled={!selectedRow.supplierId} 
                      style={{float: "right"}} 
                      onClick={()=> setModalOpen(true)}
                    >
                      <UploadOutlined /> Attach Document
                    </Button>
              ]}
            >
              <Row>
                <Col md={24}>
                  <Table
                    columns={itemColumns}
                    dataSource={items}
                    rowKey="id"
                    size="small"
                    bordered
                    pagination={false}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      }
      <Modal title="Attach document" visible={modalOpen} 
      onOk={handleSubmit} 
        forceRender={true}
        onCancel={()=> {
          setFiles([])
          setQuotation({})
          setModalOpen(false)
        }}
      >
        <Upload
          action={false}
          listType="picture-card"
          maxCount={1}
          defaultFileList={files}
          onChange={(values)=> {
            setFiles([values.file])
          }}
          
        >
          <Button loading={quotationSubmitting} icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Modal>
    </React.Fragment>
  )
}

export default AddDocument