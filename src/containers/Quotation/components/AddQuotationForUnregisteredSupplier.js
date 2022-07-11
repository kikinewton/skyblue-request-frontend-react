import { Button, Card, Col, Input, message, PageHeader, Row, Steps, Table } from 'antd'
import React, { useState } from 'react'
import { CheckOutlined, DiffOutlined, LeftOutlined, RightOutlined, UploadOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { QUOTATIONS_WITHOUT_DOCUMENT_TEST_FOR_UNREGISTERED } from '../../../util/quotation-types'
import { RESPONSE_SUCCESS_CODE } from '../../../services/api/apiRequest'
import FilesView from "../../../shared/FilesView"
import { generateQuotationForUnregisteredSupplier } from '../../../services/api/quotation'
import openNotification from '../../../util/notification'
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

const requestUpdatePriceColumns = props => [
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
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
    render: (text, row) => (
      <>
        <Input 
          type="number" 
          value={row?.unitPrice} 
          onChange={e => {
            props.onPriceChange(row,e.target.value)
          }}
        />
      </>
    )
  },
]

const AddQuotationFOrUnregisteredSupplier = (props) => {
  const { filtered_quotations, fetchQuotations, quotationSubmitSuccess, createQuotation, 
    quotationSubmitting, filterQuotations } = props
  const [files, setFiles] = React.useState([])
  const [loadingDocument, setLoadingDocument] = React.useState(false)
  const [document, setDocument] = React.useState(null)
  const [current, setCurrent] = React.useState(0)
  const [selectedSupplier, setSelectedSupplier] = React.useState(undefined);
  const [selectedRequestItems, setSelectedRequestItems] = React.useState([])
  const [supplierSearch, setSupplierSearch] = useState("")

  const handleGenerateQuot = async () => {
    setLoadingDocument(true)
    const payload = {
      supplier: {
        id: selectedSupplier?.supplierId,
        name: selectedSupplier?.supplierName,
        phone_no: "0242688682",
      },
      deliveryDate: "",
      location: "",
      phoneNo: "0242688682",
      productDescription: selectedRequestItems.map(it => `${it.name} (GHS ${it.unitPrice})`).join(", "),
    }
    try {
      const response = await generateQuotationForUnregisteredSupplier(payload)
      if(response.status === RESPONSE_SUCCESS_CODE) {
        openNotification('success', "Generate Quoatation Document", "Successfully Generated Quotation Document")
        const doc = response?.data
        console.log("supporting doc created!", doc)
        setDocument(doc)
        setFiles([doc])
        setCurrent(3)
      } else {
        openNotification('error', "Generate Quoatation Document", response?.message || "Failed To Generated Quotation Document")
      }
    } catch (error) {
      openNotification('error', "Generate Quoatation Document", "Failed To Generated Quotation Document")
    } finally {
      setLoadingDocument(false)
    }
  }

  const handleSubmit = async ()=> {
    if(!document) {
      return message.error("Supporting document not available!")
    }
    const payload = {
      supplier: selectedSupplier,
      productDescription: selectedRequestItems.map(it => `${it.name} (GHS ${it.unitPrice})`).join(", "),
    }
    createQuotation({
      documentId: document?.id,
      requestItemIds: selectedRequestItems.map(it => it.id), 
      supplierId: selectedSupplier.supplierId
    })
    
    
  }

  React.useEffect(()=> {
    if(!quotationSubmitting && quotationSubmitSuccess) {
      setFiles([])
      fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT_TEST_FOR_UNREGISTERED })
      setSelectedRequestItems([])
      setCurrent(0)
      setSelectedSupplier(null)
    } 
    // eslint-disable-next-line
  }, [quotationSubmitSuccess, quotationSubmitting])

  React.useEffect(()=> {
    props.resetQuotation()
    fetchQuotations({ requestType: QUOTATIONS_WITHOUT_DOCUMENT_TEST_FOR_UNREGISTERED }) // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    filterQuotations(supplierSearch)
    // eslint-disable-next-line
  }, [supplierSearch])

  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <PageHeader
            // onBack={() => history.push("/app/quotations")}
            title="Create Quotation Document For Unregistered Supplier"
            style={{padding: 0}}
          />
        </Col>
      </Row>
      <Row style={{padding: 10}}>
        <Col span={24}>
          <Steps current={current} size="small">
            <Step title="Select Supplier" icon={<UserSwitchOutlined />} />
            <Step title="Select Request Items" icon={<DiffOutlined />} />
            <Step title="Generate Supporting Document" icon={<UploadOutlined />} />
            <Step title="Create Quotation" icon={<UploadOutlined />} />
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
                  Price Items And Generate Quotation
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
                <span style={{fontWeight: "bold"}}>Selected Supplier: {selectedSupplier?.supplierName}</span>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                {/* <UploadFiles 
                  files={files}
                  onUpload={handleUploadFile}
                  loading={loadingDocument}
                /> */}
                <Table 
                  columns={requestUpdatePriceColumns({
                    onPriceChange: (row, value) => {
                      setSelectedRequestItems(selectedRequestItems.map(it => {
                        if(it.id === row?.id) {
                          return {...it, unitPrice: value}
                        } else {
                          return it
                        }
                      }))
                    }
                  })}
                  dataSource={selectedRequestItems}
                  size="small"
                  bordered
                  rowKey="id"
                  pagination={false}
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
                  onClick={() => handleGenerateQuot()}
                  disabled={quotationSubmitting || selectedRequestItems?.length < 1 || !selectedSupplier?.supplierId}
                >
                  <CheckOutlined />
                  Generate Quotation ({selectedSupplier?.supplierName})
                </Button>
              </Col>
            </Row>
          </>
        )}
        {current === 3 && (
          <>
            <Row>
              <Col span={24}>
                <FilesView files={files} />
              </Col>
            </Row>
            <Row>
              <Col>
              <Button type="default" onClick={()=> setCurrent(2)}>
                  <LeftOutlined />
                  Generate Supporting Document
                </Button>
                <Button
                  loading={quotationSubmitting}
                  type="primary"
                  onClick={() => handleSubmit()}
                  disabled={quotationSubmitting || selectedRequestItems?.length < 1 || !selectedSupplier?.supplierId}
                >
                  <CheckOutlined />
                  Create Quotation ({selectedSupplier?.supplierName})
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </React.Fragment>
  )
}

export default AddQuotationFOrUnregisteredSupplier