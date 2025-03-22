"use client"
import React, { useState } from "react"
import { Input } from "../ui/input"

interface ThumbnailInputProps {
  thumbnail: File | null
  setThumbnail: React.Dispatch<React.SetStateAction<File | null>>
  thumbnailPreview: string | null
  error: string
}

const ThumbnailInput: React.FC<ThumbnailInputProps> = ({
  thumbnail,
  setThumbnail,
  thumbnailPreview,
  error,
}) => {
  const [preview, setPreview] = useState<string | null>(
    thumbnail ? URL.createObjectURL(thumbnail) : null
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setThumbnail(file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700">
        Thumbnail <span className="text-red-700">*</span>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
      />
      {preview && (
        <div className="mt-2">
          <label className="block text-lg font-medium text-gray-700">
            New:
          </label>
          <img
            src={preview}
            alt="Thumbnail Preview"
            className="h-56 w-96 object-cover rounded-md border border-gray-300"
          />
        </div>
      )}
      {thumbnailPreview && (
        <div className="mt-2">
          <label className="block text-lg font-medium text-gray-700">
            Current:
          </label>
          <img
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            className="h-56 w-96 object-cover rounded-md border border-gray-300"
          />
        </div>
      )}
    </div>
  )
}

export default ThumbnailInput
