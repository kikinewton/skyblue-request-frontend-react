import React from 'react'
import { Card, Col, Row, Steps } from 'antd'
import List from './List'
import UpdatePrice from './UpdatePrice'
import { FETCH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../../util/request-types'
import Confirmation from './Confirmation'
const { Step } = Steps

const CreateLocalPurchase = (props) => {
  const  [ currentStep, setCurrentStep ] = React.useState(0)
  const [selectedSupplier, setSelectedSupplier] = React.useState(undefined)
  const [selectedRequests, setSelectedRequests] = React.useState([])
  const { fetchSuppliers, fetchRequests, resetRequest, updateRequest, requestSubmitting, fetchRequestCategories, requestSubmitSuccess } = props

  const handleSelectSupplier = (value) => {
    if(!value) {
      setSelectedRequests([])
      resetRequest()
      return
    }
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
    resetRequest()
    fetchSuppliers({suppliersWithRQ: true})
    fetchRequestCategories({}) // eslint-disable-next-line
  }, [])

  const done = ()=> {
    const requestList = selectedRequests.map(item=> {
      let data = item
      data['requestCategory'] = {id: item.requestCategory}
      return data
    })
    const payload = {
      updateType: UPDATE_REQUEST_TYPES.UPDATE_UNIT_PRICE,
      payload: {items: requestList}
    }
    updateRequest(payload)
  }

  const onStep = (value) => {
    setCurrentStep(value)
  }

  const displayPage = ()=> {
    console.log('current', currentStep)
    switch(currentStep) {
      case 0:
        return (<List {...props}
            onStep={onStep}
            onSelectRequests={(list)=> handleSelectRequests(list)}
            selectedRequests={selectedRequests}
            selectedSupplier={selectedSupplier}
            onSelectSupplier={(value)=> handleSelectSupplier(value)}
          />
          )
      case 1:
        return (<UpdatePrice {...props} 
            onStep={onStep}
            onDone={done}
            selectedRequests={selectedRequests} 
            onUnitPriceUpdate={handleUpdateRequestUnitPrice}
            selectedSupplier={selectedSupplier}
            onRequestCategoryUpdate={handleUpdateRequestCategory}
          />
          )
      case 2:
        return (<Confirmation {...props} 
            onStep={onStep}
            onDone={done}
            submitting={requestSubmitting}
            requestSubmitSuccess={requestSubmitSuccess}
            selectedRequests={selectedRequests}
            selectedSupplier={selectedSupplier}
          />
        )
      default:
        return "Hello"

    }
  }

  React.useEffect(()=> {
    if(!requestSubmitting) {
      fetchSuppliers({ suppliersWithRQ: true })
      setCurrentStep(0)
      setSelectedSupplier(undefined)
      setSelectedRequests([])
      resetRequest()
      setCurrentStep(0)
    }
    // eslint-disable-next-line
  }, [requestSubmitSuccess])

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
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CreateLocalPurchase  