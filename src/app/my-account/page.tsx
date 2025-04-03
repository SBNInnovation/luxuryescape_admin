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
// import { sessionData } from "../utils/types"
import { toast } from "sonner"

const page: React.FC = () => {
  const router = useRouter()

  const [isSaving, setIsSaving] = useState<boolean>(false)

  // Initial state with more robust default values
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "N/A",
    email: "N/A",
    number: null,
  })

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

  const handleSaveChanges = async () => {
    setIsSaving(true)
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/profile/edit/${userId}`,
        {
          name: profileData.name,
          number: profileData.number,
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
                    className=" text-white bg-green-600 font-semibold px-4 py-2 rounded-full shadow-md flex mt-10 items-center"
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
