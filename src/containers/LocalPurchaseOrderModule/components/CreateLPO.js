import { Card, Col, Row, Steps, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { QUOTATIONS_BY_SUPPLIER } from '../../../util/quotation-types'


const CreateLPO = (props) => {
  const {
    fetching_suppliers,
    suppliers,
    fetchSuppliers,

    quotations,
  } = props
  const [current, setCurrent] = useState(0)
  const [selectedSupplier, setSelectedSupplier] = useState(undefined)

  const fetchQuotationsBySupplier = (supplierId) => {
    console.log('supplier ', supplierId)
    if(supplierId) {
      props.fetchQuotations({
        requestType: QUOTATIONS_BY_SUPPLIER,
        supplierId: supplierId
      })
    }
  }

  useEffect(() => {
    props.resetSuppliers()
    //props.resetRequestCategory()
    fetchSuppliers({suppliersWithRQ: true})
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <Steps current={current}>
            <Steps.Step title="Select Items" />
            <Steps.Step title="Update Unit Price And Request Category" />
            <Steps.Step title="Confirm and submit" />
          </Steps>
        </Col>
      </Row>
      <Card>
        {current === 0 && (
          <>
            <Row>
              <Col span={24}>
                <Select 
                  loading={fetching_suppliers} 
                  style={{width: '100%'}} 
                  placeholder="Select a supplier" 
                  defaultValue={selectedSupplier}
                  onChange={(value)=> {
                    setSelectedSupplier(value)
                    fetchQuotationsBySupplier(value)
                  }}
                >
                  <Select.Option value={undefined}>Select Supplier...</Select.Option >
                  {suppliers && suppliers.map(item => (
                    <Select.Option value={item.id} key={`supplier-select-${item.id}`}>{item.name}</Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  )
}

export default CreateLPO