import { Card, Col, PageHeader, Row, Steps } from 'antd'
import React from 'react'
import LpoList from './LpoList'
import * as grnService from '../../../../services/api/goods-receive-note'
import * as documentService from '../../../../services/api/document'
import UploadInvoice from './UploadInvoice'
import AddInvoice from './AddInvoice'
import AddGrn from './AddGrn'
import openNotification from '../../../../util/notification'
import { useHistory } from 'react-router'

const { Step } = Steps

const GoodsReceived = (props) => {
  const [current, setCurrent] = React.useState(0)
  const [ lpos, setLpos ] = React.useState([])
  const [selectedLpo, setSelectedLpo] = React.useState({})
  const [file, setFile] = React.useState(null)
  const [invoice, setInvoice] = React.useState({ invoiceNumber: null })
  const [grn, setGrn] = React.useState({comment: '', items: []})
  const [submitting, setSubmitting] = React.useState(false)
  const { currentUser } = props
  const history = useHistory()

  const handleSelectLpo = (row)=> {
    console.log('select lpo', row)
    setSelectedLpo(row)
  }

  const handleInvoiceUploaded = (filesSelected) => {
    console.log('file uploaded', filesSelected)
    setFile(filesSelected)
  }

  const handleInvoiceFileRemove = () => {
    setFile(null)
  }

  const handleAddInvoice = (invoiceData) => {
    console.log('invoice',invoiceData)
    setInvoice(invoiceData)
  }

  const fetchAllLpos = async ()=> {
    const response = await grnService.getGoodsReceiveNoteWithoutGRN({})
    if(response.status === 'OK') {
      setLpos(response.data) 
    }
  }

  const prev = () => {
    if(current > 0) {
      setCurrent(state=> state - 1)
    }
  }

  const next = () => {
    if(current < 5) {
      setCurrent((state) => state + 1) 
    }
  }

  const handleDone = async (grnData) => {
    setGrn(grnData)
    console.log('grn', grn)
    console.log('invoice', invoice)
    console.log('lpo', selectedLpo)
    console.log('file', file)
    setSubmitting(true)
    try {
      console.log('lets updlaod', currentUser.id)
      const documentResponse = await documentService.saveDocument({file: file, employeeId: currentUser.id})
      console.log('response', documentResponse)
      if(documentResponse.status === 'SUCCESS') {
        const doc = documentResponse.data[0];
        if(!doc.id) {
           return openNotification('error', 'Upload invoice', 'Upload failed')
        }
        const payload = {
          invoice: {
            invoiceDocument: doc,
            invoiceNumber: invoice.invoiceNumber,
            numberOfDaysToPayment: 10,
            supplier: { id: selectedLpo.supplierId, name: ""}
          },
          invoiceAmountPayable: invoice.invoiceAmountPayable || 0,
          localPurchaseOrder: selectedLpo || {},
          requestItems: grnData.items || []
        }
        console.log('ma payload', payload)
        const grnResponse = await grnService.createGoodsReceiveNote(payload)
        if(grnResponse.status === 'OK') {
          openNotification('success', 'Create Receive note', grnResponse.message)
        }
      }
    } catch (error) {
      console.log('err', error)
    }
    setSubmitting(false)
  }

  const handleStepChange = (value) => {
    setCurrent(value)
  }

  React.useEffect(()=> {
    fetchAllLpos()
  }, [])

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
      <Card>
        <Row style={{marginBottom: 30}}>
          <Col md={24}>
            <Steps current={current} size="small">
              <Step title="Select LPOs" />
              <Step title="Upload Invoice" />
              <Step title="Enter Invoice" />
              <Step title="Goods Receive Note" />
            </Steps>
          </Col>
        </Row>
        <Row>
          <Col md={24} style={{minHeight: 400}}>
            {current === 0 && <LpoList {...props} lpos={lpos} onSelectLpo={handleSelectLpo} onStepChange={handleStepChange} selectedLpo={selectedLpo} />}
            {current === 1 && <UploadInvoice {...props} onSelectFile={handleInvoiceUploaded} onStepChange={handleStepChange} file={file} onFileRemove={handleInvoiceFileRemove} />}
            {current === 2 && <AddInvoice {...props} onAddInvoice={handleAddInvoice} onStepChange={handleStepChange} invoice={invoice} />}
            {current === 3 && <AddGrn lpo={selectedLpo} {...props} onStepChange={handleStepChange} onDone={handleDone} grn={grn} submitting={submitting} />}
          </Col>
        </Row>
        {/* <Row style={{marginTop: 20}}>
          <Col md={24}> 
            {current > 0 && <Button style={{marginRight: 10}} type="primary" onClick={prev}><LeftOutlined />Previous</Button>}
            {current < 4 && <Button style={{marginRight: 10}} type="primary" onClick={next}>Next <RightOutlined /></Button>}
            {current === 4 && <Button style={{marginRight: 10}} type="primary" onClick={done}>Done <CheckOutlined /></Button>}
          </Col>
        </Row> */}
      </Card>
      
    </React.Fragment>
  )
}

export default GoodsReceived;