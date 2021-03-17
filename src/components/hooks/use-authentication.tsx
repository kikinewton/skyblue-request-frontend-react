import { FunctionComponent, useEffect } from "react";
import { useHistory } from "react-router";
import { getUserDetailsFromStorage } from "../../services/auth-service";

interface Props {
  roles?: string[]
}

const useAuthentication: FunctionComponent<Props> = ({ roles })=> {
  const history = useHistory()
  useEffect(() => {
    const authUser = getUserDetailsFromStorage()
    const userRole = authUser?.roles as string
    if(!authUser) {
      return history.push('/login')
    }
    //lets authorize
    if(roles && roles.indexOf(userRole) < 0) {
      history.push('/not-authorized')
    }
  })

  return null;
}

export default useAuthentication;