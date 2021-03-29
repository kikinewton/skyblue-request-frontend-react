import { Button, CircularProgress, Divider, Grid, IconButton, LinearProgress, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { FormEvent, Fragment, FunctionComponent, SyntheticEvent, useState, useEffect, useContext } from 'react'
import BackIcon from '@material-ui/icons/ChevronLeft'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import * as supplierService from '../../services/supplier-service'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { DepartmentPayload } from '../../types/payloads';
import useAuthentication from '../../components/hooks/use-authentication';
import { APP_PAGES_AND_ROLES } from '../../utils/constants';
import { AuthUser } from '../../types/User';
import { AppContext } from '../../context/AppProvider';

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

interface ParamTypes {
  supplierId: string
}

interface StateTypes {
  name: string
  description: string
  phone_no: string
  email: string
  location: string
}

interface Props {
  authUser: AuthUser
}

const EditSupplierPage: FunctionComponent<Props> = ({authUser})=> {
  //local states
  const [payload, setPayload] = useState<StateTypes>({name: '', description: '', phone_no: '', email: '', location: ''})
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  useAuthentication({roles: APP_PAGES_AND_ROLES.editSupplierRoles})
  const appContext = useContext(AppContext)

  const { supplierId } = useParams<ParamTypes>() //department id from url params

  const history = useHistory()
  const { path } = useRouteMatch()
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

  const initDepartment = () => {
    console.log('supplier id', supplierId)
    setLoading(true)
    supplierService.getSupplier(parseInt(supplierId))
      .then(response=> {
        const {status, data, message} = response;
        console.log('data', data)
        if(status === 'OK') {
          if(data) {
            setPayload({name: data.name, description: data.description, phone_no: data.phone_no, email: data.email, location: data.location})
          } else {
            MySwal.fire({
              icon: 'error',
              title: 'Failed',
              text: 'Department Not Found'
            })
          }
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'Failed',
            text: message ? message : 'Department Not Found'
          })
        }
      })
      .catch(error=> {

      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSubmitEvent = (event: SyntheticEvent)=> {
    event.preventDefault()
    console.log('payload', payload)

    const payloadModel: DepartmentPayload = {
      id: parseInt(supplierId),
      name: payload.name,
      description: payload.description
    }
    setSubmitLoading(true)
    supplierService.updateSupplier(parseInt(supplierId), payload)
      .then(response=> {
        const {status, data, message} = response
        if(status == 'SUCCESS') {
          MySwal.fire({
            icon: 'success',
            title: 'Success',
            text: message ? message : 'Supplier Created Successfully',
            allowOutsideClick: false,
            willClose: ()=> {
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

  useEffect(() => {
    appContext.updateCurrentPage('SUPPLIERS / EDIT')
    initDepartment()
    return () => {
    }
  }, [supplierId])

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}}>
        <IconButton color="primary" onClick={handleNavigateBack}>
          <BackIcon />
        </IconButton>
      </Paper>
      <Paper elevation={0} style={{padding: '5px', minHeight: '300px', marginTop: '10px', display:'flex', flexDirection: 'column'}}>
        <Typography variant="h5" color="textPrimary">
          Edit Supplier Form
        </Typography>
        <Divider />
        {loading ? <LinearProgress color="secondary" style={{width: '100%'}}/> : null}
        <div style={{width:'100%', display:'flex', justifyContent: 'center'}}>
          <form className={classes.form} autoComplete="off" onSubmit={handleSubmitEvent}>
            <TextField id="department-name" label="name" name="name" value={payload.name}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="phone_no" label="Phone" name="phone_no" value={payload.phone_no}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="email" label="Email" name="email" value={payload.email}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="location" label="Location" name="location" value={payload.location}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="department-description" label="description" name="description" value={payload.description}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <Button variant="contained" color="secondary" style={{float: 'right'}} type="submit" disabled={submitLoading || !payloadIsValid()}>
              {submitLoading ? <CircularProgress size={15} /> : null}
              <Typography variant="button">
                 Update
              </Typography>
            </Button>
          </form>
        </div>
      </Paper>
    </Fragment>
    
  )
}

export default EditSupplierPage;