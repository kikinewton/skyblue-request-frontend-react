import React from 'react'
import { Button, Card, Col, Row, Steps } from 'antd'
import List from './List'
import UpdatePrice from './UpdatePrice'
import { FETCH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../../util/request-types'
import Confirmation from './Confirmation'
import { CheckOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
const { Step } = Steps

const CreateLocalPurchase = (props) => {
  const  [ currentStep, setCurrentStep ] = React.useState(0)
  const [selectedSupplier, setSelectedSupplier] = React.useState(undefined)
  const [selectedRequests, setSelectedRequests] = React.useState([])
  const { fetchSuppliers, fetchRequests, resetRequests, requestSubmitting, updateRequest, fetchRequestCategories, requestSubmitSuccess } = props

  const handleSelectSupplier = (value) => {
    setSelectedRequests([])
    fetchRequests({ requestType: FETCH_REQUEST_TYPES.DOCUMENTED_REQUESTS_BY_SUPPLIER, supplierId: value })
    setSelectedSupplier(value)
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

  const handleSelectRequests = (list) => {
    setSelectedRequests(list.map(item=> {
      let data = item
      data['suppliedBy'] = selectedSupplier
      return data
    }))
  }

  

  React.useEffect(()=> {
    resetRequests()
    fetchSuppliers({requestType: "GET-REQUESTS-BY-SUPPLIER"})
    fetchRequestCategories({})
  }, [])

  const next = () => {
    setCurrentStep(currentStep + 1)
  }

  const prev = () => {
    setCurrentStep(currentStep - 1)
  }

  const done = async ()=> {
    const requestList = selectedRequests.map(item=> {
      let data = item
      data['requestCategory'] = {id: item.requestCategory}
      return data
    })
    console.log('selected requets', requestList)
    const payload = {
      updateType: UPDATE_REQUEST_TYPES.UPDATE_UNIT_PRICE,
      payload: {items: requestList}
    }
    await updateRequest(payload)
    setCurrentStep(0)
    console.log('requst submit', requestSubmitSuccess)
    setSelectedSupplier(undefined)
    setSelectedRequests([])
    resetRequests()
    setCurrentStep(0)
  }

  const displayPage = ()=> {
    console.log('current', currentStep)
    switch(currentStep) {
      case 0:
        return (<List {...props}
            onSelectRequests={(list)=> handleSelectRequests(list)}
            selectedRequests={selectedRequests}
            selectedSupplier={selectedSupplier}
            onSelectSupplier={(value)=> handleSelectSupplier(value)}
          />
          )
      case 1:
        return (<UpdatePrice {...props} 
            selectedRequests={selectedRequests} 
            onUnitPriceUpdate={handleUpdateRequestUnitPrice}
            selectedSupplier={selectedSupplier}
            onRequestCategoryUpdate={handleUpdateRequestCategory}
          />
          )
      case 2:
        return (<Confirmation {...props} 
            selectedRequests={selectedRequests}
            selectedSupplier={selectedSupplier}
          />
        )
      default:
        return "Hello"

    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <span className="bs-page-title">Create Local Purchase Order</span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Card>
            <Row>
              <Col md={24}>
                <Steps size="small" current={currentStep}>
                  <Step title="Select Requests" />
                  <Step title="Update Price" />
                  <Step title="Confirmation" />
                </Steps>
              </Col>
            </Row>
            <Row>
              <Col md={24} style={{marginTop: 20}}>
                {displayPage()}
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              <Col md={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                {currentStep > 0 && (
                  <Button type="primary" onClick={()=> prev()} style={{marginRight: 10}}>
                    <LeftOutlined />
                    Previous
                  </Button>
                )}
                {currentStep < 2 && (
                  <Button type="primary" onClick={()=> next()} style={{marginRight: 10}}>
                    Next
                    <RightOutlined />
                  </Button>
                )}
                {currentStep === 2 && (
                  <Button type="primary" onClick={()=> done()} style={{marginRight: 10}} loading={requestSubmitting} disabled={requestSubmitting}>
                    <CheckOutlined />
                    Done
                  </Button>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CreateLocalPurchase  