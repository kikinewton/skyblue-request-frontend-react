import { Card, Col, PageHeader, Row, Steps, List, Spin } from 'antd'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import ItemList from './ItemList'
import * as grnService from '../../../../services/api/goods-receive-note'
import * as documentService from '../../../../services/api/document'
import openNotification from '../../../../util/notification'
import CreateGrn from './CreateGrn'
import Confirm from './Confirm'
import { RESPONSE_SUCCESS_CODE } from '../../../../services/api/apiRequest'
const { Step } = Steps

const initForm = { 
  invoiceNumber: "", 
  invoiceAmountPayable: "", 
  numberOfDaysToPayment: "",
  comment: "" 
}

const ReceiveItems = (props) => {
  const [ current, setCurrent ] = React.useState(0)
  const [ selectedItems, setSelectedItems ] = React.useState([])
  const [items, setItems] = React.useState([])
  const { lpoId } = useParams()
  const [formData, setFormData] = React.useState(initForm)
  const [file, setFile] = React.useState([])
  const { 
    currentUser,
    fetchLocalPurchaseOrder,
    local_purchase_order,
    fetching_local_purchase_orders
  } = props
  const [submitting, setSubmitting] = React.useState(false)
  const history = useHistory()

  const handleSelectedItemUpdate = (event, row) => {
    const name = event.target.name
    const value = event.target.value
    setItems(items.map(item=> {
      let data = item
      if(item.id === row.id) {
        data[name] = value
        return data
      }
      return data
    }))
  }

  const handleItemSelect = (keys, rows) => {
    setSelectedItems(rows.map(item=> {
      let data = item
      data['invoiceUnitPrice'] = item.unitPrice
      data['receivedStatus'] = true
      data['replacement'] = item.name
      return data
    }))
  }

  const handleFormDataChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData({...formData, [name] : value})
  }

  const handleOnStep = (value) => {
    setCurrent(value)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const suppliers = (local_purchase_order?.requestItems || [])[0].suppliers
      const supplierId = local_purchase_order?.supplierId
      const supplier = suppliers.find(item => item.id === supplierId)
      const uploadFileResponse = await documentService.saveSingleDocument({file: file, employeeId: currentUser.id})
      if(uploadFileResponse.status === 'SUCCESS') {
        const doc = uploadFileResponse?.data
        const payload = {
          invoice: {
            invoiceDocument: doc,
            invoiceNumber: formData.invoiceNumber,
            numberOfDaysToPayment: parseInt(formData.numberOfDaysToPayment) || 0,
            supplier: supplier
          },
          invoiceAmountPayable: parseInt(formData.invoiceAmountPayable),
          localPurchaseOrder: local_purchase_order,
          comment: formData.comment,
          requestItems: selectedItems
        }
        const response = await grnService.createGoodsReceiveNote(payload)
        if(response.status === RESPONSE_SUCCESS_CODE) {
          setSelectedItems([])
          setFormData(initForm)
          setFile([])
          history.push("/app/store/grn-success")
        } else {
          return openNotification('error', 'Create Goods Receive Note', response.mesage)
        }
      } else {
        openNotification('error', 'Upload Invoice', 'Upload failed, Please ensure correct file format is selected!')
      }
      setSubmitting(false)
    } catch (error) {
      openNotification('error', 'Create Goods Receive Note', error.message || 'failed!')
    }
    setSubmitting(false)
  }

  React.useEffect(()=> {
    fetchLocalPurchaseOrder(lpoId) // eslint-disable-next-line
  }, [lpoId])

  return (
    <React.Fragment>
      <Row>
        <Col>
          <PageHeader 
            title="Create Goods Receive Note Form"
            onBack={() => history.goBack()}
            style={{padding: 0}}
          />
        </Col>
      </Row>
      {fetching_local_purchase_orders ? <Spin /> : (
        <Row>
          <Col md={24}>
            <Card>
              <Row>
                <Col md={24}>
                  <Steps current={current} size="small">
                    <Step title="Select Items Received" />
                    <Step title="Create Item Receive Note" />
                    <Step title="Confirm" />
                  </Steps>
                </Col>
              </Row>
              <Row style={{borderRadius: 10, backgroundColor: "#b4ccfa", padding: 10, margin: "5px 0px 5px 0px"}}>
                <Col span={24}>
                  <List>
                    <List.Item>
                      <List.Item.Meta title="Local Purchase Order Reference" description={local_purchase_order?.lpoRef} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta 
                        title="Supplier" 
                        description={((local_purchase_order?.requestItems || [])[0]?.suppliers?.filter(s => s.id === local_purchase_order?.supplierId) || [])[0]?.name} />
                    </List.Item>
                  </List>
                </Col>
              </Row>
              <Row style={{marginTop: 20}}>
                <Col md={24}>
                  {current === 0 && (<ItemList loading={fetching_local_purchase_orders} {...props} items={local_purchase_order?.requestItems} selectedItems={selectedItems} onItemSelect={handleItemSelect} onStep={(value)=>handleOnStep(value)} />)}
                  {current === 1 && (<CreateGrn {...props} items={items} selectedItems={selectedItems} formData={formData} onFormDataChange={handleFormDataChange} 
                    onItemSelect={handleItemSelect} onStep={(value)=>handleOnStep(value)} onUpdateSelectedItem={handleSelectedItemUpdate} 
                    file={file} onFileUpload={(fl)=> setFile(fl)} onFileRemove={()=> setFile(undefined)}
                  />)
                  }
                  {current === 2 && (<Confirm {...props} selectedItems={selectedItems} formData={formData} onSubmit={handleSubmit} onStep={handleOnStep} submitting={submitting} />)}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </React.Fragment>
  )
}

export default ReceiveItems