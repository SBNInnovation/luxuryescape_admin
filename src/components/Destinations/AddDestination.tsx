"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload } from "lucide-react"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import axios from "axios"
import Image from "next/image"
import { Input } from "../ui/input"

const AddDestination = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // For preview
    const reader = new FileReader()
    reader.onload = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Store the file object itself in the formData
    setFormData((prev) => ({
      ...prev,
      image: file, // Store the actual file object for submission
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description) {
      toast.error("Please fill all required fields")
      return
    }

    setLoading(true)

    try {
      // Create a FormData object to send binary data
      const formDataToSend = new FormData()
      formDataToSend.append("title", formData.title)
      formDataToSend.append("description", formData.description)

      // Append the file if it exists and is a File object
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image)
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/destination/add`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for binary file uploads
          },
        }
      )

      if (response.data.success) {
        toast.success("Destination created successfully")
        router.push("/destinations")
      } else {
        toast.error(response.data.message || "Failed to create destination")
      }
    } catch (error) {
      console.error("Error creating destination:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-full">
      {/* Header Section */}
      <div className="flex gap-10 items-center text-center mb-8">
        <ArrowLeft
          className="w-10 h-10 cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-5xl font-serif text-primary">
          Create New Destination
        </h1>
      </div>

      {/* Form Section */}
      <Card className="p-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Destination Image
              </label>
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                {imagePreview ? (
                  <div className="relative w-full h-64">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setImagePreview(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2 flex flex-col items-center">
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer rounded-md bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-gray-100"
                      >
                        <span>Upload an image</span>
                        <Input
                          id="image-upload"
                          name="image"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Destination Title
              </label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter destination title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Destination Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter destination description"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <Button
                type="button"
                variant="outline"
                className="mr-4"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Destination"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default AddDestination
