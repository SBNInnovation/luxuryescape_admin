"use client"
import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Camera, HotelIcon, MapPin, Search } from "lucide-react"

// Update ItineraryType to include file type for photo and string[] for accommodation IDs
interface ItineraryType {
  day: string
  title: string
  description: string
  itineraryDayPhoto: File | null
  itineraryDayPhotoPreview?: string
  accommodationIds: string[]
  links: Array<{ text: string; url: string }>
}

interface AccommodationResponseType {
  _id: string
  accommodationTitle: string
  accommodationPics: string[]
  accommodationLocation: string
  accommodationRating: string
  slug: string
}

interface ItinerariesInputProps {
  itineraries: ItineraryType[]
  setItineraries: React.Dispatch<React.SetStateAction<ItineraryType[]>>
  error: string
}

const ItinerariesInput: React.FC<ItinerariesInputProps> = ({
  itineraries,
  setItineraries,
  error,
}) => {
  const [accommodations, setAccommodations] = useState<
    AccommodationResponseType[]
  >([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const addItinerary = () => {
    const newItinerary: ItineraryType = {
      day: "",
      title: "",
      description: "",
      itineraryDayPhoto: null,
      accommodationIds: [],
      links: [],
    }
    setItineraries([...itineraries, newItinerary])
  }

  const updateItinerary = (index: number, updatedItinerary: ItineraryType) => {
    const updatedItineraries = itineraries.map((itinerary, i) =>
      i === index ? updatedItinerary : itinerary
    )
    setItineraries(updatedItineraries)
  }

  const removeItinerary = (index: number) => {
    const updatedItineraries = itineraries.filter((_, i) => i !== index)
    setItineraries(updatedItineraries)
  }

  const updateField = (
    index: number,
    key: keyof Omit<
      ItineraryType,
      | "accommodation"
      | "links"
      | "itineraryDayPhoto"
      | "itineraryDayPhotoPreview"
    >,
    value: string
  ) => {
    const updatedItinerary = { ...itineraries[index], [key]: value }
    updateItinerary(index, updatedItinerary)
  }

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedItinerary = { ...itineraries[index] }
        updatedItinerary.itineraryDayPhoto = file
        updatedItinerary.itineraryDayPhotoPreview = reader.result as string
        updateItinerary(index, updatedItinerary)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleAccommodation = (index: number, accommodationId: string) => {
    const updatedItinerary = { ...itineraries[index] }
    const accommodationIndex =
      updatedItinerary.accommodationIds.indexOf(accommodationId)

    if (accommodationIndex === -1) {
      updatedItinerary.accommodationIds.push(accommodationId)
    } else {
      updatedItinerary.accommodationIds.splice(accommodationIndex, 1)
    }
    updateItinerary(index, updatedItinerary)
  }

  const addLink = (index: number) => {
    const updatedLinks = [...itineraries[index].links, { text: "", url: "" }]
    const updatedItinerary = { ...itineraries[index], links: updatedLinks }
    updateItinerary(index, updatedItinerary)
  }

  const updateLink = (
    index: number,
    linkIndex: number,
    key: "text" | "url",
    value: string
  ) => {
    const updatedLinks = [...itineraries[index].links]
    updatedLinks[linkIndex][key] = value
    const updatedItinerary = { ...itineraries[index], links: updatedLinks }
    updateItinerary(index, updatedItinerary)
  }

  const removeLink = (index: number, linkIndex: number) => {
    const updatedLinks = itineraries[index].links.filter(
      (_, i) => i !== linkIndex
    )
    const updatedItinerary = { ...itineraries[index], links: updatedLinks }
    updateItinerary(index, updatedItinerary)
  }

  const filteredAccommodations = accommodations.filter((acc) =>
    acc.accommodationTitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getAccommodations = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_PROD}/accommodation/get-all-accommodation`,
        {
          method: "GET",
        }
      )
      const data = await response.json()

      if (data.success) {
        setAccommodations(data.data.accommodations)
      }
    } catch (error) {
      console.error("Error fetching accommodations:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAccommodations()
  }, [])

  return (
    <div>
      <label className="block text-lg font-medium text-gray-700">
        Itineraries <span className="text-red-700">*</span>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {itineraries.map((itinerary, index) => (
        <div key={index} className="mb-4 border p-4 rounded-md border-primary">
          <Input
            type="text"
            placeholder="Day"
            value={itinerary.day}
            onChange={(e) => updateField(index, "day", e.target.value)}
            className="mb-4"
            required
          />

          <Input
            type="text"
            placeholder="Title"
            value={itinerary.title}
            onChange={(e) => updateField(index, "title", e.target.value)}
            className="mb-4"
            required
          />

          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter day description"
            value={itinerary.description}
            onChange={(e) => updateField(index, "description", e.target.value)}
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Day Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e)}
              className="mt-1"
            />
            {itinerary.itineraryDayPhotoPreview && (
              <img
                src={itinerary.itineraryDayPhotoPreview}
                alt="Day Photo"
                className="mt-2 w-20 h-20 object-cover rounded-md"
              />
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Accommodations</h3>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search accommodations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            {/* for loading  */}
            {loading && accommodations.length === 0 && (
              <p className="text-gray-500">Loading accommodations...</p>
            )}
            {/* for no accommodations  */}
            {!loading && filteredAccommodations.length === 0 && (
              <p className="text-gray-500">
                No accommodations found. Try adding!
              </p>
            )}
            {filteredAccommodations.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAccommodations.map((acc, accIndex) => (
                  <div
                    key={accIndex}
                    className="flex items-center p-3 border rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => toggleAccommodation(index, acc._id)}
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={acc.accommodationPics[0]}
                        alt={acc.accommodationTitle}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center">
                        <HotelIcon size={20} className="mr-2 text-gray-600" />
                        <p className="font-semibold text-gray-700">
                          {acc.accommodationTitle}
                        </p>
                      </div>
                      <div className="flex items-center mt-1 gap-4">
                        <p className="flex text-sm text-blue-500">
                          <MapPin size={10} className="mr-1" />
                          {acc.accommodationLocation}
                        </p>
                        <p className="text-sm text-gray-500">
                          Rating: {acc.accommodationRating}
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={itinerary.accommodationIds.includes(acc._id)}
                      onChange={() => toggleAccommodation(index, acc._id)}
                      className="ml-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Links</h3>
            {itinerary.links.map((link, linkIndex) => (
              <div key={linkIndex} className="flex items-center mb-2">
                <Input
                  type="text"
                  placeholder="Text"
                  value={link.text}
                  onChange={(e) =>
                    updateLink(index, linkIndex, "text", e.target.value)
                  }
                  className="mr-2"
                />
                <Input
                  type="text"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    updateLink(index, linkIndex, "url", e.target.value)
                  }
                  className="mr-2"
                />
                <Button
                  type="button"
                  onClick={() => removeLink(index, linkIndex)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => addLink(index)}
              variant="outline"
            >
              <Camera size={16} className="mr-2" />
              Add Link
            </Button>
          </div>

          <Button
            type="button"
            onClick={() => removeItinerary(index)}
            variant="destructive"
          >
            <Trash2 size={18} className="mr-2" />
            Remove Itinerary
          </Button>
        </div>
      ))}

      <Button type="button" onClick={addItinerary} className="mt-4 text-white">
        Add Itinerary
      </Button>
    </div>
  )
}

export default ItinerariesInput
