import { createContext, FC, useState } from "react";
import { getUserDetailsFromStorage } from "../services/auth-service";
import { IDepartment, UserContextState } from "../types/types";
import { AuthUser, User } from "../types/User";


const defaultDepartment: IDepartment = {
  id: null,
  name: '',
  description: ''
}

const initUser = {
  id: '',
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  employeeLevel: '',
  employeeId: '',
  phoneNumber: '',
  roles: '',
  department: defaultDepartment,
  createdAt: '',
  token: ''
}

const storeUser = getUserDetailsFromStorage() as AuthUser;

const defaultContextValues: UserContextState = {
  user: storeUser ? storeUser : initUser,
  saveUser: (authUser: AuthUser)=> {},
  removeUser: ()=> {}
}
//

export const UserContext = createContext<UserContextState>(defaultContextValues);

const UserProvider: FC = ({children}) => {
  const [user, setUser] = useState<AuthUser>(defaultContextValues.user);

  const saveUser = (userVal: AuthUser)=> setUser(userVal);
  const removeUser = ()=> setUser(defaultContextValues.user)
  
  return (
    <UserContext.Provider
      value={{
        user,
        saveUser,
        removeUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider