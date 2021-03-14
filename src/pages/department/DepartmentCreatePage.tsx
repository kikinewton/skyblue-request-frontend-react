import { Button, CircularProgress, Divider, Grid, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { FormEvent, Fragment, FunctionComponent, SyntheticEvent, useState } from 'react'
import BackIcon from '@material-ui/icons/ChevronLeft'
import { useHistory } from 'react-router-dom';
import * as departmentService from '../../services/department-service'
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

const DepartmentCreatePage: FunctionComponent = ()=> {
  const [payload, setPayload] = useState({name: '', description: ''})
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
    departmentService.saveDepartment(payload)
      .then(response=> {
        const {status, data, message} = response
        if(status == 'CREATED') {
          MySwal.fire({
            icon: 'success',
            title: 'Success',
            text: message ? message : 'Department Created Successfully',
            allowOutsideClick: false,
            willClose: ()=> {
              setPayload({name: '', description: ''})
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
          Create Department Form
        </Typography>
        <Divider />
        <div style={{width:'100%', display:'flex', justifyContent: 'center'}}>
          <form className={classes.form} autoComplete="off" onSubmit={handleSubmitEvent}>
            <TextField id="department-name" label="name" name="name" value={payload.name}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="department-description" label="description" name="description" value={payload.description}
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

export default DepartmentCreatePage;