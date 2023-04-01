import { createContext, useState } from "react"

export const userContext = createContext()

export default function UserContextProvider( { children }) {

    const [userData, setUserData]  = useState(null)
    const [adminUser, setAdminUser] = useState(null)
 

  return (
    <userContext.Provider value={{ userData, setUserData, adminUser, setAdminUser}}>
        {children}
    </userContext.Provider>
  )
}
