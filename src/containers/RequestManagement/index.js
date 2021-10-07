import { Col, Row, Menu } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { Creators as DepartmentCreators  } from '../../services/redux/department/actions'
import { Creators as RequestCreators } from '../../services/redux/request/actions'
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'

const RequestManagement = (props) => {
  return (
    <>
      <Row>
        <Col span>
          <Menu>
            
          </Menu>
        </Col>
      </Row>
      <Switch>

      </Switch>
    </>
  )
}

const mapStateToProps = (store) => ({
  departments: store.department.departments,
  departmentsLoading: store.department.loading,
  currentUser: store.auth.user,
  requests: store.request.requests,
  requestLoading: store.request.loading,
  requestSubmitting: store.request.submitting,
  requestSubmitSuccess: store.request.submitSuccess,
  suppliers: store.supplier.suppliers
})

const mapActionsToProps = (dispatch) => {
  return {
    fetchDepartments: (query) => {
      dispatch(DepartmentCreators.fetchDepartments(query))
    },
    createRequest: (payload) => {
      dispatch(RequestCreators.createRequest(payload))
    },
    fetchRequests: (query) => {
      dispatch(RequestCreators.fetchRequests(query))
    },
    updateRequest: (options) => {
      dispatch(RequestCreators.updateRequest(options))
    },
    resetRequests: () => {
      dispatch(RequestCreators.resetRequest())
    },
    fetchSuppliers: (query)=> {
      dispatch(SupplierCreators.fetchSuppliers(query))
    } 
  }
}

export default connect(mapStateToProps, mapActionsToProps)(RequestManagement)