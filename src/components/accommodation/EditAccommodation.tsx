"use client"
import React, { useState, ChangeEvent, useEffect } from "react"
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
import { Loader, PlusIcon } from "lucide-react"

interface Room {
  roomTitle: string
  roomPhotos: File[]
  roomStandard: string
  roomDescription: string
  roomFacilities: string[]
}

//validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
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
  id: string
}

const EditAccommodation: React.FC<EditAccommodationProps> = ({ id }) => {
  const [title, setTitle] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [rating, setRating] = useState<number>(1)
  const [overview, setOverview] = useState<string>("")
  const [features, setFeatures] = useState<string[]>([""])
  const [amenities, setAmenities] = useState<string[]>([""])
  const [images, setImages] = useState<File[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  const [showAddRoomForm, setShowAddRoomForm] = useState<boolean>(false)

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
        })
        setErrors(newErrors)
        return false
      }
      return false
    }
  }

  //getAccommodation
  const getAccommodation = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/accommodation/get-accommodation`
      )
      const data = response.data
      if (data.success) {
        setTitle(data.accommodation.accommodationTitle)
        setLocation(data.accommodation.accommodationLocation)
        setRating(data.accommodation.accommodationRating)
        setOverview(data.accommodation.accommodationDescription)
        setFeatures(data.accommodation.accommodationFeatures)
        setAmenities(data.accommodation.accommodationAmenities)
        setImages(data.accommodation.accommodationPics)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // get single accommodation
  const getSingleAccommodation = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/accommodation/get/${id}`
      )
      const data = response.data
      if (data.success) {
        setTitle(data.accommodation.accommodationTitle)
        setLocation(data.accommodation.accommodationLocation)
        setRating(data.accommodation.accommodationRating)
        setOverview(data.accommodation.accommodationDescription)
        setFeatures(data.accommodation.accommodationFeatures)
        setAmenities(data.accommodation.accommodationAmenities)
        setImages(data.accommodation.accommodationPics)
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
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/accommodation/add-accommodation`,
        {
          method: "POST",
          body: formData,
        }
      )
      const data = await response.json()
      if (data.success) {
        toast.success("Accommodation added successfully")
      } else {
        toast.error("Failed to add accommodation")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred")
    } finally {
      setLoading(false)
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
                  <Loader className="w-6 h-6 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin" />
                </div>
              ) : (
                "Add Accommodation"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAccommodation
