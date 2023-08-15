import { InfoOutlined } from '@ant-design/icons';
import { Col, Table, Row, Drawer, Card, Breadcrumb, Tooltip, Button, message, Spin } from 'antd';
import Search from 'antd/lib/input/Search';
import React, {useState } from 'react';
import { RESPONSE_SUCCESS_CODE } from '../../../services/api/apiRequest';
import { getRequestDocs } from '../../../services/api/item-request';
import FilesView from '../../../shared/FilesView';
import { REQUEST_COLUMNS } from '../../../util/constants';
import { FETCH_REQUEST_TYPES } from '../../../util/request-types';



const myCol = props => REQUEST_COLUMNS.concat([
  {
    title: "actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (
      <Tooltip title="View">
        <Button
          shape='circle'
          size='small'
          onClick={() => {
            props.onView(row)
          }}
        >
          <InfoOutlined/>
        </Button>
      </Tooltip>
    )
  }
])

const ApprovedItemRequest = (props) => {
  const {
    resetRequest,
    fetching_requests,
    filtered_requests,
  } = props 

  const [loadingData, setLoadingData] = useState(false)
  const [visible, setVisible] = useState(false)
  const [requestData, setRequestData] = useState({})



  const handleView = async (id) => {
    setLoadingData(true)
    try {
      const result = await getRequestDocs(id)
      if(result.status === RESPONSE_SUCCESS_CODE) {
        setRequestData(result.data)
      } else {
        message.error(result?.message)
      }
    } catch (error) {
      message.error('Failed to fetch request documents')
    } finally {
      setLoadingData(false)
    }
  }


  React.useEffect(()=> {
    resetRequest()
    props.fetchRequests({
      requestType: FETCH_REQUEST_TYPES.ALL_APPROVED_REQUESTS
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Row style={{marginBottom: 10}}>
        <Col span={8}>
          <Breadcrumb>
            <Breadcrumb.Item>
              Approved Request Items
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={16} style={{textAlign: 'right'}}>
          <Search 
            onChange={e => {
              console.log('value', e.target.value)
              props.filterRequests(e.target.value)
            }}
          />
        </Col>
      </Row>
      <Card>
        <Row>
          <Col span={24}>
            <Table
              loading={fetching_requests}
              size="small"
              columns={myCol({
                onView: row => {
                  setVisible(true)
                  handleView(row.id)
                }
              })}
              dataSource={filtered_requests}
              rowKey="id"
              bordered
              pagination={{
                pageSize: 30
              }}
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        forceRender
        visible={visible}
        title={`DETAILS`}
        placement="right"
        width={900}
        maskClosable={false}
        onClose={() => {
          setRequestData(null)
          setVisible(false)
        }}
      >
        <>
          {loadingData ? <Spin/> : (
            <>
              
              <Row>
                <Col span={24}>
                  {requestData && (
                    <Card size='small' title="INVOICE DOCUMENT">
                      <FilesView 
                        files={[requestData?.invoiceDoc || {}]}
                      />
                    </Card>
                  )}
                </Col>
              </Row>
              <Row style={{marginTop: 20}}>
                <Col span={24}>
                  {requestData && (
                    <Card size='small' title="QUOTATION DOCUMENT">
                      <FilesView 
                        files={[requestData?.quotationDoc || {}]}
                      />
                    </Card>
                  )}
                </Col>
              </Row>
            </>
          )}
        </>
      </Drawer>
    </>
  )
}

export default ApprovedItemRequest