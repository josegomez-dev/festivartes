import { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import Nav from './Nav'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { authenticated } = useAuth()

  return (
      <>
        {authenticated && <Nav />}
        <main className="p-4">
            {authenticated && <div className='custom-nav-spacer' />}
            {children}
            {/* {!authenticated && <Footer />} */}
        </main>
      </>
  )
}

export default Layout
