import { Link, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'

const CopyRight: FunctionComponent = ()=> {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <span>Copyright &copy;</span>
      <Link color="inherit" href="#">
        Website 2021
      </Link>
    </Typography>
  )
}

export default CopyRight;
