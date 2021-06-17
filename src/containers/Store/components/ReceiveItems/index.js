import { Card, Col, Row, Steps } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import ItemList from './ItemList'
import * as grnService from '../../../../services/api/goods-receive-note'
import * as documentService from '../../../../services/api/document'
import openNotification from '../../../../util/notification'
import CreateGrn from './CreateGrn'
import Confirm from './Confirm'
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
  const [lpo, setLpo] = React.useState({})
  const [items, setItems] = React.useState([])
  const { lpoId } = useParams()
  const [formData, setFormData] = React.useState(initForm)
  const [file, setFile] = React.useState([])
  const { currentUser } = props
  const [submitting, setSubmitting] = React.useState(false)
  const [ loading, setLoading ] = React.useState(false)

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
    // const suppliers = (lpo.requestItems || [])[0].suppliers
    // console.log('supliers', suppliers)
    // const supplierId = lpo.supplierId
    // const supplier = suppliers.find(item => item.id === supplierId)
    // console.log('supplier', supplier)
    try {
      const suppliers = (lpo.requestItems || [])[0].suppliers
      console.log('supliers', suppliers)
      const supplierId = lpo.supplierId
      const supplier = suppliers.find(item => item.id === supplierId)
      console.log('supplier', supplier)
      const uploadFileResponse = await documentService.saveDocument({file: file, employeeId: currentUser.id})
      console.log('upldoa response', uploadFileResponse)
      if(uploadFileResponse.status === 'SUCCESS') {
        const doc = uploadFileResponse?.data[0]
        console.log('lpo', lpo)
        const payload = {
          invoice: {
            invoiceDocument: doc,
            invoiceNumber: formData.invoiceNumber,
            numberOfDaysToPayment: parseInt(formData.numberOfDaysToPayment) || 0,
            supplier: supplier
          },
          invoiceAmountPayable: parseInt(formData.invoiceAmountPayable),
          localPurchaseOrder: lpo,
          comment: formData.comment,
          requestItems: selectedItems
        }
        console.log('data', payload)
        const response = await grnService.createGoodsReceiveNote(payload)
        if(response.status === 'OK') {
          setSelectedItems([])
          setFormData(initForm)
          setFile([])
          window.location.href = "/#app/stores/grn-success"
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

  const fetchLpo = async ()=> {
    setLoading(true)
    try {
      const lposResponse = await grnService.getGoodsReceiveNoteWithoutGRN({})
      console.log('lpos', lposResponse)
      if(lposResponse.status === 'OK') {
        const lpoData = lposResponse.data?.filter(item => item.id === parseInt(lpoId))[0]
        setLpo(lpoData)
        setItems(lpoData.requestItems)
      }
    } catch (error) {
      openNotification('error', 'fetch LPO', 'failed!')
    }
    setLoading(false)
  }

  React.useEffect(()=> {
    fetchLpo() // eslint-disable-next-line
  }, [lpoId])

  return (
    <React.Fragment>
      <Row>
        <Col>
          <span className="bs-page-title">Receive Items Form</span>
        </Col>
      </Row>
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
            <Row style={{marginTop: 20}}>
              <Col md={24}>
                {current === 0 && (<ItemList loading={loading} {...props} items={items} selectedItems={selectedItems} onItemSelect={handleItemSelect} onStep={(value)=>handleOnStep(value)} />)}
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
    </React.Fragment>
  )
}

export default ReceiveItems