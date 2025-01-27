import React from "react"

interface Room {
  roomTitle: string
  roomPhotos: string[]
  roomStandard: string
  roomDescription: string
  roomFacilities: string[]
}

interface RoomInputProps {
  rooms: Room[]
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
  error: string
}

const RoomInput: React.FC<RoomInputProps> = ({ rooms, setRooms, error }) => {
  // Handle room field changes
  const handleRoomChange = (
    index: number,
    field: keyof Room,
    value: string | string[]
  ) => {
    setRooms((prev) =>
      prev.map((room, i) => (i === index ? { ...room, [field]: value } : room))
    )
  }

  // Handle room images upload
  const handleRoomImages = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setRooms((prev) =>
        prev.map((room, i) =>
          i === index
            ? { ...room, roomPhotos: [...room.roomPhotos, ...newImages] }
            : room
        )
      )
    }
  }

  // Remove room image
  const removeRoomImage = (roomIndex: number, imageIndex: number) => {
    setRooms((prev) =>
      prev.map((room, i) =>
        i === roomIndex
          ? {
              ...room,
              roomPhotos: room.roomPhotos.filter((_, j) => j !== imageIndex),
            }
          : room
      )
    )
  }

  // Add new room
  const addRoom = () => {
    setRooms((prev) => [
      ...prev,
      {
        roomTitle: "",
        roomPhotos: [],
        roomStandard: "",
        roomDescription: "",
        roomFacilities: [""],
      },
    ])
  }

  // Remove room
  const removeRoom = (index: number) => {
    setRooms((prev) => prev.filter((_, i) => i !== index))
  }

  // Add new facility to a room
  const addFacility = (roomIndex: number) => {
    setRooms((prev) =>
      prev.map((room, i) =>
        i === roomIndex
          ? { ...room, roomFacilities: [...room.roomFacilities, ""] }
          : room
      )
    )
  }

  // Remove facility from a room
  const removeFacility = (roomIndex: number, facilityIndex: number) => {
    setRooms((prev) =>
      prev.map((room, i) =>
        i === roomIndex
          ? {
              ...room,
              roomFacilities: room.roomFacilities.filter(
                (_, j) => j !== facilityIndex
              ),
            }
          : room
      )
    )
  }

  return (
    <div className="mb-4">
      <label className="block text-lg font-bold text-gray-700">
        Rooms <span className="text-red-700">*</span>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {rooms.map((room, roomIndex) => (
        <div key={roomIndex} className="border p-4 rounded-lg mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Room {roomIndex + 1}</h3>
            <button
              type="button"
              onClick={() => removeRoom(roomIndex)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>

          {/* Room Images */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Room Images (max 5)<span className="text-red-700">*</span>
            </label>
            <input
              type="file"
              onChange={(e) => handleRoomImages(roomIndex, e)}
              accept="image/*"
              multiple
              className="mt-2"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {room.roomPhotos.map((photo, photoIndex) => (
                <div key={photoIndex} className="relative">
                  <img
                    src={photo}
                    alt={`Room ${roomIndex + 1} - ${photoIndex + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeRoomImage(roomIndex, photoIndex)}
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
              onChange={(e) =>
                handleRoomChange(roomIndex, "roomTitle", e.target.value)
              }
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
              onChange={(e) =>
                handleRoomChange(roomIndex, "roomStandard", e.target.value)
              }
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
              onChange={(e) =>
                handleRoomChange(roomIndex, "roomDescription", e.target.value)
              }
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
            {room.roomFacilities.map((facility, facilityIndex) => (
              <div key={facilityIndex} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={facility}
                  onChange={(e) => {
                    const newFacilities = [...room.roomFacilities]
                    newFacilities[facilityIndex] = e.target.value
                    handleRoomChange(roomIndex, "roomFacilities", newFacilities)
                  }}
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
                <button
                  type="button"
                  onClick={() => removeFacility(roomIndex, facilityIndex)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addFacility(roomIndex)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Facility
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addRoom}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Room
      </button>
    </div>
  )
}

export default RoomInput
