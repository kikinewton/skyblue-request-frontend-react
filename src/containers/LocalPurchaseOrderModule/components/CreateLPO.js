import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { Document, Page, PDFViewer } from '@react-pdf/renderer'
import { Card, Col, Row, Steps, Select, Table, Button, Input, DatePicker, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../services/api/urls'
import { prettifyDateTime } from '../../../util/common-helper'
import { QUOTATIONS_BY_SUPPLIER } from '../../../util/quotation-types'
// import { Document, Page } from "react-pdf"

const quotationColumns = props => [
  {
    title: "Quotation Ref",
    dataIndex: "quotation",
    key: "quotation",
    render: (text, row) => row?.quotation?.quotationRef
  },
  {
    title: "Supplier",
    dataIndex: "quotation",
    key: "quotation",
    render: (text, row) => row?.quotation?.supplier?.name
  },
  {
    title: "Created Date",
    dataIndex: "quotation",
    key: "quotation",
    render: (text, row) => prettifyDateTime(row?.quotation?.createdAt)
  },
  {
    title: "Action",
    dataIndex: "operations",
    key: "operations",
    align: "right",
    render: (text, row) => <Button size="small" onClick={() => props.onSelect(row)} type="primary">Select Quotation <RightOutlined /></Button>
  },
]

const updatePriceColumns = (props)=> [
  {
    title: 'Description',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
    key: 'reason'
  },
  {
    title: 'Request Category',
    dataIndex: 'requestCategory',
    key: 'requestCategory',
    render: (text, row) => (
      <Select size="small" style={{width: "100%"}}
        onChange={(value) => props.onRequestCategoryChange(row, value)}
      >
        {props.request_categories?.map(it => (
          <Select.Option key={it.id} value={it.id}>{it.name}</Select.Option>
        ))}
      </Select>
    )
    // render: (text, row) => {
    //   return (
    //     <Select style={{width: '100%'}} defaultValue={row?.requestCategory} onChange={(value)=> props.onRequestCategoryChange(row, value)}>
    //       <Select.Option value={undefined}>Select Request Category</Select.Option>
    //       {props.request_categories.map(item=> (
    //         <Select.Option key={`rqc-${item?.id}`} value={item?.id}>{item?.name}</Select.Option>
    //       ))}
    //     </Select>
    //   )
    // }
  },
  {
    title: 'Unit price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    render: (text, row) => {
      return (
        <Input 
          size="small"
          type="number" 
          min={1} 
          defaultValue={row['unitPrice'] || 0} 
          onChange={(event)=> props.onPriceChange(row, event.target.value)} />
      )
    }
  },
]

const requestColumns = props => [
  {
    title: "Reference",
    dataIndex: "requestItemRef",
    key: "requestItemRef",
  },
  {
    title: "Description",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Requisition Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
]

const confirmColumns = props => [
  {
    title: "Reference",
    dataIndex: "requestItemRef",
    key: "requestItemRef",
  },
  {
    title: "Description",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Request Category",
    dataIndex: "requestCategory",
    key: "requestCategory",
    render: (text) => props.request_categories.find(it => it.id === text)?.name
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
  },
]


const CreateLPO = (props) => {
  const {
    fetching_suppliers,
    suppliers,
    fetchSuppliers,

    request_categories,
    fetching_request_categories,

    quotations,

    createLocalPurchaseOrder,
    submitting_local_purchase_order,
    submit_local_purchase_order_success,
  } = props

  const [current, setCurrent] = useState(0)
  const [selectedSupplier, setSelectedSupplier] = useState(undefined)
  const [selectedQuotation, setSelectedQuotation] = useState(null)
  const [selectedRequests, setSelectedRequests] = useState([])
  const [deliveryDate, setDeliveryDate] = useState(null)
  const [imageVisible, setImageVisible] = useState(false)

  const fetchQuotationsBySupplier = (supplierId) => {
    console.log('supplier ', supplierId)
    if(supplierId) {
      props.fetchQuotations({
        requestType: QUOTATIONS_BY_SUPPLIER,
        supplierId: supplierId
      })
    }
  }

  const handleSubmit = () => {
    const payload = {
      deliveryDate: deliveryDate.format("YYYY-MM-DD"),
      items: selectedRequests.map(rq => {
        let data = rq
        data["requestCategory"] = request_categories.find(it => it.id === rq.requestCategory)
        data["suppliedBy"] = selectedSupplier
        return data;
      })
    }
    console.log('payload', payload)
    createLocalPurchaseOrder(payload)
  }

  const handleUpdateRequestUnitPrice = (row, value) => {
    setSelectedRequests(selectedRequests.map(item=> {
      if(item.id === row.id) {
        let data = item;
        data['unitPrice'] = value
        return data
      } else {
        return item
      }
    }))
  }

  const handleUpdateRequestCategory = (row, value)=> {
    setSelectedRequests(selectedRequests.map(item=> {
      if(item.id === row.id) {
        let data = item;
        data['requestCategory'] = value
        return data
      } else {
        return item
      }
    }))
  }

  useEffect(() => {
    props.resetSuppliers()
    //props.resetRequestCategory()
    fetchSuppliers({suppliersWithRQ: true})
    props.fetchRequestCategories({})
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <Steps current={current} size="small">
            <Steps.Step title="Select Items" />
            <Steps.Step title="Select Request Items" />
            <Steps.Step title="Update Unit Price And Request Category" />
            <Steps.Step title="Confirm and submit" />
          </Steps>
        </Col>
      </Row>
      <Card>
        {current === 0 && (
          <>
            <Row style={{marginBottom: 20}}>
              <Col span={24}>
                <Select 
                  loading={fetching_suppliers} 
                  style={{width: '100%'}} 
                  placeholder="Select a supplier" 
                  defaultValue={selectedSupplier}
                  onChange={(value)=> {
                    setSelectedSupplier(value)
                    fetchQuotationsBySupplier(value)
                  }}
                >
                  <Select.Option value={undefined}>Select Supplier...</Select.Option >
                  {suppliers && suppliers.map(item => (
                    <Select.Option value={item.id} key={`supplier-select-${item.id}`}>{item.name}</Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row style={{marginBottom: 20}}>
              <Col span={24}>
                <span style={{fontWeight: "bold"}}>Selected Quotation: {selectedQuotation?.quotation?.quotationRef || "N/A"}</span>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table 
                  columns={quotationColumns({
                    onSelect: (row) => { 
                      console.log('selected quotation', row)
                      setSelectedQuotation(row) 
                    }
                  })}
                  size="small"
                  dataSource={quotations}
                  pagination={false}
                  bordered
                />
              </Col>
            </Row>
            <Row style={{padding: "10px 0px 10px 0px"}}>
              <Col span={24}>
                <Button type="default"
                  onClick={() => {
                    setCurrent(1)
                  }}
                  style={{float: "right"}}
                  disabled={!selectedQuotation?.quotation?.quotationRef}
                >
                  Next (Select Request Items)
                  <RightOutlined />
                </Button>
              </Col>
            </Row>
          </>
        )}
        {current === 1 && (
          <>
            <Row>
              <Col span={24}>
                <Table
                  columns={requestColumns({})}
                  size="small"
                  rowKey="id"
                  dataSource={selectedQuotation?.requestItems}
                  pagination={false}
                  rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                      console.log('selected rows', selectedRows)
                      setSelectedRequests(selectedRows)
                    },
                    selectedRowKeys: selectedRequests?.map(it=> it.id),
                  }} 
                />
              </Col>
            </Row>
            <Row style={{padding: "10px 0px 10px 0px"}}>
              <Col span={24}>
                <Button type="default"
                  onClick={() => {
                    setCurrent(0)
                  }}
                  style={{float: "left"}}
                >
                  Previous
                  <RightOutlined />
                </Button>
                <Button type="default"
                  onClick={() => {
                    setCurrent(2)
                  }}
                  style={{float: "right"}}
                  disabled={!selectedQuotation?.quotation?.quotationRef}
                >
                  Next (Select Request Items)
                  <RightOutlined />
                </Button>
              </Col>
            </Row>
          </>
        )}
        {current === 2 && (
          <React.Fragment>
            <Row style={{paddingTop: 20, paddingBottom: 20}}>
              <Col md={24}>
                <Card>
                <Row style={{marginBottom: 20, borderBottom: "1px #bdbdbd solid"}}>
                  <Col md={24}>
                    <span style={{fontWeight: 'bold'}}>SUPPLIER: {suppliers.find(item=> item.id === selectedSupplier)?.name}</span>
                  </Col>
                </Row>
                  <Row>
                    <Col md={6}>Delivery Date:</Col>
                    <Col md={18}>
                      <DatePicker
                        format="YYYY-MM-DD"
                        style={{width: "100%"}} 
                        value={deliveryDate}
                        onChange={(date, dateStr)=> {
                          console.log('date', date)
                          setDeliveryDate(date)
                        }} 
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row style={{padding: 10}}>
              <Col span={24}>
                {selectedQuotation?.quotation?.requestDocument?.documentType.includes("image/") && (
                  <div style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center"}}>
                    <Image 
                      preview={imageVisible}
                      onClick={() => setImageVisible(true)}
                      width={200}
                      src={`${BASE_URL}/requestDocument/download/${selectedQuotation?.quotation?.requestDocument?.fileName}`}
                    />
                    <div style={{height: "100%",display: "flex", flexDirection: "row", alignItems: "center"}}>
                      <span style={{fontWeight: "bold"}}>Quotation Document</span>
                    </div>
                  </div>
                )}
                {selectedQuotation?.quotation?.requestDocument?.documentType.includes("application/pdf") && (
                  <div style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center"}}>
                    <PDFViewer>
                      <Document>
                        <Page size="A4" style={{flexDirection: 'row',backgroundColor: '#E4E4E4'}}>

                        </Page>
                      </Document>
                    </PDFViewer>
                    <div style={{height: "100%",display: "flex", flexDirection: "row", alignItems: "center"}}>
                      <span style={{fontWeight: "bold"}}>Quotation Document</span>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <Table 
                  columns={updatePriceColumns({
                    request_categories: props.request_categories,
                    onRequestCategoryChange: (row, value) => handleUpdateRequestCategory(row, value),
                    onPriceChange: (row, value) => handleUpdateRequestUnitPrice(row, value)
                  })}
                  dataSource={selectedRequests}
                  pagination={false}
                  size="small"
                  bordered
                />
              </Col>
            </Row>
            <Row>
              <Col md={24} className="bs-stepper-nav">
                <Button type="primary" onClick={()=> setCurrent(1)}>
                  <LeftOutlined /> Prev
                </Button>
                <Button 
                  type="primary" onClick={()=> setCurrent(3)}
                  disabled={!deliveryDate || selectedRequests.filter(it => !it.unitPrice).length > 0 || selectedRequests.filter(it => !it.requestCategory).length > 0}
                >
                  Next <RightOutlined />
                </Button>
              </Col>
            </Row>
          </React.Fragment>
        )}
        {current === 3 && (
          <>
            <Row>
              <Col span={24}>
                <Table 
                  columns={confirmColumns({
                    request_categories
                  })}
                  dataSource={selectedRequests}
                  rowKey="id"
                  size="small"
                  pagination={false}
                  bordered
                />
              </Col>
            </Row>
            <Row>
              <Col md={24} className="bs-stepper-nav">
                <Button type="primary" onClick={()=> setCurrent(2)}>
                  <LeftOutlined /> Prev
                </Button>
                <Button 
                  type="primary" 
                  onClick={()=> handleSubmit()}
                  disabled={!deliveryDate || selectedRequests.filter(it => !it.unitPrice).length > 0 || selectedRequests.filter(it => !it.requestCategory).length > 0}
                >
                  SUBMIT
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  )
}

export default CreateLPO