import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Creators as StoreCreators } from '../../services/redux/store/actions'
import AppLayout from '../AppLayout'
import { Button, Col, Form, Modal, PageHeader, Row } from 'antd'
import Storelist from './components/StoresList'
import StoreForm from './components/StoreForm'


const StoreManagementIndex = (props) => {
  const {
    filtered_stores,
    loadingStores,
    fetchStores,
    createStore,
    updateStore,
    submit_store_success,
    submitting_store
  } = props
  const [addVisible, setAddVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [addForm] = Form.useForm()
  const [editForm] = Form.useForm()
  const [selectedRow, setSelectedRow] = useState(null)

  useEffect(() => {
    if(!loadingStores) {
      fetchStores({})
    }
  }, [])

  useEffect(() => {
    if(!submitting_store && submit_store_success) {
      fetchStores({})
      setAddVisible(false)
      setEditVisible(false)
      setConfirmVisible(false)
      addForm.setFieldsValue({
        name: ""
      })
      editForm.setFieldsValue({
        name: ""
      })
      setSelectedRow(null)
    }
  }, [submitting_store, submit_store_success])

  return (
    <>
      <AppLayout>
        <PageHeader title="Stores" 
          extra={[
            <Button
              onClick={() => {
                addForm.setFieldsValue({
                  name: ""
                })
                setAddVisible(true)
              }}
            >
              Add New
            </Button>
          ]}
        />
        <Row>
          <Col span={24}>
            <Storelist 
              data={filtered_stores}
              loading={loadingStores}
              onEdit={(row) => {
                setSelectedRow(row)
                editForm.setFieldsValue({
                  name: row?.name
                })
                setEditVisible(true)
              }}
            />
          </Col>
        </Row>

        <Modal
          title="Add New"
          onCancel={() => {
            setAddVisible(false)
          }}
          footer={false}
          visible={addVisible}
        >
          <StoreForm 
            form={addForm}
            initialValues={{ name: "" }}
            submitText="SUBMIT"
            onSubmit={(values) => {
              const payload = {
                name: values.name
              }
              createStore(payload)
            }}
            submitting={submitting_store}
          />
        </Modal>

        <Modal
          title="Edit Store"
          onCancel={() => {
            setEditVisible(false)
          }}
          footer={false}
          visible={editVisible}
        >
          <StoreForm 
            form={editForm}
            initialValues={{ name: "" }}
            submitText="UPDATE"
            onSubmit={(values) => {
              const payload = {
                name: values.name
              }
              updateStore(selectedRow?.id, payload)
            }}
            submitting={submitting_store}
          />
        </Modal>
      </AppLayout>
    </> 
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,

  stores: state.store.stores,
  filtered_stores: state.store.filtered_stores,
  submitting_store: state.store.submitting,
  submit_store_success: state.store.submit_success,
  loadingStores: state.store.loading,

})

const mapActionsToProps = dispatch => ({
  fetchStores: (query) => dispatch(StoreCreators.fetchStores(query)),
  createStore: (payload) => dispatch(StoreCreators.createStore(payload)),
  updateStore: (id, payload) => dispatch(StoreCreators.updateStore(id, payload)),
  deleteStore: id => dispatch(StoreCreators.deleteStore(id)),
  filterStores: filter => dispatch(StoreCreators.filterStores(filter))
})

export default connect(mapStateToProps, mapActionsToProps)(StoreManagementIndex)