'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AdminContextType {
  isAuthenticated: boolean
  loading: boolean
}

const AdminContext = createContext<AdminContextType>({
  isAuthenticated: false,
  loading: true,
})

export function AdminProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check', {
          credentials: 'include',
        })

        setIsAuthenticated(response.ok)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (
      !loading &&
      !isAuthenticated &&
      pathname !== '/admin/login'
    ) {
      router.replace('/admin/login')
    }
  }, [loading, isAuthenticated, pathname, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}