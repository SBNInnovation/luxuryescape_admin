"use client"
import React, { useState, ChangeEvent, useEffect, use } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import axios from "axios"
import { set, z } from "zod"
import TitleInput from "../Common/TitleInput"
import LocationInput from "../Common/LocationInput"
import RatingInput from "./accommodationForm/RatingInput"
import OverviewInput from "../Common/OverviewInput"

import FeatureInput from "./accommodationForm/FeaturesInput"
import AmenitiesInput from "./accommodationForm/AmenitiesInput"
import AccoImages from "./accommodationForm/AccoImages"
import RoomInput from "./accommodationForm/RoomInput"
import { toast } from "sonner"
import {
  DeleteIcon,
  Loader,
  Loader2Icon,
  PlusCircle,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"
import CountryInput from "../Common/CountryInput"
import { useRouter } from "next/navigation"

interface Room {
  _id: string
  slug: string
  roomTitle: string
  roomPhotos: string[]
  roomStandard: string
  roomDescription: string
  roomFacilities: string[]
}

//validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  country: z.string().min(1, "Country is required"),
  rating: z.number().min(1, "Rating is required"),
  overview: z.string().min(10, "Overview is required"), //description
  features: z.array(z.string()).min(1, "Feature is required"),
  amenities: z.array(z.string()).min(1, "Amenity is required"),
  images: z.array(z.string()).min(1, "Image is required"),
  rooms: z.array(
    z.object({
      roomTitle: z.string().min(1, "Room title is required"),
      roomPhotos: z.array(z.string()).min(1, "Room image is required"),
      roomStandard: z.string().min(1, "Room standard is required"),
      roomDescription: z.string().min(10, "Room description is required"),
      roomFacilities: z.array(z.string()).min(1, "Room facility is required"),
    })
  ),
})

interface EditAccommodationProps {
  slug: string
}

const EditAccommodation: React.FC<EditAccommodationProps> = ({ slug }) => {
  const [id, setId] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [country, setCountry] = useState<string>("")
  const [rating, setRating] = useState<number>(1)
  const [overview, setOverview] = useState<string>("")
  const [features, setFeatures] = useState<string[]>([""])
  const [amenities, setAmenities] = useState<string[]>([""])
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const [rooms, setRooms] = useState<Room[]>([])
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  const [showAddRoomForm, setShowAddRoomForm] = useState<boolean>(false)

  const router = useRouter()

  //error type
  const [errors, setErrors] = useState<{
    title?: string
    location?: string
    rating?: string
    overview?: string
    features?: string
    amenities?: string
    images?: string
    rooms?: string
  }>({})

  //validation
  const validationForm = () => {
    try {
      formSchema.parse({
        title,
        location,
        country,
        rating,
        overview,
        features,
        amenities,
        images,
      })
      setErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: {
          title?: string
          location?: string
          country?: string
          rating?: string
          overview?: string
          features?: string
          amenities?: string
          images?: string
          rooms?: string
        } = {}
        error.errors.forEach((err) => {
          if (err.path[0] === "title") newErrors.title = err.message
          if (err.path[0] === "location") newErrors.location = err.message
          if (err.path[0] === "rating") newErrors.rating = err.message
          if (err.path[0] === "overview") newErrors.overview = err.message
          if (err.path[0] === "features") newErrors.features = err.message
          if (err.path[0] === "amenities") newErrors.amenities = err.message
          if (err.path[0] === "images") newErrors.images = err.message
          if (err.path[0] === "rooms") newErrors.rooms = err.message
          if (err.path[0] === "country") newErrors.country = err.message
        })
        setErrors(newErrors)
        return false
      }
      return false
    }
  }

  // get single accommodation
  const getSingleAccommodation = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/accommodation/get-by/${slug}`
      )
      const data = response.data

      if (data.success) {
        setId(data.data._id)
        setTitle(data.data.accommodationTitle)
        setLocation(data.data.accommodationLocation)
        setCountry(data.data.country)
        setRating(data.data.accommodationRating)
        setOverview(data.data.accommodationDescription)
        setFeatures(data.data.accommodationFeatures)
        setAmenities(data.data.accommodationAmenities)
        setPreviews(data.data.accommodationPics)
        setRooms(data.data.rooms)
      }
    } catch (error) {
      console.error(error)
    }
  }

  //submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("accommodationTitle", title)
    formData.append("accommodationLocation", location)
    formData.append("country", country)
    formData.append("accommodationRating", rating.toString())
    formData.append("accommodationDescription", overview)
    formData.append("accommodationFeatures", JSON.stringify(features))
    formData.append("accommodationAmenities", JSON.stringify(amenities))
    // formData.append("accommodationPics", images)
    images.forEach((image, index) => {
      formData.append("accommodationPics", image, `image_${index}`)
    })

    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/accommodation/edit/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      )
      const data = await response.json()
      if (data.success) {
        toast.success("Accommodation updated successfully")
        router.back()
      } else {
        toast.error("Failed to update accommodation")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  // delete room
  // const handleRoomDelete = async ({
  //   roomId,
  //   roomName,
  // }: {
  //   roomId: string
  //   roomName: string
  // }) => {
  //   setDeleteLoading(true)
  //   const confirmDelete = window.confirm(
  //     `Are you sure you want to delete "${roomName}"?`
  //   )
  //   if (!confirmDelete) return
  //   const response = await axios.delete(
  //     `${process.env.NEXT_PUBLIC_API_URL_PROD}/room/delete/${roomId}`
  //   )
  //   const data = response.data
  //   if (data.success) {
  //     // toast.success(data.message || "Room deleted successfully")
  //     setRooms((prev) => prev.filter((room) => room._id !== roomId))
  //   } else {
  //     toast.error(data.message || "Failed to delete room")
  //   }
  //   toast.promise(
  //     response,
  //     {
  //       loading: "Deleting room...",
  //       success: data.message || "Room deleted successfully",
  //       error: data.message || "Failed to delete room",
  //     }

  //   )
  // }

  const handleRoomDelete = async ({
    roomId,
    roomName,
  }: {
    roomId: string
    roomName: string
  }) => {
    setDeleteLoading(true)
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${roomName}"?`
    )
    if (!confirmDelete) {
      setDeleteLoading(false)
      return
    }

    // Create the delete promise but don't await it yet
    const deletePromise = axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL_PROD}/room/delete/${roomId}`
    )

    // Use toast.promise with the promise
    toast.promise(deletePromise, {
      loading: "Deleting room...",
      success: (response) => {
        const data = response.data
        if (data.success) {
          setRooms((prev) => prev.filter((room) => room._id !== roomId))
          return data.message || "Room deleted successfully"
        } else {
          return data.message || "Room deleted but something went wrong"
        }
      },
      error: "Failed to delete room",
    })

    // Make sure to handle any errors and always reset loading state
    try {
      await deletePromise
    } catch (error) {
      console.error("Error deleting room:", error)
    } finally {
      setDeleteLoading(false)
    }
  }

  useEffect(() => {
    getSingleAccommodation()
  }, [])

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        {/* Overlay for darkening the background */}
        {showAddRoomForm && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
            onClick={() => setShowAddRoomForm(false)} // Close the form when clicking outside
          />
        )}

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-primary mb-4">
            Edit Your Luxury Accommodation
          </h1>
        </div>

        {/* Button for adding room */}
        <div className="flex justify-start mb-8">
          <button
            className="flex bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 
            transition-all duration-200"
            onClick={() => setShowAddRoomForm(!showAddRoomForm)}
          >
            <PlusIcon className="w-6 h-6 mr-2" /> Add Room
          </button>
        </div>

        {/* Room Form */}
        {showAddRoomForm && (
          <Card className="backdrop-blur-md border border-white/20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-11/12 max-w-2xl">
            <CardContent className="p-8">
              <div className="flex gap-2 text-2xl font-semibold">
                <span className="text-blue-400">🛏️</span> Add Room
              </div>
              <div className="mt-8">
                <RoomInput accommodationId={id} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <Card className="backdrop-blur-md border border-white/20">
            <CardContent className="p-8">
              <div className="flex gap-2 text-2xl font-semibold">
                <span className="text-blue-400">🏨</span> Basic Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-6">
                  {/* Left column inputs */}
                  <TitleInput
                    title={title}
                    setTitle={setTitle}
                    error={errors.title || ""}
                  />
                  <LocationInput
                    location={location}
                    setLocation={setLocation}
                    error={errors.location || ""}
                  />
                  <CountryInput
                    country={country}
                    setCountry={setCountry}
                    error={errors.location || ""}
                  />
                </div>
                <div className="space-y-6">
                  {/* Right column inputs */}
                  <RatingInput
                    rating={rating}
                    setRating={setRating}
                    error={errors.rating || ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accommodation Images Section */}
          <Card className="backdrop-blur-md border border-white/20">
            <CardContent className="p-8">
              <div className="flex gap-2 text-2xl font-semibold">
                <span className="text-blue-400">📸</span> Accommodation Images
              </div>
              <div className="mt-8">
                <AccoImages
                  images={images}
                  setImages={setImages}
                  previews={previews}
                  setPreviews={setPreviews}
                  error={errors.images || ""}
                />
              </div>
            </CardContent>
          </Card>

          {/* Overview Section */}
          <Card className="backdrop-blur-md border border-white/20">
            <CardContent className="p-8">
              <div className="flex gap-2 text-2xl font-semibold">
                <span className="text-blue-400">📝</span> Overview
              </div>
              <div className="mt-8">
                <OverviewInput
                  overview={overview}
                  setOverview={setOverview}
                  error={errors.overview || ""}
                />
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <Card className="backdrop-blur-md border border-white/20">
            <CardContent className="p-8">
              <div className="flex gap-2 text-2xl font-semibold">
                <span className="text-blue-400">✨</span> Features
              </div>
              <div className="mt-8">
                <FeatureInput
                  features={features}
                  setFeatures={setFeatures}
                  error={errors.features || ""}
                />
              </div>
            </CardContent>
          </Card>

          {/* Amenities Section */}
          <Card className="backdrop-blur-md border border-white/20">
            <CardContent className="p-8">
              <div className="flex gap-2 text-2xl font-semibold">
                <span className="text-blue-400">🛁</span> Amenities
              </div>
              <div className="mt-8">
                <AmenitiesInput
                  amenities={amenities}
                  setAmenities={setAmenities}
                  error={errors.amenities || ""}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium 
              rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.01] transition-all duration-200 
              shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  Updating...{" "}
                  <Loader2Icon className="w-6 h-6  rounded-full animate-spin" />
                </div>
              ) : (
                "Update Accommodation"
              )}
            </button>
          </div>
        </form>

        {/* room data  */}
        <div className="mt-8">
          <Card>
            <CardContent>
              <div>
                <div className="flex justify-between items-center mb-6 mt-6">
                  {/* Rooms section */}
                  <h2 className="text-xl font-bold mb-6">Available Rooms</h2>
                  <div className="flex justify-start mb-8">
                    <button
                      className="flex bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 
            transition-all duration-200"
                      onClick={() => setShowAddRoomForm(!showAddRoomForm)}
                    >
                      <PlusIcon className="w-6 h-6 mr-2" /> Add Room
                    </button>
                  </div>
                </div>

                {rooms.length === 0 ? (
                  <p className="text-gray-500">
                    No rooms available for this accommodation.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                      <div
                        key={room._id}
                        className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        {/* Room image */}
                        <div className="relative h-48 w-full">
                          {room.roomPhotos && room.roomPhotos.length > 0 ? (
                            <img
                              src={room.roomPhotos[0]}
                              alt={room.roomTitle}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500">
                                No image available
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Room details */}
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold">
                              {room.roomTitle}
                            </h3>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {room.roomStandard}
                            </span>
                          </div>

                          <p className="text-gray-600 mb-4">
                            {room.roomDescription}
                          </p>

                          {/* Facilities */}
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Facilities:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {room.roomFacilities.map((facility, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                                >
                                  {facility}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          disabled={deleteLoading}
                          onClick={() =>
                            handleRoomDelete({
                              roomId: room._id,
                              roomName: room.roomTitle,
                            })
                          }
                          className="flex w-full items-center justify-center bg-red-500 text-white font-medium py-2 px-4 rounded-b-lg hover:bg-red-600 transition-all duration-200"
                        >
                          <Trash2Icon className="w-6 h-6" />
                          <span className="ml-2">Delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EditAccommodation
