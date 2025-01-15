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
} from "lucide-react"

//types
import {
  HighlightType,
  ItineraryType,
  ServicesType,
  FAQType,
} from "../Types/Types"
import MultiImageInput from "../Common/MultiImageInput"
import VideoUploadInput from "../Common/VideoInput"
import { Button } from "../ui/button"

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
  highlights: z.array(z.string()).min(1, "Highlights is required"),
  itinerary: z.array(z.string()).min(1, "Itinerary is required"),
  services: z.object({
    inclusives: z.array(z.string()).min(1, "Inclusives is required"),
    exclusives: z.array(z.string()).min(1, "Exclusives is required"),
  }),
})

const CreateTourForm = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState<number>(0)
  const [country, setCountry] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [language, setLanguage] = useState<string>("")
  const [suitableAge, setSuitableAge] = useState<string>("")
  const [maxAltitude, setMaxAltitude] = useState<number>(0)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [mealType, setMealType] = useState<string>("")
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([])
  const [minDays, setMinDays] = useState<number>(0)
  const [maxDays, setMaxDays] = useState<number>(0)
  const [minGroupSize, setMinGroupSize] = useState<number>(0)
  const [maxGroupSize, setMaxGroupSize] = useState<number>(0)
  const [arrivalLocation, setArrivalLocation] = useState<string>("")
  const [departureLocation, setDepartureLocation] = useState<string>("")
  const [startingLocation, setStartingLocation] = useState<string>("")
  const [endingLocation, setEndingLocation] = useState<string>("")
  const [overview, setOverview] = useState<string>("")
  const [accommodations, setAccommodations] = useState<string[]>([])
  const [thingsToKnow, setThingsToKnow] = useState<string[]>([])
  const [note, setNote] = useState<string>("")
  const [highlights, setHighlights] = useState<HighlightType[]>([])
  const [itineraries, setItineraries] = useState<ItineraryType[]>([])
  const [services, setServices] = useState<ServicesType>({
    inclusives: [],
    exclusives: [],
  })
  const [faqs, setFaqs] = useState<FAQType[]>([])
  const [images, setImages] = useState<(string | File)[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [imageError, setImageError] = useState("")

  const [video, setVideo] = useState<File | null>(null)

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{
    title?: string
    hobbies?: string
    price?: string
    country?: string
    location?: string
    language?: string
    suitableAge?: string
    maxAltitude?: string
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
    highlights?: string
    itinerary?: string
    services?: string
  }>({})

  // Validate form data with Zod schema
  const validateForm = () => {
    try {
      formSchema.parse({
        title,
        price,
        country,
        location,
        language,
        suitableAge,
        maxAltitude,
        thumbnail,
        mealType,
        selectedSeasons,
        minDays,
        maxDays,
        minGroupSize,
        maxGroupSize,
        arrivalLocation,
        departureLocation,
        startingLocation,
        endingLocation,
        overview,
        accommodations,
        thingsToKnow,
        highlights,
        itinerary: itineraries,
        services,
      })
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: {
          title?: string

          price?: string
          country?: string
          location?: string
          language?: string
          suitableAge?: string
          maxAltitude?: string
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
          highlights?: string
          itinerary?: string
          services?: string
        } = {}
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
          if (error.path[0] === "suitableAge") {
            newErrors.suitableAge = error.message
          }
          if (error.path[0] === "maxAltitude") {
            newErrors.maxAltitude = error.message
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
        })
        setErrors(newErrors)
        return false
      }
      return false
    }
  }

  const handleAutofill = () => {
    setTitle("Luxury Everest Base Camp Trek")
    setPrice(5000)
    setCountry("Nepal")
    setLocation("Kathmandu")
    setLanguage("English")
    setSuitableAge("18+")
    setMaxAltitude(5545)
    setThumbnail(null)
    setMealType("Included")
    setSelectedSeasons(["Spring", "Autumn"])
    setMinDays(14)
    setMaxDays(14)
    setMinGroupSize(2)
    setMaxGroupSize(12)
    setArrivalLocation("Tribhuvan International Airport")
    setDepartureLocation("Tribhuvan International Airport")
    setStartingLocation("Kathmandu")
    setEndingLocation("Kathmandu")
    setOverview(
      "Embark on a once-in-a-lifetime journey to the base of the world's highest mountain, Mount Everest. Our Luxury Everest Base Camp Trek is a 14-day adventure that takes you through the heart of the Himalayas, where you'll experience stunning landscapes, rich culture, and warm hospitality. From the bustling streets of Kathmandu to the serene trails of the Khumbu region, this trek is the perfect blend of luxury and adventure. Join us and create memories that will last a lifetime."
    )
    setAccommodations([
      "5-star hotel in Kathmandu",
      "Luxury lodges along the trek",
    ])
    setThingsToKnow([
      "You need to be physically fit to complete this trek",
      "The trek involves long hours of walking each day",
      "The weather can be unpredictable in the mountains",
    ])
    setNote(
      "This trek is suitable for experienced trekkers who are looking for a luxurious experience in the Himalayas."
    )

    setServices({
      inclusives: [
        "Airport transfers",
        "Accommodation in Kathmandu",
        "Accommodation during the trek",
        "Meals during the trek",
        "Experienced trekking guide",
        "Porter service",
        "TIMS and Sagarmatha National Park permits",
      ],
      exclusives: [
        "International flights",
        "Nepal visa fees",
        "Travel insurance",
        "Personal expenses",
        "Tips for guide and porters",
      ],
    })
    setHighlights([
      {
        content: "Explore the vibrant city of Kathmandu",
        links: [
          {
            text: "Kathmandu",
            url: "https://en.wikipedia.org/wiki/Kathmandu",
          },
        ],
      },
      {
        content: "Trek through the picturesque villages of the Khumbu region",
        links: [],
      },
      {
        content: "Visit the famous Tengboche Monastery",
        links: [],
      },
      {
        content: "Experience the breathtaking views of Mount Everest",
        links: [],
      },
    ])

    setItineraries([
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description:
          "Arrive at Tribhuvan International Airport in Kathmandu and transfer to your hotel. Meet your trekking guide and fellow trekkers for a briefing about the trek. Overnight at a 5-star hotel in Kathmandu.",
        itineraryDayPhoto: "",
        accommodation: [
          {
            accommodationTitle: "5-star hotel in Kathmandu",
            accommodationPics: [],
            accommodationDescription: "Luxurious accommodation in Kathmandu",
          },
        ],
        links: [],
      },
      {
        day: 2,
        title: "Fly to Lukla and trek to Phakding",
        description:
          "Take an early morning flight to Lukla and start your trek to Phakding. The trail descends through the Dudh Koshi River valley, passing through small villages and lush forests. Overnight at a luxury lodge in Phakding.",
        itineraryDayPhoto: "",
        accommodation: [
          {
            accommodationTitle: "Luxury lodge in Phakding",
            accommodationPics: [],
            accommodationDescription: "Comfortable lodge with modern amenities",
          },
          {
            accommodationTitle: "Hotel Annapurna",
            accommodationPics: [],
            accommodationDescription: "Comfortable lodge with modern amenities",
          },
        ],
        links: [],
      },
    ])

    setFaqs([
      {
        question: "Is this trek suitable for beginners?",
        answer:
          "This trek is suitable for experienced trekkers who are looking for a luxurious experience in the Himalayas.",
      },
      {
        question: "What is the best time to do this trek?",
        answer:
          "The best time to do this trek is during the spring (March to May) and autumn (September to November) seasons.",
      },
    ])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true) // Show loading before starting the request

    // Prepare form data
    const formData = new FormData()
    formData.append("title", title)
    formData.append("price", price.toString())
    formData.append("country", country)
    formData.append("location", location)
    formData.append("language", language)
    formData.append("suitableAge", suitableAge.toString())
    formData.append("maxAltitude", maxAltitude.toString())
    if (thumbnail) {
      formData.append("thumbnail", thumbnail)
    }
    formData.append("mealType", mealType)
    formData.append("selectedSeasons", JSON.stringify(selectedSeasons)) // Handle arrays as JSON
    formData.append("minDays", minDays.toString())
    formData.append("maxDays", maxDays.toString())
    formData.append("minGroupSize", minGroupSize.toString())
    formData.append("maxGroupSize", maxGroupSize.toString())
    formData.append("arrivalLocation", arrivalLocation)
    formData.append("departureLocation", departureLocation)
    formData.append("startingLocation", startingLocation)
    formData.append("endingLocation", endingLocation)
    formData.append("overview", overview)
    formData.append("accommodations", JSON.stringify(accommodations))
    formData.append("thingsToKnow", JSON.stringify(thingsToKnow))
    formData.append("note", note)
    formData.append("highlights", JSON.stringify(highlights))
    formData.append("itineraries", JSON.stringify(itineraries))
    formData.append("services", JSON.stringify(services))
    formData.append("faqs", JSON.stringify(faqs))

    // Append multiple images
    images.forEach((image) => {
      if (image instanceof File) {
        // Check if the image is a File
        formData.append("images", image)
      }
    })
    if (video) {
      formData.append("video", video) // Assuming `video` is a File object
    }

    try {
      const response = await fetch(`http://localhost:4000/add-tours`, {
        method: "POST",
        body: formData, // Use FormData here
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Response Data:", data)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false) // Turn off loading regardless of success or failure
    }
  }

  return (
    <div className="min-h-screen ">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-primary mb-4">
            Create Your Luxury Experience
          </h1>
          <p className="text-lg text-blue-400">
            Transform Dreams into Extraordinary Journeys
          </p>
          <Button onClick={handleAutofill}>Autofill Form</Button>
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
                  <LocationInput
                    location={location}
                    setLocation={setLocation}
                    error={errors.location || ""}
                  />
                </div>
                <div className="space-y-6">
                  {/* Right column inputs */}
                  <LanguageInput
                    language={language}
                    setLanguage={setLanguage}
                    error={errors.language || ""}
                  />
                  <AgeInput
                    suitableAge={suitableAge}
                    setSuitableAge={setSuitableAge}
                    error={errors.suitableAge || ""}
                  />
                  <MaxAltitudeInput
                    maxAltitude={maxAltitude}
                    setMaxAltitude={setMaxAltitude}
                    error={errors.maxAltitude || ""}
                  />
                  <ThumbnailInput
                    thumbnail={thumbnail}
                    setThumbnail={setThumbnail}
                    error={errors.thumbnail || ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tour Specifics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className=" backdrop-blur-md border border-white/20">
              <CardContent className="p-8">
                {/* <SectionHeader icon={MapPin} title="Tour Specifics" /> */}
                <div className="flex gap-2 text-2xl font-semibold">
                  <MapPin className="w-8 h-8 text-blue-400" /> Tour Specifics
                </div>
                <div className="space-y-6 mt-8">
                  <MealTypeInput
                    mealType={mealType}
                    setMealType={setMealType}
                    error={errors.mealType || ""}
                  />
                  <BestSeasonInput
                    selectedSeasons={selectedSeasons}
                    setSelectedSeasons={setSelectedSeasons}
                    error={errors.selectedSeasons || ""}
                  />
                  <TotalDaysInput
                    minDays={minDays}
                    setMinDays={setMinDays}
                    maxDays={maxDays}
                    setMaxDays={setMaxDays}
                    error={errors.minDays || errors.maxDays || ""}
                  />
                  <GroupSizeInput
                    minGroupSize={minGroupSize}
                    setMinGroupSize={setMinGroupSize}
                    maxGroupSize={maxGroupSize}
                    setMaxGroupSize={setMaxGroupSize}
                    error={errors.minGroupSize || errors.maxGroupSize || ""}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardContent className="p-8">
                {/* <SectionHeader icon={Route} title="Locations" /> */}
                <div className="flex gap-2 text-2xl font-semibold">
                  <Route className="w-8 h-8 text-blue-400" /> Locations
                </div>
                <div className="space-y-6 mt-8">
                  <ArrivalDepartureLocationInput
                    arrivalLocation={arrivalLocation}
                    setArrivalLocation={setArrivalLocation}
                    departureLocation={departureLocation}
                    setDepartureLocation={setDepartureLocation}
                    error={
                      errors.arrivalLocation || errors.departureLocation || ""
                    }
                  />
                  <StartingEndingLocationInput
                    startingLocation={startingLocation}
                    setStartingLocation={setStartingLocation}
                    endingLocation={endingLocation}
                    setEndingLocation={setEndingLocation}
                    error={
                      errors.startingLocation || errors.endingLocation || ""
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Descriptions Section */}
          <Card className=" backdrop-blur-md border border-white/20">
            <CardContent className="p-8">
              {/* <SectionHeader icon={ScrollText} title="Descriptions" /> */}
              <div className="flex gap-2 text-2xl font-semibold">
                <ScrollText className="w-8 h-8 text-blue-400" /> Descriptions
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-6">
                  {/* overview  */}
                  <OverviewInput
                    overview={overview}
                    setOverview={setOverview}
                    error={errors.overview || ""}
                  />

                  {/* accommodation  */}
                  <AccommodationInput
                    accommodations={accommodations}
                    setAccommodations={setAccommodations}
                    error={errors.accommodations || ""}
                  />
                  {/* things to know  */}
                  <ThingsToKnowInput
                    thingsToKnow={thingsToKnow}
                    setThingsToKnow={setThingsToKnow}
                    error={errors.thingsToKnow || ""}
                  />

                  {/* note  */}
                  <NoteInput note={note} setNote={setNote} />
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
                {/* HIGHLIGHTS  */}
                <HighlightsInput
                  highlights={highlights}
                  setHighlights={setHighlights}
                  error={errors.highlights || ""}
                />
                {/* SERVICES  */}
                <ServicesInput
                  services={services}
                  setServices={setServices}
                  error={errors.services || ""}
                />
              </div>

              {/* <SectionHeader icon={Settings} title="Additional Information" /> */}
              <div className="flex gap-2 mt-6 text-2xl font-semibold">
                <Settings className="w-8 h-8 text-blue-400" />
                Additional Information
              </div>
              <div className="space-y-6 mt-8">
                {/* ITINERARIES  */}
                <ItinerariesInput
                  itineraries={itineraries}
                  setItineraries={setItineraries}
                  error={errors.itinerary || ""}
                />
                {/* FAQ  */}
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
                {/* MULTIPLE IMAGES  */}
                <MultiImageInput
                  images={images}
                  setImages={setImages}
                  previews={previews}
                  setPreviews={setPreviews}
                  imageError={imageError}
                  setImageError={setImageError}
                />

                {/* VIDEO  */}
                <VideoUploadInput video={video} setVideo={setVideo} />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium 
              rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.01] transition-all duration-200 
              shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
            >
              Create Your Luxury Tour
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTourForm
