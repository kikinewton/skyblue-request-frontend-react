import { makeStyles, Typography } from "@material-ui/core";
import { FunctionComponent } from "react";

const useStyles = makeStyles(theme=> ({
  root: {
    minHeight: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))
const NotAuthorizedPage: FunctionComponent = () => {
  const classes = useStyles()
  return (<div className={classes.root}>
    <div style={{padding: '10px', borderRadius: '20px', backgroundColor: '#ccc8c8'}}>
      <Typography variant="h5">
        USER NOT AUTHORIZED
      </Typography>
    </div>
  </div>)
}

export default NotAuthorizedPage