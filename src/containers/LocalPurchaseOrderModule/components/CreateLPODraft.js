import { RightOutlined, LeftOutlined, DownloadOutlined, CheckOutlined } from '@ant-design/icons'
import { Document, Page, PDFViewer } from '@react-pdf/renderer'
import { Card, Col, Row, Steps, Select, Table, Button, Input, DatePicker, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import MyPdfView from '../../../presentation/MyPdfView'
import { generateResourceUrl } from '../../../services/api/document'
import { BASE_URL } from '../../../services/api/urls'
import { filterQuotations } from '../../../services/redux/quotation/reducers'
import { formatCurrency, prettifyDateTime } from '../../../util/common-helper'
import { CURRENCY_CODE } from '../../../util/constants'
import { CURRENCIES } from '../../../util/datas'
import { NOT_LINKED_TO_LPO, QUOTATIONS_BY_SUPPLIER } from '../../../util/quotation-types'
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
    render: (text, row) => (
      <Button size="small" onClick={() => props.onSelect(row)} type={props.selectedQuotation?.id === row.id ? "primary" : "default"}>
        <RightOutlined />
      </Button>
    )
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
  },
  {
    title: 'Unit price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    render: (text, row) => {
      return (
        <Input 
          prefix={props.currency}
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
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
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
    render: (text) => `${formatCurrency(text,props.currency)}`
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
    fetching_quotations,
    resetQuotation,
    fetchQuotations,
    filterQuotations,
    filtered_quotations,

    createLocalPurchaseOrderDraft,
    submitting_local_purchase_order,
    submit_local_purchase_order_success,
  } = props

  const [current, setCurrent] = useState(0)
  const [selectedSupplier, setSelectedSupplier] = useState(undefined)
  const [selectedQuotation, setSelectedQuotation] = useState(null)
  const [selectedRequests, setSelectedRequests] = useState([])
  const [deliveryDate, setDeliveryDate] = useState(null)
  const [imageVisible, setImageVisible] = useState(false)
  const [currency, setCurrency] = useState("GHS")

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
      quotationId: selectedQuotation?.quotation?.id,
      items: selectedRequests.map(rq => {
        let data = rq
        data["requestCategory"] = request_categories.find(it => it.id === rq.requestCategory)
        data["suppliedBy"] = selectedQuotation?.quotation?.supplier?.id
        data['currency'] = currency
        return data;
      })
    }
    console.log('payload', payload)
    createLocalPurchaseOrderDraft(payload)
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
    props.resetQuotation()
    //props.resetRequestCategory()
    //fetchSuppliers({suppliersWithRQ: true})
    fetchQuotations({
      requestType: NOT_LINKED_TO_LPO
    })
    props.fetchRequestCategories({})
  }, [])

  useEffect(() => {
    if(!submitting_local_purchase_order && submit_local_purchase_order_success) {
      setCurrent(0)
      setSelectedSupplier(null)
      setSelectedQuotation(null)
      setSelectedRequests([])
      resetQuotation()
      fetchQuotations({
        requestType: NOT_LINKED_TO_LPO
      })
    }
  }, [submit_local_purchase_order_success, submit_local_purchase_order_success])

  return (
    <>
      <Row>
        <Col span={24}>
          <Steps current={current} size="small">
            <Steps.Step title="Select Quotation" />
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
                <span style={{fontWeight: "bold"}}>Selected Quotation: {selectedQuotation?.quotation?.quotationRef || "N/A"}</span>
              </Col>
            </Row>
            <Row style={{padding: "10px 0px 10px 0px"}}>
              <Col span={24}>
                <Input 
                  type="search"
                  style={{width: 300}}
                  onChange={(event) => filterQuotations(event.target.value)}
                  placeholder="Search By Supplier / reference"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table 
                  columns={quotationColumns({
                    onSelect: (row) => { 
                      console.log('selected quotation', row)
                      setSelectedQuotation(row) 
                      setCurrent(1)
                    },
                    selectedQuotation: selectedQuotation
                  })}
                  loading={fetching_quotations}
                  size="small"
                  dataSource={filtered_quotations}
                  pagination={false}
                  bordered
                />
              </Col>
            </Row>
            {/* <Row style={{padding: "10px 0px 10px 0px"}}>
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
            </Row> */}
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
                  dataSource={selectedQuotation?.requestItems.filter(it => !it?.unitPrice)}
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
                    setSelectedRequests([])
                    setCurrent(0)
                  }}
                  style={{float: "left"}}
                >
                  <LeftOutlined />
                  Previous
                </Button>
                <Button type="primary"
                  onClick={() => {
                    setCurrent(2)
                  }}
                  style={{float: "right"}}
                  disabled={!selectedQuotation?.quotation?.quotationRef || selectedRequests.length < 1}
                >
                  Next (Update Unit Price And Product Category)
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
                    <Col md={6}>
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
                    <Col md={1}></Col>
                    <Col md={5}>Currency</Col>
                    <Col md={6}>
                        <Select
                          style={{width: "100%"}} 
                          disabled={selectedRequests.filter(item => item.unitPrice).length > 0} value={currency} 
                          onChange={value => setCurrency(value)}
                        >
                          {CURRENCIES.map(c => (
                            <Select.Option key={c?.code} value={c?.code}>{c?.name}</Select.Option>
                          ))}
                        </Select>
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
                  <MyPdfView 
                    src={generateResourceUrl(selectedQuotation?.quotation?.requestDocument?.fileName)}
                  />
                  // <a href={`${BASE_URL}/requestDocument/download/${selectedQuotation?.quotation?.requestDocument?.fileName}`}><DownloadOutlined /> Download PDF</a>
                  // <div style={{width: "100%", height: "auto", display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center"}}>
                  //   <PDFViewer>
                  //     <Document>
                  //       <Page size="A4" style={{flexDirection: 'row',backgroundColor: '#E4E4E4'}}>

                  //       </Page>
                  //     </Document>
                  //   </PDFViewer>
                  //   <div style={{height: "100%",display: "flex", flexDirection: "row", alignItems: "center"}}>
                  //     <span style={{fontWeight: "bold"}}>Quotation Document</span>
                  //   </div>
                  // </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <Table 
                  columns={updatePriceColumns({
                    request_categories: props.request_categories,
                    onRequestCategoryChange: (row, value) => handleUpdateRequestCategory(row, value),
                    onPriceChange: (row, value) => handleUpdateRequestUnitPrice(row, value),
                    currency: currency
                  })}
                  dataSource={selectedRequests}
                  pagination={false}
                  size="small"
                  bordered
                  rowKey="id"
                />
              </Col>
            </Row>
            <Row>
              <Col md={24} className="bs-stepper-nav">
                <Button type="primary" onClick={()=> {
                  setCurrent(1)
                }}>
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
                    request_categories,
                    currency: currency
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
                  loading={submitting_local_purchase_order} 
                  type="primary" 
                  onClick={()=> handleSubmit()}
                  disabled={!deliveryDate || submitting_local_purchase_order || selectedRequests.filter(it => !it.unitPrice).length > 0 || selectedRequests.filter(it => !it.requestCategory).length > 0}
                >
                  <CheckOutlined />
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