import { createContext, FC, useState } from "react";
import { UserContextState } from "../types/types";
import { User } from "../types/User";

const defaultContextValues: UserContextState = {
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    employeeLevel: '',
    employeeId: '',
    phoneNumber: ''
  },
  saveUser: ()=> {},
  removeUser: ()=> {}
}

export const UserContext = createContext<UserContextState>(defaultContextValues);

const UserProvider: FC = ({children}) => {
  const [user, setUser] = useState<User>(defaultContextValues.user);

  const saveUser = (userVal: User)=> setUser(userVal);
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