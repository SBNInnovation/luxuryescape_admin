"use client"
import React, { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Trash2,
  Camera,
  BedDouble,
  Plus,
  X,
  Upload,
  HotelIcon,
  MapPin,
} from "lucide-react"
import { ItineraryType } from "../Types/Types"

interface AccommodationType {
  accommodationTitle: string
  accommodationPics: File[]
  accommodationDescription: string
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
  const [accommodations, setAccommodations] = React.useState<
    AccommodationResponseType[]
  >([])

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const addItinerary = () => {
    const newItinerary: ItineraryType = {
      day: itineraries.length + 1 || 1,
      title: "",
      description: "",
      itineraryDayPhoto: "",
      accommodation: [],
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
    key: keyof Omit<ItineraryType, "accommodation" | "links">,
    value: string
  ) => {
    const updatedItinerary = { ...itineraries[index], [key]: value }
    updateItinerary(index, updatedItinerary)
  }

  const addAccommodation = (index: number) => {
    const newAccommodation: AccommodationType = {
      accommodationTitle: "",
      accommodationPics: [],
      accommodationDescription: "",
    }
    const updatedAccommodations = [
      ...itineraries[index].accommodation,
      newAccommodation,
    ]
    const updatedItinerary = {
      ...itineraries[index],
      accommodation: updatedAccommodations,
    }
    updateItinerary(index, updatedItinerary)
  }

  const updateAccommodation = (
    index: number,
    accIndex: number,
    key: keyof AccommodationType,
    value: string | File[]
  ) => {
    const updatedAccommodations = [...itineraries[index].accommodation]
    updatedAccommodations[accIndex] = {
      ...updatedAccommodations[accIndex],
      [key]: value,
    }
    const updatedItinerary = {
      ...itineraries[index],
      accommodation: updatedAccommodations,
    }
    updateItinerary(index, updatedItinerary)
  }

  const handleFileUpload = (
    index: number,
    accIndex: number,
    files: FileList | null
  ) => {
    if (!files) return

    const updatedAccommodations = [...itineraries[index].accommodation]
    const currentPics = updatedAccommodations[accIndex].accommodationPics
    const newFiles = Array.from(files)

    updatedAccommodations[accIndex] = {
      ...updatedAccommodations[accIndex],
      accommodationPics: [...currentPics, ...newFiles],
    }

    const updatedItinerary = {
      ...itineraries[index],
      accommodation: updatedAccommodations,
    }
    updateItinerary(index, updatedItinerary)
  }

  const removeAccommodationImage = (
    index: number,
    accIndex: number,
    imageIndex: number
  ) => {
    const updatedAccommodations = [...itineraries[index].accommodation]
    const updatedPics = updatedAccommodations[
      accIndex
    ].accommodationPics.filter((_, i) => i !== imageIndex)
    updatedAccommodations[accIndex] = {
      ...updatedAccommodations[accIndex],
      accommodationPics: updatedPics,
    }
    const updatedItinerary = {
      ...itineraries[index],
      accommodation: updatedAccommodations,
    }
    updateItinerary(index, updatedItinerary)
  }

  const removeAccommodation = (index: number, accIndex: number) => {
    const updatedAccommodations = itineraries[index].accommodation.filter(
      (_, i) => i !== accIndex
    )
    const updatedItinerary = {
      ...itineraries[index],
      accommodation: updatedAccommodations,
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

  //fetching data for the accommodations
  const getAccommodations = async () => {
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
          <h2 className="text-lg font-bold mb-2">Day {itinerary.day}</h2>

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

          <Input
            type="text"
            placeholder="Day Photo URL"
            value={itinerary.itineraryDayPhoto}
            onChange={(e) =>
              updateField(index, "itineraryDayPhoto", e.target.value)
            }
            className="mb-4"
          />

          {/* accommodations  */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Accommodations</h3>
            {accommodations.length > 0 && (
              <details className="border rounded-lg p-4 bg-white shadow-sm">
                <summary className="cursor-pointer font-semibold text-gray-700 list-none">
                  View Accommodations ({accommodations.length})
                </summary>
                <div
                  className={`mt-2 ${
                    accommodations.length > 5 ? "max-h-64 overflow-y-auto" : ""
                  }`}
                >
                  <div className="grid grid-cols-1 gap-4">
                    {accommodations.map((acc, accIndex) => (
                      <div
                        key={accIndex}
                        className="flex items-center p-3 border rounded-lg hover:shadow-md transition-shadow duration-200"
                      >
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={acc.accommodationPics[0]}
                            alt={acc.accommodationTitle}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        </div>
                        {/* Details */}
                        <div className="ml-4 flex-1">
                          <div className="flex items-center">
                            <HotelIcon
                              size={20}
                              className="mr-2 text-gray-600"
                            />
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
                      </div>
                    ))}
                  </div>
                </div>
              </details>
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

      <Button type="button" onClick={addItinerary} className="mt-4">
        Add Itinerary
      </Button>
    </div>
  )
}

export default ItinerariesInput
