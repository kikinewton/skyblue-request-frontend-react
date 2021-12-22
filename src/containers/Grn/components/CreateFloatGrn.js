import { Row, Col, Steps, Card, Input, Table, Select, Button, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../services/api/urls'
import MyPageHeader from '../../../shared/MyPageHeader'
import { FLOAT_COLUMNS } from '../../../util/constants'
import { FETCH_FLOAT_REQUEST_TYPES } from '../../../util/request-types'
import { saveSingleDocument } from "../../../services/api/document"
import { RESPONSE_SUCCESS_CODE } from '../../../services/api/apiRequest'
const { Option } = Select

const floatColumns = FLOAT_COLUMNS.concat([

])

const CreateFloatGrn = (props) => {
  const {
    filtered_float_requests,
    fetching_float_requests,
    employees,
    fetchEmployees,
    fetchFloatRequests,
    fetching_employees,
    resetFloatRequest,
    resetEmployee,
    filterFloatRequests,
  } = props
  const [current, setCurrent] = useState(0)
  const [selectedFloats, setSelectedFloats] = useState([])
  const [files, setFiles] = useState([])
  const [loadingDocument, setLoadingDocument] = useState(false)

  useEffect(() => {
    resetEmployee()
    resetFloatRequest()
    fetchEmployees({})
    fetchFloatRequests({
      requestType: FETCH_FLOAT_REQUEST_TYPES.PENDING_GRN
    })
  }, [])
  
  return (
    <>
      <MyPageHeader title="Create Goods Receive Note For Float" />
      <Row style={{padding: "5px 0 5px 0"}}>
        <Col span={24}>
          <Steps current={current} size='small'> 
            <Steps.Step title="Select User Floats" key={0} />
            <Steps.Step title="Upload Supporting Documents" />
          </Steps>
        </Col>
      </Row>
      <Card>
        <Row>
          <Col span={24}>
            {current===0 && (
              <>
                <Row style={{padding: "10px 0 10px 0"}}>
                  <Col span={18}>
                    <span style={{marginRight: 5}}>Filter: </span>
                    <Select
                      style={{width: 400}}
                      loading={fetching_employees}
                      showSearch
                      placeholder="Select User"
                      optionFilterProp="children"
                      onChange={value => {
                        setSelectedFloats([])
                        filterFloatRequests(value || "")
                      }}
                      onSearch={value => {
                        
                      }}
                      filterOption={(input, option) => {
                        return option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)
                      }}
                    >
                      {employees && employees.map(emp => (
                        <Option key={emp?.id} value={emp?.fullName}>{emp?.fullName}</Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={6}>
                    <Button 
                      style={{float: "right"}} 
                      type='primary'
                      onClick={() => setCurrent(1)}
                      disabled={selectedFloats.length < 1}
                    >
                      Next
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Table
                      columns={floatColumns}
                      dataSource={filtered_float_requests}
                      rowKey="id"
                      size='small'
                      bordered
                      pagination={{pageSize: 30}}
                      rowSelection={{
                        onChange: (selectedRowKeys, selectedRows) => {
                          setSelectedFloats(selectedRows.map(it => Object.assign({}, it)))
                        },
                        selectedRowKeys: selectedFloats.map(it => it.id)
                      }}
                    />
                  </Col>
                </Row>
              </>
            )}
            {current === 0 && (
              <Row>
                <Col span={24}>
                  <spa>Upldoad tatdaj</spa>
                  <Upload 
                    customRequest={async(file) => {
                      console.log('file', file)
                      setLoadingDocument(true)
                      try {
                        const response = await saveSingleDocument({file: file?.file})
                        setLoadingDocument(false)
                        if(response.status === RESPONSE_SUCCESS_CODE) {
                          const dt = response?.data
                          setFiles(files.concat({
                            ...dt,
                            name: dt?.fileName,
                            size: dt?.fileSize,
                            uid: dt?.id,
                            // url: `${BASE_URL}/requestDocument/download/${dt?.fileName}`
                            url: dt?.fileDownloadUri
                          }))
                        }
                      } catch (error) {
                        setLoadingDocument(false)
                      }
                      

                    }}
                    // action={`${BASE_URL}/requestDocument`}
                    listType="picture-card"
                    fileList={files}
                    onChange={() => {
                      console.log('cahnge')
                    }}
                  >
                    <Button loading={loadingDocument} type='default'>Upload File</Button>
                  </Upload>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default CreateFloatGrn