"use client"
import { useRouter } from "next/navigation"
import { useEffect, ReactNode, useState } from "react"
import { useAuth } from "./AuthValidation"

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const { setIsLoggedIn, loading } = useAuth()
  const [authChecked, setAuthChecked] = useState(false) // Prevents initial flash

  useEffect(() => {
    const validateFunction = () => {
      if (loading) return // Avoid running check while still loading

      const token = localStorage.getItem("authToken")

      if (!token) {
        setIsLoggedIn(false)
        router.push("/login")
      } else {
        setIsLoggedIn(true)
      }

      setAuthChecked(true) // Set state after check
    }

    validateFunction()
  }, [loading, router, setIsLoggedIn])

  if (!authChecked) return <div>Loading...</div> // Prevent flashing

  return <>{children}</>
}

export default ProtectedRoute
