import React, { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Camera, BedDouble, Plus, X, Upload } from "lucide-react"
import { ItineraryType } from "../Types/Types"

interface AccommodationType {
  accommodationTitle: string
  accommodationPics: File[]
  accommodationDescription: string
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
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const addItinerary = () => {
    const newItinerary: ItineraryType = {
      day: (itineraries.length + 1).toString(),
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

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Accommodations</h3>
            {itinerary.accommodation.map((acc, accIndex) => (
              <div key={accIndex} className="border p-3 rounded-md mb-3">
                <Input
                  type="text"
                  placeholder="Accommodation Title"
                  value={acc.accommodationTitle}
                  onChange={(e) =>
                    updateAccommodation(
                      index,
                      accIndex,
                      "accommodationTitle",
                      e.target.value
                    )
                  }
                  className="mb-2"
                />
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder="Accommodation Description"
                  value={acc.accommodationDescription}
                  onChange={(e) =>
                    updateAccommodation(
                      index,
                      accIndex,
                      "accommodationDescription",
                      e.target.value
                    )
                  }
                />

                {/* Images Section */}
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Accommodation Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {acc.accommodationPics.map((file, picIndex) => (
                      <div key={picIndex} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Accommodation ${picIndex + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <button
                          onClick={() =>
                            removeAccommodationImage(index, accIndex, picIndex)
                          }
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full 
                                   opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    ref={(el) => {
                      fileInputRefs.current[`${index}-${accIndex}`] = el
                    }}
                    onChange={(e) =>
                      handleFileUpload(index, accIndex, e.target.files)
                    }
                  />

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mb-4"
                    onClick={() =>
                      fileInputRefs.current[`${index}-${accIndex}`]?.click()
                    }
                  >
                    <Upload size={16} className="mr-2" />
                    Upload Images
                  </Button>
                </div>

                <Button
                  type="button"
                  onClick={() => removeAccommodation(index, accIndex)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 size={16} className="mr-2" />
                  Remove Accommodation
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => addAccommodation(index)}
              variant="outline"
              className="mt-2"
            >
              <BedDouble size={16} className="mr-2" />
              Add Accommodation
            </Button>
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
