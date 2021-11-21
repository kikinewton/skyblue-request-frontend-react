import React from 'react'
import { Card, Col, Form, Row, Table, Input, Button, Steps, Upload, message } from 'antd'
import { CheckOutlined, LeftOutlined, RightOutlined, MinusOutlined, UploadOutlined } from '@ant-design/icons'
import { clearLocalState, getLocalState, storeLocalState } from '../../../../services/app-storage'
import { saveDocument } from "../../../../services/api/document"
import { RESPONSE_SUCCESS_CODE } from '../../../../services/api/apiRequest'

const columns = (props) => [
  {
    title: 'Description',
    dataIndex: 'name',
    key: "name"
  },
  {
    title: 'Purpose',
    dataIndex: 'purpose',
    key: "purpose"
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: "quantity"
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: "unitPrice"
  },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
    render: (text, row) => (<Button size="small" type="primary" onClick={()=> props.removeEntry(row)}><MinusOutlined /></Button>)
  }
]

const AddNewRequest = (props) => {
  const [requests, setRequests] = React.useState([])
  const [current, setCurrent] = React.useState(1)
  const [files, setFiles] = React.useState([])
  const [uploading, setUploading] = React.useState(false)
  const [document, setDocument] = React.useState(null)
  const { submit_petty_cash_request_success, createPettyCashRequest, submitting_petty_cash_request } = props
  const [ form ] = Form.useForm()
  const descriptionRef = React.createRef()

  const uploadFile = async (file) => {
    setUploading(true)
    try {
      const response = await saveDocument({
        files: file
      })
      if(response.status === RESPONSE_SUCCESS_CODE) {
        setDocument(response?.data[0])
      } else {
        message.error("upload petty cash", "Failed to upload file")
      }
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }

  const addToEntires = (values) => {
    const { name, reason, purpose, unitPrice, departmentId, quantity } = values
    const id = requests.length + 2;
    const data = {id: id, name, reason, purpose, unitPrice, quantity}
    const list = requests.concat([data])
    storeLocalState("NEW-PETTY-CASH-REQUEST", list)
    setRequests(list)
    form.resetFields()
    descriptionRef.current.focus()
  }

  const removeEntry = (item) => {
    const entries = requests.filter(it => it.id !== item.id)
    setRequests(entries)
    storeLocalState("NEW-PETTY-CASH-REQUEST", entries)
  }


  const handleSubmit = async ()=> {
    const payload = {
      items: requests.map(item => {
        let rq = item
        rq["document"] = document
        return rq
      }),
    }
    console.log("request petty cash", payload)
    createPettyCashRequest(payload)
  }

  React.useEffect(() => {
    if(submit_petty_cash_request_success) {
      setRequests([])
      setDocument(null)
      clearLocalState("NEW-PETTY-CASH-REQUEST")
    }
  }, [submit_petty_cash_request_success])

  React.useEffect(()=> {
    const localData = getLocalState("NEW-PETTY-CASH-REQUEST")
    if(localData) {
      const fd = JSON.parse(localData)
      setRequests(fd)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      
      <Card
        size="small"
        title="Create New Petty Cash Form"
      >
      <Row style={{marginBottom: 30, marginTop: 30}}>
        <Col span={16} offset={4}>
          <Steps
            size="small"
            current={1}
          >
            <Steps.Step title="Upload Petty Cash Document" status={document ? "finish" : ""} />
            <Steps.Step title="Add Petty Cash Entries" status={current !==2 ? "wait" : ""} />
          </Steps>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {current === 1 && (
            <>
              <Card style={{minHeight: 300}} title="Upload Petty Cash Document">
              <Row>
                <Col span={24}>
                  <Upload
                    listType="picture"
                    defaultFileList={[...files]}
                    action={false}
                    customRequest={({file, onSuccess}) => {
                      console.log('file', file)
                      setTimeout(()=> {
                        onSuccess("ok")
                      }, 0)
                      uploadFile(file)
                    }}
                    // onChange={file => {
                    //   console.log('file uploadded', file)
                    //   setFiles([file])
                    //   uploadFile(file)
                    // }}
                    defaultFileList={files}
                    multiple={false}
                    maxCount={1}
                  >
                    <Button loading={uploading} disabled={uploading} icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Col>
              </Row>
              </Card>
              <Row>
                <Col span={24} style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                  <Button disabled type="primary">
                    <LeftOutlined/>
                  </Button>
                  <Button type="primary" onClick={()=> setCurrent(2)} >
                    Add Entries
                    <RightOutlined />
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {current === 2 &&
            <Row gutter={24}>
              <Col md={6}>
                <Card>
                <Row>
                  <Col md={24}>
                    <Form
                      size="middle"
                      layout="vertical"
                      form={form}
                      name="request-entry"
                      initialValues={{ name: "", purpose: "", quantity: "", departmentId: undefined, unit_price: "" }}
                      onFinish={addToEntires}
                    >
                      <Form.Item label="Description" name="name" rules={[{ required: true, message: 'Description required' }]}>
                        <Input ref={descriptionRef} placeholder="Description" />
                      </Form.Item>
                      <Form.Item label="Purpose" name="purpose" rules={[{ required: true, message: 'Purpose required' }]}>
                        <Input  placeholder="Purpose" />
                      </Form.Item>
                      <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Quantity required' }]}>
                        <Input type="number"  placeholder="Quantity" />
                      </Form.Item>
                      <Form.Item label="Unit Price" name="unitPrice" rules={[{ required: true, message: 'Unit Price required' }]}>
                        <Input type="number"  placeholder="Unit Price" />
                      </Form.Item>
                      <Form.Item>
                      <Button type="primary" htmlType="submit" className="bs-form-button">
                        Add Entry
                      </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
                </Card>
              </Col>
              <Col md={18}>
                <Card>
                  <Row>
                    <Col md={24}>
                      <Table 
                        columns={columns({
                          removeEntry: (row) => removeEntry(row)
                        })}
                        dataSource={requests}
                        pagination={false}
                        size="small"
                        rowKey="id"
                      />
                    </Col>  
                  </Row>
                </Card>
                <Row>
                  <Col md={24} style={{textAlign: 'right', marginTop: 10, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Button
                      onClick={()=> setCurrent(1)}
                    >
                      <LeftOutlined />
                      Upload File
                    </Button>
                    <Button 
                      type="primary" 
                      onClick={handleSubmit} 
                      loading={submitting_petty_cash_request} 
                      disabled={submitting_petty_cash_request || requests.length < 1}
                    >
                      <CheckOutlined />
                      SUBMI PETTY CASH REQUESTS
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          }
        </Col>
      </Row>
      </Card>
    </>
  )
}

export default AddNewRequest