import { ReactNode } from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import Nav from './Nav'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { authenticated, role } = useGlobalContext()

  return (
      <>
        <Nav />
        <main className="p-4">
            {authenticated && <div className='custom-nav-spacer' />}
            {children}
            {/* {!authenticated && <Footer />} */}
        </main>
      </>
  )
}

export default Layout
