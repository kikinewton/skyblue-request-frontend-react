import { Button, Card, Col, Input, List, Row, Spin, Table, Tag, Upload } from 'antd'
import React from 'react'
import { prettifyDateTime } from '../../../util/common-helper'
import { saveDocument as saveDocumentApi } from '../../../services/api/document'
import { RightOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
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
    title: 'Actions', key: 'operation', fixed: 'right', width: 100,
    render: (text, row) => {
      return (
        <Row>
          <Col md={24} sm={24}>
            {props.selectedRow?.id === row.id ? (<Tag color="green">Selected LPO</Tag>) : (<RightOutlined style={{cursor: 'pointer'}} onClick={()=> props.onSelectRow(row)} />)}  
          </Col>
        </Row>
      )
  }
}
]

const AddDocument = (props) => {
  const { currentUser, quotations, fetchQuotations, updateQuotation, quotationSubmitSuccess, quotationLoading } = props
  const [files, setFiles] = React.useState([])
  const [ quotation, setQuotation ] = React.useState({})
  const [modalOpen, setModalOpen] = React.useState(false)
  const [ searchTerm, setSearchTerm ] = React.useState("")
  const [selectedRow, setSelectedRow] = React.useState({})

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
    } // eslint-disable-next-line
  }, [quotationSubmitSuccess])

  React.useEffect(()=> {
    fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT }) // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <Row style={{marginBottom: 20}}>
        <Col md={10}>
          <span className="bs-page-title">Attach Quotation Document</span>
        </Col>
        <Col md={14}>
          <Row>
            <Col md={20}>
              <Input style={{width: '100%'}} placeholder="Search...." type="search" value={searchTerm} onChange={(event)=> setSearchTerm(event.target.value)} />
            </Col>
            <Col md={4}>
              <Button style={{width: '100%'}} type="primary"><SearchOutlined /></Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {quotationLoading ? (<Spin />) : 
        <Row gutter={12}>
          <Col md={16}>
            <Card title="Quotations">
              <Table 
                columns={columns({ onSelectRow: (row)=> setSelectedRow(row), selectedRow })}
                dataSource={quotations}
                rowKey="id"
                size="small"
                onCancel={()=> console.log('row clicked')}
                pagination={{
                  pageSize: 20
                }}
                onRow={(row) => {
                  return {
                    onClick: () => {
                      console.log('row', row)
                      setSelectedRow(row)
                    }
                  }
                }}
              />
            </Card>
          </Col>
          <Col md={8}>
            <Card title="Items">
              <List>
                
                <List.Item>
                  {/* <List.Item.Meta description={} /> */}
                </List.Item>
              </List>
            </Card>
          </Col>
        </Row>
      }
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


