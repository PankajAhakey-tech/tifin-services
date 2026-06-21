'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AdminContextType {
  isAuthenticated: boolean
  loading: boolean
}

const AdminContext = createContext<AdminContextType>({
  isAuthenticated: false,
  loading: true,
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check')
        if (!response.ok) {
          setIsAuthenticated(false)
        } else {
          setIsAuthenticated(true)
        }
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          <p className="mt-4 text-foreground/60">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.replace('/admin/login')
    return null
  }

  return <AdminContext.Provider value={{ isAuthenticated, loading }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  return useContext(AdminContext)
}
