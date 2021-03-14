import { Button, CircularProgress, Divider, Grid, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { FormEvent, Fragment, FunctionComponent, SyntheticEvent, useState } from 'react'
import BackIcon from '@material-ui/icons/ChevronLeft'
import { useHistory } from 'react-router-dom';
import * as supplierService from '../../services/supplier-service'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

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

const CreateSupplierPage: FunctionComponent = ()=> {
  const [payload, setPayload] = useState({name: '', description: '', email: '', phone_no: '', location: ''})
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const history = useHistory()
  const classes = useStyles()

  const MySwal = withReactContent(Swal)

  const handleNavigateBack = ()=> {
    history.goBack()
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
            text: message ? message : 'Department Created Successfully',
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

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}}>
        <IconButton color="primary" onClick={handleNavigateBack}>
          <BackIcon />
        </IconButton>
      </Paper>
      <Paper elevation={0} style={{padding: '5px', minHeight: '300px', marginTop: '10px', display:'flex', flexDirection: 'column'}}>
        <Typography variant="h5" color="textPrimary">
          Create Supplier
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
            <Button variant="contained" color="secondary" style={{float: 'right'}} type="submit" disabled={submitLoading}>
              {submitLoading ? <CircularProgress size={20} /> : null}
              <Typography variant="button">
                Create Department
              </Typography>
            </Button>
          </form>
        </div>
      </Paper>
    </Fragment>
    
  )
}

export default CreateSupplierPage;