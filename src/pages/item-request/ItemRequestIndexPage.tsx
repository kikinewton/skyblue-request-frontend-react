import React, { Fragment, FunctionComponent, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppContext } from '../../context/AppProvider'
import { appPages } from '../../utils/constants'


const ItemRequestIndexPage: FunctionComponent = ()=> {
  const appContext = useContext(AppContext)

  useEffect(() => {
    appContext.updateCurrentPage(appPages.RequestItemModule)
    return () => {
      
    }
  }, [])
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default ItemRequestIndexPage