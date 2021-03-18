import { Button, Divider, Grid, IconButton, LinearProgress, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { FormEvent, Fragment, FunctionComponent, SyntheticEvent, useState, useEffect, useContext } from 'react'
import BackIcon from '@material-ui/icons/ChevronLeft'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import * as departmentService from '../../services/department-service'
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
  departmentId: string
}

interface Props {
  authUser: AuthUser
}

const EditDepartmentPage: FunctionComponent<Props> = ({authUser})=> {
  //lets authorize user
  useAuthentication({roles: APP_PAGES_AND_ROLES.editDepartmentRoles})
  //local states
  const [payload, setPayload] = useState({name: '', description: ''})
  const [loading, setLoading] = useState<boolean>(false)

  const { departmentId } = useParams<ParamTypes>() //department id from url params
  const appContext = useContext(AppContext)

  const history = useHistory()
  const { path } = useRouteMatch()
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

  const initDepartment = () => {
    setLoading(true)
    departmentService.getDepartment(parseInt(departmentId))
      .then(response=> {
        const {status, data, message} = response;
        console.log('data', data)
        if(status === 'OK') {
          if(data) {
            setPayload({name: data.name, description: data.description})
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
      .finally(()=> {
        setLoading(false)
      })
  }

  const handleSubmitEvent = (event: SyntheticEvent)=> {
    event.preventDefault()
    console.log('payload', payload)

    const payloadModel: DepartmentPayload = {
      id: parseInt(departmentId),
      name: payload.name,
      description: payload.description
    }
    departmentService.updateDepartment(parseInt(departmentId), payload)
      .then(response=> {
        const {status, data, message} = response
        if(status == 'SUCCESS') {
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
  }

  useEffect(() => {
    appContext.updateCurrentPage('DEPARTMENT/EDIT')
    initDepartment()
    return () => {
    }
  }, [departmentId])

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}}>
        <IconButton color="primary" onClick={handleNavigateBack}>
          <BackIcon />
        </IconButton>
      </Paper>
      <Paper elevation={0} style={{padding: '5px', minHeight: '300px', marginTop: '10px', display:'flex', flexDirection: 'column'}}>
        <Typography variant="h5" color="textPrimary">
          Edit Department
        </Typography>
        <Divider />
        {loading ? <LinearProgress color="secondary" style={{width: '100%'}}/> : null}
        <div style={{width:'100%', display:'flex', justifyContent: 'center'}}>
          <form className={classes.form} autoComplete="off" onSubmit={handleSubmitEvent}>
            <TextField id="department-name" label="name" name="name" value={payload.name}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="department-description" label="description" name="description" value={payload.description}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <Button variant="contained" color="secondary" style={{float: 'right'}} type="submit">
              <Typography variant="button">
                Edit Department
              </Typography>
            </Button>
          </form>
        </div>
      </Paper>
    </Fragment>
    
  )
}

export default EditDepartmentPage;