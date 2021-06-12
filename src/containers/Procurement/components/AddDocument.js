import { Button, Col, Row, Table, Upload } from 'antd'
import React from 'react'
import { prettifyDateTime } from '../../../util/common-helper'
import { saveDocument as saveDocumentApi } from '../../../services/api/document'
import { CheckOutlined, CloudUploadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import { QUOTATIONS_WITHOUT_DOCUMENT } from '../../../util/quotation-types'

const columns = (props) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'SUPPLIER',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (text)=> {
      return text?.name
    }
  },
  {
    title: 'DATE',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => prettifyDateTime(text)
  },
  {
    title: 'Document Attached',
    dataIndex: 'requestDocument',
    key: 'requestDocument',
    render: (text)=> {
      return text ? <CheckOutlined /> : 'N/A'
    }
  },
  {
    title: 'Upload Quotation', key: 'operation', fixed: 'right', width: 100,
    render: (text, row) => {
      return (
        <Row>
          <Col md={24} sm={24}>
            <CloudUploadOutlined style={{cursor: 'pointer'}} onClick={()=> props.handleUpdate(row)} tooltip="Endorse" />  
          </Col>
        </Row>
      )
  }
}
]

const AddDocument = (props) => {
  const { currentUser, quotations, fetchQuotations, updateQuotation, quotationSubmitSuccess } = props
  const [files, setFiles] = React.useState([])
  const [ quotation, setQuotation ] = React.useState({})
  const [modalOpen, setModalOpen] = React.useState(false)

  const handleAttachDocument = (row)=> {
    console.log('row', row)
    setFiles([])
    setQuotation(row)
    setModalOpen(true)
  }

  const handleSubmit = async ()=> {
    console.log('files', files)
    const file = files[0].originFileObj
    console.log('SUBMIT', currentUser.id)
    try {
      const response = await saveDocumentApi({file: file, employeeId: currentUser.id})
      console.log('res', response)
      if(response.status === 'SUCCESS') {
        console.log('hello success', response)
        const responseData = response.data
        const docId = responseData[0].id
        await updateQuotation(quotation.id, {documentId: docId})
        await fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT })
      }
      setFiles([])
      setModalOpen(false)
    } catch (e) {
      console.log('err')
    }
  }

  React.useEffect(()=> {
    if(quotationSubmitSuccess) {
      setFiles([])
      fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT })
    }
  }, [quotationSubmitSuccess])

  React.useEffect(()=> {
    fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT })
  }, [])

  return (
    <React.Fragment>
      <Row style={{marginBottom: 20}}>
        <Col md={6}>
          <span className="bs-page-title">Attach Quotation Document</span>
        </Col>
        <Col md={18} style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button onClick={()=> window.location.href="/#app/procurement/add-local-purchase-order"} type="link"><PlusOutlined /> Create Local Purchase Order</Button>
          <Button onClick={()=> window.location.href="/#app/procurement/local-purchase-orders"} type="link">All Quotations</Button>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            columns={columns({ handleUpdate: (row)=> handleAttachDocument(row) })}
            dataSource={quotations}
            rowKey="id"
            size="small"
            pagination={{
              pageSize: 20
            }}
          />
        </Col>
      </Row>
      <Modal title="Attach document" visible={modalOpen} onOk={handleSubmit} 
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
            console.log(values)
            setFiles([values.file])
          }}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Modal>
    </React.Fragment>
  )
}

export default AddDocument