import { Button, CircularProgress, Divider, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { FormEvent, Fragment, FunctionComponent, SyntheticEvent, useContext, useEffect, useState } from 'react'
import BackIcon from '@material-ui/icons/ChevronLeft'
import { useHistory } from 'react-router-dom';
import * as supplierService from '../../services/supplier-service'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import useAuthentication from '../../components/hooks/use-authentication';
import { APP_PAGES_AND_ROLES } from '../../utils/constants';
import { AuthUser } from '../../types/types';
import { AppContext } from '../../context/AppProvider';
import { CheckOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme=> ({
  root: {

  },
  form: {
    width: '70%',
    padding: '20px',
    marginTop: '40px',
  },
  textField: {
    width: '100%',
    marginBottom: '20px'
  }

}));

interface Props {
  authUser: AuthUser
}

const CreateSupplierPage: FunctionComponent<Props> = ({authUser})=> {
  const [payload, setPayload] = useState({name: '', description: '', email: '', phone_no: '', location: ''})
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  useAuthentication({roles: APP_PAGES_AND_ROLES.createSupplierRoles})
  const appContext = useContext(AppContext)
  const history = useHistory()
  const classes = useStyles()

  const MySwal = withReactContent(Swal)

  const handleNavigateBack = ()=> {
    history.goBack()
  }

  const payloadIsValid = ()=> {
    return payload.name && payload.description && payload.email && payload.phone_no && payload.location;
  }

  const handleInputChange = (event: FormEvent<EventTarget>)=> {
    const target = event.target as HTMLInputElement
    const eventName: string = target.name;
    const value: string = target.value;
    setPayload({...payload, [eventName]: value})
  }

  const handleSubmitEvent = (event: SyntheticEvent)=> {
    event.preventDefault()
    setSubmitLoading(true)
    supplierService.saveSupplier(payload)
      .then(response=> {
        const {status, data, message} = response
        if(status == 'CREATED') {
          MySwal.fire({
            icon: 'success',
            title: 'Success',
            text: message ? message : 'Supplier Created Successfully',
            allowOutsideClick: false,
            willClose: ()=> {
              setPayload({name: '', description: '', email: '', phone_no: '', location: ''})
            }
          })
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'Failed!',
            text: message ? message : 'failed'
          })
        }
      })
      .catch(error=> {
        
      })
      .finally(()=> {
        setSubmitLoading(false)
      })
  }

  useEffect(()=> {
    appContext.updateCurrentPage('SUPPLIERS / CREATE NEW')
  }, [])  

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}}>
        <IconButton color="primary" onClick={handleNavigateBack}>
          <BackIcon />
        </IconButton>
      </Paper>
      <Paper elevation={0} style={{padding: '5px', minHeight: '300px', marginTop: '10px', display:'flex', flexDirection: 'column'}}>
        <Typography variant="h5" color="textPrimary">
          Create Supplier Form
        </Typography>
        <Divider />
        <div style={{width:'100%', display:'flex', justifyContent: 'center'}}>
          <form className={classes.form} autoComplete="off" onSubmit={handleSubmitEvent}>
            <TextField id="department-name" label="Name" name="name" value={payload.name}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="phone_no" label="Phone" name="phone_no" value={payload.phone_no}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="email" label="Email" name="email" value={payload.email}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="location" label="Location" name="location" value={payload.location}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="department-description" label="Description" name="description" value={payload.description}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <Button variant="contained" color="secondary" style={{float: 'right'}} type="submit" disabled={submitLoading || !payloadIsValid()}>
              {submitLoading ? <CircularProgress size={20} /> : null}
              <CheckOutlined />
              <Typography variant="button">
                Submit
              </Typography>
            </Button>
          </form>
        </div>
      </Paper>
    </Fragment>
    
  )
}

export default CreateSupplierPage;