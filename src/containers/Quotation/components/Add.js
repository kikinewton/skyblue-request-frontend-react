import { Button, Card, Col, Input, message, PageHeader, Row, Steps, Table } from 'antd'
import React, { useState } from 'react'
import { CheckOutlined, DiffOutlined, LeftOutlined, RightOutlined, UploadOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { QUOTATIONS_WITHOUT_DOCUMENT_TEST } from '../../../util/quotation-types'
import { saveSingleDocument } from "../../../services/api/document"
import { useHistory } from 'react-router'
import UploadFiles from '../../../shared/UploadFiles'
import { RESPONSE_SUCCESS_CODE } from '../../../services/api/apiRequest'
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

const CreateQuotation = (props) => {
  const { filtered_quotations, fetchQuotations, quotationSubmitSuccess, createQuotation, 
    quotationSubmitting, filterQuotations } = props
  const [files, setFiles] = React.useState([]) // eslint-disable-next-line
  const [loadingDocument, setLoadingDocument] = React.useState(false)
  const [current, setCurrent] = React.useState(0)
  const [selectedSupplier, setSelectedSupplier] = React.useState(undefined);
  const [selectedRequestItems, setSelectedRequestItems] = React.useState([])
  const [supplierSearch, setSupplierSearch] = useState("")

  const handleUploadFile = async(file) => {
    setLoadingDocument(true)
    try {
      const response = await saveSingleDocument({file: file?.file, docType: ""})
      setLoadingDocument(false)
      if(response.status === RESPONSE_SUCCESS_CODE) {
        const dt = response?.data
        const fileDetails = {
          ...dt,
          status: "done",
          name: dt?.fileName,
          size: dt?.fileSize,
          uid: dt?.id,
          url: dt?.fileDownloadUri
        }
        console.log('file details', fileDetails)
        setFiles(files.concat(fileDetails))
      }
    } catch (error) {
      setLoadingDocument(false)
    }
  }

  const handleSubmit = async ()=> {
    if(files.length < 1) {
      message.error("Please upload supporting document")
    } else {
      const docId = files[0]?.id
      createQuotation({
        documentId: docId,
        requestItemIds: selectedRequestItems.map(it => it.id), 
        supplierId: selectedSupplier.supplierId
      })
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

  React.useEffect(() => {
    filterQuotations(supplierSearch)
  }, [supplierSearch])

  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <PageHeader
            // onBack={() => history.push("/app/quotations")}
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
            <Card>
              <Row>
                <Col span={2} offset={16}>
                  Filter:
                </Col>
                <Col span={6}>
                  <Input placeholder='search by supplier' 
                    type="search" value={supplierSearch} 
                    onChange={e => setSupplierSearch(e.target.value)}/>
                </Col>
              </Row>
            </Card>
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
                      setSelectedSupplier(row)
                      setCurrent(1)
                    },
                    selectedSupplier: selectedSupplier
                  })}
                  dataSource={filtered_quotations}
                  rowKey="supplierId"
                  size="small"
                  bordered
                  loading={props.quotationLoading}
                  pagination={false}
                />
              </Col>
            </Row>
          </>
        )}
        {current === 1 && (
          <>
            <Row style={{paddingTop: 10, paddingBottom: 10}}>
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
                <UploadFiles 
                  files={files}
                  onUpload={handleUploadFile}
                  loading={loadingDocument}
                />
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
                  disabled={quotationSubmitting || selectedRequestItems?.length < 1 || !selectedSupplier?.supplierId || files.length < 1}
                >
                  <CheckOutlined />
                  Create Quotation for Supplier ({selectedSupplier?.supplierName})
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