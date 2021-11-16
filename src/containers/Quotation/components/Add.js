import { Button, Card, Col, PageHeader, Row, Spin, Steps, Table, Upload } from 'antd'
import React from 'react'
import { CheckOutlined, DiffOutlined, LeftOutlined, RightOutlined, UploadOutlined, UserSwitchOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import { QUOTATIONS_WITHOUT_DOCUMENT_TEST } from '../../../util/quotation-types'
import { prettifyDateTime } from '../../../util/common-helper'
import { saveSingleDocument } from "../../../services/api/document"
import { useHistory } from 'react-router'
const { Step } = Steps

const supplierColumns = props => [
  {
    title: "Supplier",
    dataIndex: "supplierName",
    key: "supplierName"
  },
  {
    title: "Number of Items Assigned",
    dataIndex: "requests",
    key: "requests",
    render: (text, row) => row?.requests?.length || "0"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, row) => {
      //console.log('row supplier id', row.supp)
      const buttonType = props.selectedSupplier?.supplierId === row?.supplierId ? "primary" : "default"
      return (
        <>
            <Button 
              onClick={() => props.onSelect(row)} 
              size="small" 
              type={buttonType}
            >
              <RightOutlined />
            </Button>
        </>
      )
    }
  }
]

const requestColumns = props => [
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
]

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

const CreateQuotation = (props) => {
  const { currentUser, quotations, fetchQuotations, quotationSubmitSuccess, quotationLoading, createQuotation, quotationSubmitting } = props
  const [files, setFiles] = React.useState([]) // eslint-disable-next-line
  const [ quotation, setQuotation ] = React.useState({}) 
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedRow, setSelectedRow] = React.useState({supplierId: null, requests: []})
  const [ items, setItems ] = React.useState([])
  const [current, setCurrent] = React.useState(0)
  const [selectedSupplier, setSelectedSupplier] = React.useState(undefined);
  const [selectedRequestItems, setSelectedRequestItems] = React.useState([])
  const history = useHistory()

  const handleSubmit = async ()=> {
    console.log('my file pload', files[0])
    const file = files[0].originFileObj
    //createQuotation(payload)
    console.log('SUBMIT', currentUser.id)
    try {
      const response = await saveSingleDocument({file: file, docType: file?.type})
      if(response.status === 'SUCCESS') {
        const responseData = response.data
        const docId = responseData.documentId
        console.log('doc id', docId)
        if(docId) {
          console.log('oo yeah, lets create quotation')
          createQuotation({
            documentId: docId, 
            requestItemIds: selectedRequestItems.map(it => it.id), 
            supplierId: selectedSupplier.supplierId
          })
        }
        //await fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT_TEST })
      }
      setFiles([])
    } catch (e) {
      console.log('err')
    }
    
  }

  React.useEffect(()=> {
    if(!quotationSubmitting && quotationSubmitSuccess) {
      setFiles([])
      fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT_TEST })
      setSelectedRequestItems([])
      setCurrent(0)
      setSelectedSupplier(null)
    } // eslint-disable-next-line
  }, [quotationSubmitSuccess, quotationSubmitting])

  React.useEffect(()=> {
    props.resetQuotation()
    fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT_TEST }) // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <PageHeader
            onBack={() => history.push("/app/quotations")}
            title="Create Quotation Document"
            style={{padding: 0}}
          />
        </Col>
      </Row>
      <Row style={{padding: 10}}>
        <Col span={24}>
          <Steps current={current} size="small">
            <Step title="Select Supplier" icon={<UserSwitchOutlined />} />
            <Step title="Select Request Items" icon={<DiffOutlined />} />
            <Step title="Upload File" icon={<UploadOutlined />} />
          </Steps>  
        </Col>
      </Row>
      <Card>
        {current === 0 && (
          <>
            <Row>
              <Col span={24}>
                <span style={{fontWeight: "bold"}}>Selected Supplier: {selectedSupplier?.supplierName || "No supplier selected"}</span>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table 
                  columns={supplierColumns({
                    onSelect: (row) => {
                      console.log('selected supplier', row)
                      setSelectedSupplier(row)
                      setCurrent(1)
                    },
                    selectedSupplier: selectedSupplier
                  })}
                  dataSource={quotations}
                  rowKey="supplierId"
                  size="small"
                  bordered
                  loading={props.quotationLoading}
                  pagination={false}
                />
              </Col>
            </Row>
            {/* <Row style={{padding: "10px 0px 10px 0px"}}>
              <Col span={24}>
                <Button 
                  onClick={() => {
                    setCurrent(1)
                  }}
                  style="default" 
                  style={{float: "right"}} disabled={!selectedSupplier?.supplierId}>
                  Continue to select request items
                  <RightOutlined />
                </Button>
              </Col>
            </Row> */}
          </>
        )}
        {current == 1 && (
          <>
            <Row>
              <Col span={24} style={{padding: "10px 0px 10px 0px"}}>
                <span style={{fontWeight: "bold"}}>
                  selected Supplier: {selectedSupplier?.supplierName}
                </span>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table
                  columns={requestColumns({})}
                  dataSource={selectedSupplier?.requests || []}
                  size="small"
                  rowKey="id"
                  bordered
                  pagination={false}
                  rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                      setSelectedRequestItems(selectedRows)
                    },
                    selectedRowKeys: selectedRequestItems?.map(it=> it.id),
                  }}
                />
              </Col>
            </Row>
            <Row style={{padding: "10px 0px 10px 0px"}}>
              <Col span={24} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Button type="default" onClick={()=> setCurrent(0)}>
                  <LeftOutlined />
                  Select Supplier
                </Button>
                <Button type="primary" onClick={() => setCurrent(2)} disabled={selectedRequestItems?.length < 1}>
                  Upload Quotation Document
                  <RightOutlined />
                </Button>
              </Col>
            </Row>
          </>
        )}
        {current === 2 && (
          <>
            <Row>
              <Col span={24}>
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
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <span style={{fontWeight: "bold"}}>Selected Supplier: {selectedSupplier?.supplierName}</span>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table 
                  columns={requestColumns({})}
                  pagination={false}
                  size="small"
                  bordered
                  dataSource={selectedRequestItems}
                  rowKey="id"
                />
              </Col>
            </Row>
            <Row style={{padding: "10px 0px 10px 0px"}}>
              <Col span={24} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Button type="default" onClick={()=> setCurrent(1)}>
                  <LeftOutlined />
                  Select Request Items
                </Button>
                <Button 
                  loading={quotationSubmitting}
                  type="primary" 
                  onClick={() => handleSubmit()} 
                  disabled={selectedRequestItems?.length < 1 || !selectedSupplier?.supplierId || files.length < 1 || quotationSubmitting}
                >
                  <CheckOutlined />
                  SUBMIT
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </React.Fragment>
  )
}

export default CreateQuotation