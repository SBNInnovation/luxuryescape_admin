"use client"

import React, { useState } from "react"
import { set, z } from "zod"

import TitleInput from "../Common/TitleInput"
import PriceInput from "../Common/PriceInput"
import { count } from "console"
import CountryInput from "../Common/CountryInput"
import LocationInput from "../Common/LocationInput"
import LanguageInput from "../Common/LanguageInput"
import AgeInput from "../Common/AgeInput"
import MaxAltitudeInput from "../Common/MaxAltitude"
import ThumbnailInput from "../Common/ThumbnailInput"
import MealTypeInput from "../Common/MealTypeInput"
import BestSeasonInput from "../Common/BestSeasonInput"
import TotalDaysInput from "../Common/TotalDaysInput"
import GroupSizeInput from "../Common/GroupSizeInput"
import ArrivalDepartureLocationInput from "../Common/ArrivalDepartureLocationInput"
import StartingEndingLocationInput from "../Common/StartingEndingLocationInput"
import OverviewInput from "../Common/OverviewInput"
import AccommodationInput from "../Common/Accommodation"
import ThingsToKnowInput from "../Common/ThingsToKnow"
import NoteInput from "../Common/NoteInput"
import HighlightsInput from "../Common/HighlightsInput"
import ItinerariesInput from "../Common/ItineriesInput"
import ServicesInput from "../Common/ServicesInput"
import FAQInput from "../Common/FAQInput"

import { Card, CardContent } from "@/components/ui/card"
import {
  ScrollText,
  MapPin,
  Globe,
  Calendar,
  Users,
  Sun,
  Hotel,
  Sparkles,
  Route,
  Settings,
  Image,
  Video,
  Loader2,
  ArrowLeftIcon,
} from "lucide-react"

//types
import {
  HighlightType,
  ServicesType,
  ItineraryType,
  FAQType,
} from "../Types/Types"
import MultiImageInput from "../Common/MultiImageInput"
import VideoUploadInput from "../Common/VideoInput"
import { Button } from "../ui/button"
import Inclusion from "../Common/Inclusion"
import Duration from "../Common/Duration"
import AddTourType from "./AddTourType"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Exclusions from "../Common/Exclusions"
import ScrollNavigation from "../Common/ScrollNavigation"

// Define Zod schema for form validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  country: z.string().min(1, "Country is required"),
  location: z.string().min(1, "Location is required"),
  language: z.string().min(1, "Language is required"),
  suitableAge: z.string().min(1, "Age is required"),
  maxAltitude: z.number().min(1, "Max Altitude is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  mealType: z.string().min(1, "Meal Type is required"),
  selectedSeasons: z
    .array(z.string())
    .min(1, "Please select at least one season"),
  minDays: z.string().min(1, "Min Days is required"),
  maxDays: z.string().min(1, "Max Days is required"),
  minGroupSize: z.number().min(1, "Min Group Size is required"),
  maxGroupSize: z.number().min(1, "Max Group Size is required"),
  arrivalLocation: z.string().min(1, "Arrival Location is required"),
  departureLocation: z.string().min(1, "Departure Location is required"),
  startingLocation: z.string().min(1, "Starting Location is required"),
  endingLocation: z.string().min(1, "Ending Location is required"),
  overview: z.string().min(1, "Overview is required"),
  accommodations: z.string().min(1, "Accommodations is required"),
  thingsToKnow: z.string().min(1, "Things to Know is required"),
  inclusion: z.array(z.string()).min(1, "Inclusion is required"),
  exclusion: z.array(z.string()).min(1, "Exclusion is required"),
  highlights: z.array(z.string()).min(1, "Highlights is required"),
  itinerary: z.array(z.string()).min(1, "Itinerary is required"),
  services: z.object({
    inclusives: z.array(z.string()).min(1, "Inclusives is required"),
    exclusives: z.array(z.string()).min(1, "Exclusives is required"),
  }),
  days: z.number().min(1, "Duration is required"),
  faqs: z.array(z.string()).min(1, "FAQs is required"),
})

// Example type definition for errors
type ErrorsType = {
  title?: string
  hobbies?: string
  price?: string
  country?: string
  location?: string
  language?: string
  tripTourId?: string
  thumbnail?: string
  mealType?: string
  selectedSeasons?: string
  minDays?: string
  maxDays?: string
  minGroupSize?: string
  maxGroupSize?: string
  arrivalLocation?: string
  departureLocation?: string
  startingLocation?: string
  endingLocation?: string
  overview?: string
  accommodations?: string
  thingsToKnow?: string
  inclusion?: string
  exclusion?: string
  highlights?: string
  itinerary?: string
  services?: string
  days?: string
  faqs?: string
}

const CreateTourForm = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState<number>(0)
  const [country, setCountry] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [days, setDays] = useState<number>(0)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [tripTourId, setTripTourId] = useState<string>("")

  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([])

  const [overview, setOverview] = useState<string>("")
  const [accommodations, setAccommodations] = useState<string[]>([])

  const [inclusion, setInclusion] = useState<string[]>([])
  const [exclusion, setExclusion] = useState<string[]>([])

  const [highlights, setHighlights] = useState<HighlightType[]>([])
  const [itineraries, setItineraries] = useState<ItineraryType[]>([])

  const [faqs, setFaqs] = useState<FAQType[]>([])
  const [images, setImages] = useState<(string | File)[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [imageError, setImageError] = useState("")

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ErrorsType>({})

  const router = useRouter()

  // Validate form data with Zod schema
  const validateForm = () => {
    try {
      formSchema.parse({
        title,
        price,
        country,
        location,
        days,
        thumbnail,

        selectedSeasons,

        accommodations,

        highlights,
        itinerary: itineraries,
        faqs,
      })
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: ErrorsType = {}
        err.errors.forEach((error) => {
          if (error.path[0] === "title") {
            newErrors.title = error.message
          }

          if (error.path[0] === "price") {
            newErrors.price = error.message
          }
          if (error.path[0] === "country") {
            newErrors.country = error.message
          }
          if (error.path[0] === "location") {
            newErrors.location = error.message
          }
          if (error.path[0] === "language") {
            newErrors.language = error.message
          }
          if (error.path[0] === "tripTourId") {
            newErrors.tripTourId = error.message
          }
          if (error.path[0] === "thumbnail") {
            newErrors.thumbnail = error.message
          }
          if (error.path[0] === "mealType") {
            newErrors.mealType = error.message
          }
          if (error.path[0] === "selectedSeasons") {
            newErrors.selectedSeasons = error.message
          }
          if (error.path[0] === "minDays") {
            newErrors.minDays = error.message
          }
          if (error.path[0] === "maxDays") {
            newErrors.maxDays = error.message
          }
          if (error.path[0] === "minGroupSize") {
            newErrors.minGroupSize = error.message
          }
          if (error.path[0] === "maxGroupSize") {
            newErrors.maxGroupSize = error.message
          }
          if (error.path[0] === "arrivalLocation") {
            newErrors.arrivalLocation = error.message
          }
          if (error.path[0] === "departureLocation") {
            newErrors.departureLocation = error.message
          }
          if (error.path[0] === "startingLocation") {
            newErrors.startingLocation = error.message
          }
          if (error.path[0] === "endingLocation") {
            newErrors.endingLocation = error.message
          }
          if (error.path[0] === "overview") {
            newErrors.overview = error.message
          }
          if (error.path[0] === "accommodations") {
            newErrors.accommodations = error.message
          }
          if (error.path[0] === "thingsToKnow") {
            newErrors.thingsToKnow = error.message
          }
          if (error.path[0] === "highlights") {
            newErrors.highlights = error.message
          }
          if (error.path[0] === "itinerary") {
            newErrors.itinerary = error.message
          }
          if (error.path[0] === "services") {
            newErrors.services = error.message
          }
          if (error.path[0] === "days") {
            newErrors.days = error.message
          }
          if (error.path[0] === "faqs") {
            newErrors.faqs = error.message
          }
        })
        setErrors(newErrors)
        return false
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      // Validation checks

      if (
        !title ||
        !country ||
        !location ||
        !tripTourId ||
        !price ||
        !days ||
        !overview
      ) {
        throw new Error("Please fill in all required fields")
      }

      const formData = new FormData()
      formData.append("tourName", title.trim())
      formData.append("country", country.trim())
      formData.append("location", location.trim())
      formData.append("tourTypes", tripTourId)
      formData.append("cost", price.toString())
      formData.append("duration", days.toString())
      formData.append("tourOverview", overview.trim())

      // Append thumbnail if provided
      if (thumbnail) {
        formData.append("thumbnail", thumbnail)
      }

      // Append gallery images if provided
      if (images.length > 0) {
        images.forEach((image) => {
          if (image instanceof File) {
            formData.append("gallery", image)
          }
        })
      }

      // Create a modified itineraries array for JSON data
      const itinerariesJSON = itineraries.map((itinerary) => {
        // Create a copy without the file objects (which can't be stringified)
        const { itineraryDayPhoto, itineraryDayPhotoPreview, ...rest } =
          itinerary
        return rest
      })

      // Append arrays and objects as JSON strings
      formData.append("idealTime", JSON.stringify(selectedSeasons))
      // formData.append("keyHighlights", JSON.stringify(highlights))
      formData.append("tourInclusion", JSON.stringify(inclusion))
      formData.append("tourExclusion", JSON.stringify(exclusion))
      formData.append("tourItinerary", JSON.stringify(itinerariesJSON))
      formData.append("faq", JSON.stringify(faqs))

      // Add itinerary images separately
      itineraries.forEach((itinerary, index) => {
        if (itinerary.itineraryDayPhoto instanceof File) {
          formData.append(`itineraryDayPhoto`, itinerary.itineraryDayPhoto)
        }
      })

      const highlightTitles = highlights.map(
        (highlight) => highlight.highlightsTitle
      )
      formData.append("tourHighlights", JSON.stringify(highlightTitles))

      // Send the request to the backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/tour/add-tour`,
        formData
      )

      if (response.data.success) {
        toast.success(response.data.message || "Tour added successfully!")
        router.push("/tours")
      } else {
        toast.error(response.data.message || "Failed to add tour")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen ">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="flex gap-4  items-center text-5xl font-serif text-primary mb-4">
            <ArrowLeftIcon
              onClick={() => router.back()}
              className="w-8 h-8 text-black"
            />
            Add Tour
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <Card className=" backdrop-blur-md border border-white/20">
            <CardContent className="p-8">
              {/* <SectionHeader icon={ScrollText} title="Basic Information" /> */}
              <div className="flex gap-2 text-2xl font-semibold">
                <ScrollText className="w-8 h-8 text-blue-400" /> Basic
                Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-6">
                  {/* Left column inputs */}
                  <TitleInput
                    title={title}
                    setTitle={setTitle}
                    error={errors.title || ""}
                  />
                  <PriceInput
                    price={price}
                    setPrice={setPrice}
                    error={errors.price || ""}
                  />
                  <CountryInput
                    country={country}
                    setCountry={setCountry}
                    error={errors.country || ""}
                  />
                  <Duration
                    days={days}
                    setDays={setDays}
                    error={errors.days || ""}
                  />
                  <LocationInput
                    location={location}
                    setLocation={setLocation}
                    error={errors.location || ""}
                  />
                </div>
                <div className="space-y-6">
                  <ThumbnailInput
                    thumbnail={thumbnail}
                    setThumbnail={setThumbnail}
                    thumbnailPreview={null}
                    error={errors.thumbnail || ""}
                  />
                </div>
                <div className="space-y-6 mt-8">
                  <BestSeasonInput
                    selectedSeasons={selectedSeasons}
                    setSelectedSeasons={setSelectedSeasons}
                    error={errors.selectedSeasons || ""}
                  />
                </div>
                <div className="space-y-6 mt-8">
                  <AddTourType
                    tripsTourId={tripTourId}
                    setTripsTourId={setTripTourId}
                    error={errors.tripTourId || ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Descriptions Section */}
          <Card className=" backdrop-blur-md border border-white/20">
            <CardContent className="p-8">
              {/* <SectionHeader icon={ScrollText} title="Descriptions" /> */}
              <div className="flex gap-2 text-2xl font-semibold">
                <ScrollText className="w-8 h-8 text-blue-400" /> Descriptions
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-6">
                  {/* overview */}
                  <OverviewInput
                    overview={overview}
                    setOverview={setOverview}
                    error={errors.overview || ""}
                  />

                  {/* things to know */}
                  <Inclusion
                    inclusion={inclusion}
                    setInclusion={setInclusion}
                    error={errors.inclusion || ""}
                  />
                  <Exclusions
                    exclusion={exclusion}
                    setExclusion={setExclusion}
                    error={errors.exclusion || ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
          <Card className=" backdrop-blur-md border border-white/20">
            <CardContent className="p-8">
              {/* <SectionHeader icon={Sparkles} title="Highlights & Services" /> */}
              <div className="flex gap-2 text-2xl font-semibold">
                <Sparkles className="w-8 h-8 text-blue-400" /> Highlights &
                Services
              </div>
              <div className="space-y-6 mt-8">
                {/* HIGHLIGHTS */}
                <HighlightsInput
                  highlights={highlights}
                  setHighlights={setHighlights}
                  error={errors.highlights || ""}
                />
              </div>

              {/* <SectionHeader icon={Settings} title="Additional Information" /> */}
              <div className="flex gap-2 mt-6 text-2xl font-semibold">
                <Settings className="w-8 h-8 text-blue-400" />
                Additional Information
              </div>
              <div className="space-y-6 mt-8">
                {/* ITINERARIES */}
                <ItinerariesInput
                  itineraries={itineraries}
                  setItineraries={setItineraries}
                  error={errors.itinerary || ""}
                />
                {/* FAQ */}
                <FAQInput faqs={faqs} setFaqs={setFaqs} />
              </div>
            </CardContent>
          </Card>
          {/* </div> */}

          {/* Media Section */}
          <Card className=" backdrop-blur-md border border-white/20">
            <CardContent className="p-8">
              {/* <SectionHeader icon={Image} title="Media Gallery" /> */}
              <div className="flex gap-2 text-2xl font-semibold">
                <Image className="w-8 h-8 text-blue-400" /> Media Gallery
              </div>

              <div className="space-y-8 mt-8">
                {/* MULTIPLE IMAGES */}
                <MultiImageInput
                  images={images}
                  setImages={setImages}
                  previews={previews}
                  setPreviews={setPreviews}
                  imageError={imageError}
                  setImageError={setImageError}
                />

                {/* VIDEO */}
                {/* <VideoUploadInput video={video} setVideo={setVideo} /> */}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full flex justify-center items-center py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium 
 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.01] transition-all duration-200 
 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
            >
              {loading ? (
                <div className="flex gap-2">
                  <Loader2 className="w-6 h-6 animate-spin" />{" "}
                  <span>Creating...</span>{" "}
                </div>
              ) : (
                <span>Create tour</span>
              )}
            </button>
          </div>
        </form>
        <ScrollNavigation />
      </div>
    </div>
  )
}

export default CreateTourForm
