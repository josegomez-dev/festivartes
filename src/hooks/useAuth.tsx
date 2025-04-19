import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth as _useAuth } from '@/context/AuthContext'

const useAuth = (requiredRole?: string) => {
  const { authenticated, role } = _useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authenticated) {
      router.push('/login')
    } else if (requiredRole && role !== requiredRole) {
      router.push('/') // Redirect to home or another appropriate page
    }
  }, [authenticated, role, requiredRole, router])
}

export default useAuth
