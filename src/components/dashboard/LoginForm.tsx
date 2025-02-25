"use client"

import Cookies from "js-cookie"
import axios from "axios"
import { KeyIcon, Loader2, MailIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { toast } from "sonner"

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setEmail("")
    setPassword("")
    setError("")
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation for email and password
    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/login`,
        { email, password },
        {
          withCredentials: true,
        }
      )

      console.log(response)

      if (response.data.success) {
        toast.success(response.data.message)
        Cookies.set("token", response.data.accessToken)
        // Cookies.set("refreshToken", response.data.refreshToken)
        setTimeout(() => {
          router.push("/")
        }, 500)
      } else {
        // Handle failed login attempt
        toast.error(response.data.message || "Invalid email or password.")
      }
    } catch (error: any) {
      // Network or server errors
      console.error(error)
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gray-100 ">
      {/* <!-- Login Form --> */}
      <div className=" w-full max-w-md p-8 ">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          ADMIN LOGIN
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="relative mb-4">
            <MailIcon className="absolute top-4 left-2 z-10 w-6 h-6" />
            <input
              type="email"
              id="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative mb-4">
            <KeyIcon className="absolute top-4 left-2 z-10 w-6 h-6" />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="  w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>

          {/* Error Message */}
          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 text-white bg-secondary hover:bg-primary rounded  transition-colors duration-200"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="mr-2 animate-spin" /> Logging In
              </div>
            ) : (
              <>Login</>
            )}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
