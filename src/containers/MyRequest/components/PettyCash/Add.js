import React, { useState } from 'react'
import { Card, Col, Form, Row, Table, Input, Button, Steps, Upload, message, Checkbox } from 'antd'
import { CheckOutlined, LeftOutlined, RightOutlined, MinusOutlined, UploadOutlined, UserOutlined, FileAddOutlined } from '@ant-design/icons'
import { clearLocalState, getLocalState, storeLocalState } from '../../../../services/app-storage'
import { saveDocument } from "../../../../services/api/document"
import { RESPONSE_SUCCESS_CODE } from '../../../../services/api/apiRequest'
import AppLayout from '../../../AppLayout'
import MyPageHeader from '../../../../shared/MyPageHeader'
import { useHistory } from 'react-router-dom'
import { CURRENCY_CODE } from '../../../../util/constants'

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
    align: "right",
    render: (text, row) => (<Button size="small" type="primary" onClick={()=> props.removeEntry(row)}><MinusOutlined /></Button>)
  }
]

const AddNewRequest = (props) => {
  const [requests, setRequests] = React.useState([])
  const [current, setCurrent] = React.useState(0)
  const [files, setFiles] = React.useState([])
  const [uploading, setUploading] = React.useState(false)
  const [userDetails, setUserDetails] = useState({name: "", phoneNo: "", staffId: ""})
  const [document, setDocument] = React.useState(null)
  const { submit_petty_cash_request_success, createPettyCashRequest, submitting_petty_cash_request } = props
  const [ form ] = Form.useForm()
  const descriptionRef = React.createRef()
  const history = useHistory()

  const uploadFile = async (file) => {
    setUploading(true)
    try {
      const response = await saveDocument({
        files: file
      })
      console.log('upload doc', response)
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
    const { name, reason, purpose, unitPrice, quantity } = values
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
        rq["documents"] = [document]
        return rq
      }),
      requestedBy: userDetails.name,
      requestedByPhoneNo: userDetails.phoneNo,
      staffId: userDetails.staffId
    }
    createPettyCashRequest(payload)
  }

  React.useEffect(() => {
    if(!submitting_petty_cash_request && submit_petty_cash_request_success) {
      setRequests([])
      setDocument(null)
      clearLocalState("NEW-PETTY-CASH-REQUEST")
      setCurrent(0)
      history.push("/app/my-requests/petty-cash-requests")
    }
  }, [submit_petty_cash_request_success, submitting_petty_cash_request])

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
      <AppLayout>
        <MyPageHeader 
          title="Create New Petty Cash Entries"
          onBack={() => history.goBack()}
        />
        <Card
          size="small"
          title="Create New Petty Cash Form"
        >
        <Row style={{marginBottom: 30, marginTop: 30}}>
          <Col span={16} offset={4}>
            <Steps
              size="small"
              current={current}
            >
              <Steps.Step icon={<UserOutlined size="small" />} title="Employee Basic Info" />
              <Steps.Step icon={<UploadOutlined size="small" />} title="Upload Petty Cash Document" />
              <Steps.Step icon={<FileAddOutlined size="small" /> } title="Add Petty Cash Entries" />
            </Steps>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {current === 0 && (
              <>
                <Row style={{padding: "10px 0 10px 0"}}>
                  <Col span={24}>
                    <Card title="User Details" size='small'>
                      <Form 
                        layout="vertical"
                        requiredMark
                      >
                        <Form.Item label="Name"
                          required
                          rules={[
                            {required: true, message: "Employee Name Required!"}
                          ]}
                        >
                          <Input 
                            type="text"
                            value={userDetails.name}
                            onChange={(event) => setUserDetails({...userDetails, name: event.target.value})}
                          />
                        </Form.Item>
                        <Form.Item label="Staff ID" 
                          required
                          rules={[
                            {required: true, message: "Employee Staff ID Required!"}
                          ]}
                        >
                          <Input
                            type="text"
                            value={userDetails.staffId}
                            onChange={(event) => setUserDetails({...userDetails, staffId: event.target.value})}
                          />
                        </Form.Item>
                        <Form.Item label="Phone Number">
                          <Input 
                            type="text"
                            value={userDetails.phoneNo}
                            onChange={(event) => setUserDetails({...userDetails, phoneNo: event.target.value})}
                          />
                        </Form.Item>
                      </Form>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Button 
                      style={{float: "right"}} 
                      type='primary' 
                      onClick={() => setCurrent(1)}
                      disabled={!userDetails.name || !userDetails.staffId}
                    >
                      Next (Upload Supporting Documents)
                      <RightOutlined />
                    </Button>
                  </Col>
                </Row>
              </>
            )}
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
                        setTimeout(()=> {
                          onSuccess("ok")
                        }, 0)
                        uploadFile(file)
                      }}
                      defaultFileList={files}
                      multiple={false}
                      maxCount={1}
                      accept=".pdf,.png,.jpg"
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
                <Col md={8}>
                  <Card>
                  <Row>
                    <Col md={24}>
                      <Form
                        size="middle"
                        layout="vertical"
                        form={form}
                        name="request-entry"
                        initialValues={{ name: "", purpose: "", quantity: "", departmentId: undefined, unit_price: "", isService: true }}
                        onFinish={addToEntires}
                      >
                        <Form.Item label="Description" name="name" rules={[{ required: true, message: 'Description required' }]}>
                          <Input.TextArea rows={3} ref={descriptionRef} placeholder="Description" />
                        </Form.Item>
                        <Form.Item label="Purpose" name="purpose" rules={[{ required: true, message: 'Purpose required' }]}>
                          <Input  placeholder="Purpose" />
                        </Form.Item>
                        <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Quantity required' }]}>
                          <Input type="number"  placeholder="Quantity" />
                        </Form.Item>
                        <Form.Item label="Unit Price" name="unitPrice" rules={[{ required: true, message: 'Unit Price required' }]}>
                          <Input prefix={CURRENCY_CODE} type="number"  placeholder="Unit Price" />
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
                <Col md={16}>
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
                        SUBMIT PETTY CASH REQUESTS
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
          </Col>
        </Row>
        </Card>
      </AppLayout>
    </>
  )
}

export default AddNewRequest