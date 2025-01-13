"use client"

import React, { useState } from "react"
import { z } from "zod"

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

//types
import {
  HighlightType,
  ItineraryType,
  ServicesType,
  FAQType,
} from "../Types/Types"
import MultiImageInput from "../Common/MultiImageInput"

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    const formData = {
      title,

      price,
    }
    console.log("Form Data Submitted:", formData)
    setLoading(true)
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Create Your Tour
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* BASIC INFORMATION  */}

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

          {/*   tour type will be added here  */}

          {/* TOUR SPECIFICS  */}

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
          <ArrivalDepartureLocationInput
            arrivalLocation={arrivalLocation}
            setArrivalLocation={setArrivalLocation}
            departureLocation={departureLocation}
            setDepartureLocation={setDepartureLocation}
            error={errors.arrivalLocation || errors.departureLocation || ""}
          />
          <StartingEndingLocationInput
            startingLocation={startingLocation}
            setStartingLocation={setStartingLocation}
            endingLocation={endingLocation}
            setEndingLocation={setEndingLocation}
            error={errors.startingLocation || errors.endingLocation || ""}
          />

          {/* DESCRIPTION  */}

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

          {/* HIGHLIGHTS  */}
          <HighlightsInput
            highlights={highlights}
            setHighlights={setHighlights}
            error={errors.highlights || ""}
          />
          {/* ITINERARIES  */}
          <ItinerariesInput
            itineraries={itineraries}
            setItineraries={setItineraries}
            error={errors.itinerary || ""}
          />
          {/* SERVICES  */}
          <ServicesInput
            services={services}
            setServices={setServices}
            error={errors.services || ""}
          />
          {/* FAQ  */}
          <FAQInput faqs={faqs} setFaqs={setFaqs} />

          {/* MULTIPLE IMAGES  */}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateTourForm
