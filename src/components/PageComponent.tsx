import { IconButton, Paper, Typography, Divider, makeStyles, Fab } from '@material-ui/core'
import { Add, ChevronLeft } from '@material-ui/icons'
import React, { Fragment, FunctionComponent } from 'react'

const useStyles = makeStyles(theme=> ({
  root: {
    width: '100%'
  }
}))


interface Props {
  title: string
  children: React.ReactNode
  backButton: boolean
  backButtonCallback?: () => void
  createResourceButton: boolean
  createResourceButtonCallback?: () => void
}

const PageComponent: FunctionComponent<Props> = (props: Props) => {

  const classes = useStyles()
  return (
    <div style={{padding: '20px'}}>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}}>
        <div style={{width: '100%'}}>
          {props.backButton ? (
            <IconButton size="small" color="primary" onClick={props.backButtonCallback}>
              <ChevronLeft />
            </IconButton>
          ) : null}
        </div>
        {props.createResourceButton ? (
          <Fab size="small" color="primary" onClick={props.createResourceButtonCallback} style={{float: 'right'}}>
            <Add />
        </Fab>
        ) : null}
        
      </Paper>
      <Paper elevation={0} style={{padding: '5px', minHeight: '300px', marginTop: '10px', display:'flex', flexDirection: 'column'}}>
        <Typography variant="h5" color="textPrimary">
          {props.title}
        </Typography>
        <Divider />
        <div style={{width:'100%', display:'flex', justifyContent: 'center'}}>
          {props.children}
        </div>
      </Paper>
    </div>
  )
} 

export default PageComponent