import { Card, Col, Row, Upload, Button, Input, Table } from 'antd'
import { LeftOutlined, RightOutlined, UploadOutlined } from '@ant-design/icons'
import React from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { CURRENCY_CODE } from '../../../../util/constants'

const columns = (props) => [
  {
    title: 'Requested Item',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Request Category',
    dataIndex: 'requestCategory',
    key: 'requestCategory',
    render: (text, row) => row?.name
  },
  // {
  //   title: 'Received Items',
  //   dataIndex: 'replacement',
  //   key: 'replacement',
  //   render: (text, row)=> (<Input size="small" name="replacement" value={row.replacement} onChange={(event) => props.onUpdateSelectedItem(event, row)}/>)
  // },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice'
  },
  // {
  //   title: 'Invoice unit Price',
  //   dataIndex: 'invoiceUnitPrice',
  //   key: 'invoiceUnitPrice',
  //   width: '200px',
  //   render: (text, row)=> (<Input type="number" step="0.1" size="small" name="invoiceUnitPrice" value={row.invoiceUnitPrice} onChange={(event) => props.onUpdateSelectedItem(event, row)}/>)
  // },
]
const CreateGrn = (props) => {
  const { selectedItems, onFormDataChange, formData, file, onFileUpload, onFileRemove } = props

  const handleFormInputChange = (event) => {
    onFormDataChange(event)
  }

  const handleFileRemove = ()=> {
    onFileRemove()
  }
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <Card title="Invoice">
            <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
              <div style={{marginBottom: 20, height: 200, display: 'flex', 
                flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Upload
                  {...props} 
                  multiple={false} 
                  onRemove={handleFileRemove} 
                  customRequest={({file, onSuccess})=> {
                    setTimeout(()=> {
                      onSuccess("ok")
                    }, 0)
                    onFileUpload(file)
                  }}
                  fileList={[file || []]}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </div>
              
              <Row>
                <Col md={4}>Invoice Number</Col>
                <Col md={20}>
                  <Input 
                    placeholder="Invoice Number" 
                    value={formData.invoiceNumber}
                    onChange={handleFormInputChange} 
                    style={{marginBottom: 20}}
                    name="invoiceNumber"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4}>Invoice Amount Payable: </Col>
                <Col md={20}>
                  <Input 
                    prefix={CURRENCY_CODE}
                    placeholder="Amount" 
                    type="number"
                    step="0.1"
                    min="0"
                    name="invoiceAmountPayable"
                    value={formData.invoiceAmountPayable}
                    onChange={handleFormInputChange} 
                    style={{marginBottom: 20}}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4}>Number of Days to payment: </Col>
                <Col md={20}>
                  <Input 
                    placeholder="Number of Days to payment" 
                    type="number"
                    value={formData.numberOfDaysToPayment} 
                    name="numberOfDaysToPayment" 
                    onChange={handleFormInputChange} 
                    style={{marginBottom: 20}}
                  />
                </Col>
              </Row>
              
            </div>
          </Card>
        </Col>
      </Row>
      <Row style={{marginTop: 30}}>
        <Col md={24}>
          <Card title="Goods Received">
            <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
              <TextArea 
                name="comment" 
                placeholder="Comment" 
                value={formData.comment} 
                onChange={(event)=> handleFormInputChange(event)} 
                rows={4} style={{marginBottom: 20}} 
              />
              <Table 
                columns={columns({...props})}
                size="small"
                bordered
                dataSource={selectedItems}
                pagination={false}
                rowKey="id"
              />
            </div>
          </Card>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col md={12}>
          <Button type="primary" onClick={()=> props.onStep(0)}>
            <LeftOutlined /> Prev
          </Button>
        </Col>
        <Col md={12}>
          <Button 
            style={{float: 'right'}} 
            type="primary" 
            onClick={()=> props.onStep(2)}
            disabled={!formData.invoiceNumber || 
                !formData.invoiceAmountPayable || 
                !formData.numberOfDaysToPayment ||
                !file
              }
          >
            Next <RightOutlined />
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CreateGrn