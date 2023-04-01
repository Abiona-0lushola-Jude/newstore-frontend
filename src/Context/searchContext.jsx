import { createContext, useState } from "react"


export const searchContext = createContext()

export default function SearchContextProvider({children}) {

    const [ search, setSearch] = useState('')

    function handleChange(e){
        setSearch(e.target.value)
    }

  return (
    <searchContext.Provider value={{search, handleChange}}>
        {children}
    </searchContext.Provider>
  )
}
