"use client"
import React, { useState, useEffect } from "react"
import {
  User,
  Camera,
  Lock,
  Shield,
  Clock,
  Network,
  Key,
  FileText,
  RefreshCw,
  Save,
  ArrowLeft,
} from "lucide-react"

import axios from "axios"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

interface ProfileData {
  name: string
  email: string
  number: string | null
}

interface PasswordData {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

// import { sessionData } from "../utils/types"
import { toast } from "sonner"

const page: React.FC = () => {
  const router = useRouter()

  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false)

  // Initial state with more robust default values
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "N/A",
    email: "N/A",
    number: null,
  })

  // State for password fields
  const [passwordData, setPasswordData] = useState<PasswordData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Password validation state
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const { data: sessionData } = useSession()

  // const session = sessionData as unknown as sessionData

  // const userId = session?.user?.id
  const userId = "67e6ceb9a96701a607af52ef"

  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/profile/get/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.data.success) {
        // Merge response data with default state to ensure all fields are present
        setProfileData((prevData) => ({
          ...prevData,
          ...response.data.data,
        }))
      } else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    setPasswordError(null)
  }

  const validatePasswords = (): boolean => {
    if (!passwordData.oldPassword) {
      setPasswordError("Current password is required")
      return false
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match")
      return false
    }

    return true
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/profile/edit/${userId}`,
        {
          name: profileData.name,
          phone: profileData.number,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.data.success) {
        // Refresh profile data
        getUserProfile()
        toast.success("Profile updated successfully")
      } else {
        toast.error(response.data.message || "Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("An error occurred while updating your profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!validatePasswords()) {
      return
    }

    setIsChangingPassword(true)
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/profile/edit/${userId}`,
        {
          oldPassword: passwordData.oldPassword,
          password: passwordData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.data.success) {
        toast.success("Password changed successfully")
        // Clear password fields
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      } else {
        toast.error(response.data.message || "Failed to change password")
      }
    } catch (error) {
      console.error("Error changing password:", error)
      toast.error("An error occurred while changing your password")
    } finally {
      setIsChangingPassword(false)
    }
  }

  useEffect(() => {
    if (userId) {
      getUserProfile()
    }
  }, [userId])

  return (
    <div className="w-full bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-primary text-white p-6 flex items-center justify-between">
          <div className="flex justify-center items-center gap-4">
            <ArrowLeft
              onClick={() => router.back()}
              className="w-10 h-10 text-black cursor-pointer m-4"
            />
            <div className="">
              <h1 className="text-2xl font-bold">{profileData.name}</h1>
              <p className="text-blue-700">Admin</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
                <User className="mr-2 text-gray-600" />
                Personal Information
              </h2>
              <div className="space-y-4">
                {/* full name  */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-800"
                  />
                </div>
                {/* email  */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
                  />
                </div>
                {/* phone number */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="number"
                    value={profileData.number || ""}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-800"
                  />
                </div>

                {/* save button  */}
                <div>
                  <button
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                    className="text-white bg-green-600 font-semibold px-4 py-2 rounded-full shadow-md flex mt-10 items-center"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
                <Lock className="mr-2 text-gray-600" />
                Change Password
              </h2>
              <div className="space-y-4">
                {/* Old Password */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-800"
                  />
                </div>
                {/* New Password */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-800"
                  />
                </div>
                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 border rounded-md bg-white text-gray-800"
                  />
                </div>

                {/* Password error message */}
                {passwordError && (
                  <div className="text-red-500 text-sm">{passwordError}</div>
                )}

                {/* Change Password button */}
                <div>
                  <button
                    onClick={handleChangePassword}
                    disabled={
                      isChangingPassword ||
                      !passwordData.oldPassword ||
                      !passwordData.newPassword ||
                      !passwordData.confirmPassword
                    }
                    className="text-white bg-blue-600 font-semibold px-4 py-2 rounded-full shadow-md flex mt-10 items-center"
                  >
                    {isChangingPassword ? (
                      <>
                        <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                        Changing...
                      </>
                    ) : (
                      <>
                        <Key className="mr-2 w-4 h-4" />
                        Change Password
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
