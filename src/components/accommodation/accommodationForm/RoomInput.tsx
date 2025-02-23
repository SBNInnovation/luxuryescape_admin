import { Loader2Icon } from "lucide-react"
import React, { useState } from "react"

interface Room {
  roomTitle: string
  roomPhotos: File[]
  roomStandard: string
  roomDescription: string
  roomFacilities: string[]
}

interface RoomInputProps {
  accommodationId: string // Accommodation ID passed from parent
}

const RoomInput: React.FC<RoomInputProps> = ({ accommodationId }) => {
  // State for the room details
  const [room, setRoom] = useState<Room>({
    roomTitle: "",
    roomPhotos: [],
    roomStandard: "",
    roomDescription: "",
    roomFacilities: [""],
  })
  const [loading, setLoading] = useState(false)

  // Handle input changes
  const handleChange = (field: keyof Room, value: string | string[]) => {
    setRoom((prev) => ({ ...prev, [field]: value }))
  }

  // Handle room images upload
  const handleRoomImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files)
      setRoom((prev) => ({
        ...prev,
        roomPhotos: [...prev.roomPhotos, ...newImages],
      }))
    }
  }

  // Remove room image
  const removeRoomImage = (index: number) => {
    setRoom((prev) => ({
      ...prev,
      roomPhotos: prev.roomPhotos.filter((_, i) => i !== index),
    }))
  }

  // Add new facility
  const addFacility = () => {
    setRoom((prev) => ({
      ...prev,
      roomFacilities: [...prev.roomFacilities, ""],
    }))
  }

  // Remove facility
  const removeFacility = (index: number) => {
    setRoom((prev) => ({
      ...prev,
      roomFacilities: prev.roomFacilities.filter((_, i) => i !== index),
    }))
  }

  // Handle form submission
  const addRoomHandler = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      console.log(room, accommodationId)
    } catch (error) {
      console.log("Error adding room", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-4">
      <form onSubmit={addRoomHandler} className="space-y-4">
        {/* Room Images */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Room Images (max 5)<span className="text-red-700">*</span>
          </label>
          <input
            type="file"
            onChange={handleRoomImages}
            accept="image/*"
            multiple
            className="mt-2"
          />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {room.roomPhotos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(photo)} // Convert File to URL for display
                  alt={`Room Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeRoomImage(index)}
                  className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Room Title */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Room Title <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            value={room.roomTitle}
            onChange={(e) => handleChange("roomTitle", e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            required
          />
        </div>

        {/* Room Standard */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Room Standard <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            value={room.roomStandard}
            onChange={(e) => handleChange("roomStandard", e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            required
          />
        </div>

        {/* Room Description */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Room Description <span className="text-red-700">*</span>
          </label>
          <textarea
            value={room.roomDescription}
            onChange={(e) => handleChange("roomDescription", e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            required
            minLength={10}
          />
        </div>

        {/* Room Facilities */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Room Facilities <span className="text-red-700">*</span>
          </label>
          {room.roomFacilities.map((facility, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                value={facility}
                onChange={(e) => {
                  const newFacilities = [...room.roomFacilities]
                  newFacilities[index] = e.target.value
                  handleChange("roomFacilities", newFacilities)
                }}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
              <button
                type="button"
                onClick={() => removeFacility(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFacility}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Facility
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex justify-center items-center mt-16 px-4 py-2 w-full text bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {loading ? (
            <p className="flex gap-4">
              {" "}
              <Loader2Icon className="h-6 w-6 animate-spin" /> Adding...
            </p>
          ) : (
            <p>Add Room </p>
          )}
        </button>
      </form>
    </div>
  )
}

export default RoomInput
