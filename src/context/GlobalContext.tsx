import { User } from '@/types/userTypes'
import { createContext, ReactNode, useContext, useState } from 'react'

// Define the shape of your context data
interface GlobalContextProps {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  role: string
  setRole: React.Dispatch<React.SetStateAction<string>>
  authenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

// Create the context with default values
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

// Provider component to wrap your application or part of it
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<string>('default value')
  const [role, setRole] = useState<string>('user')
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  return (
    <GlobalContext.Provider value={{
      state,
      setState,
      role,
      setRole,
      authenticated,
      setAuthenticated,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }
  return context
}
