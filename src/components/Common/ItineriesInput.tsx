import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Camera } from "lucide-react"

import { ItineraryType } from "../Types/Types"

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
  const addItinerary = () => {
    const newItinerary: ItineraryType = {
      day: itineraries.length + 1,
      title: "",
      details: "",
      accommodations: "",
      meals: "",
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
    key: "title" | "details" | "accommodations" | "meals",
    value: string
  ) => {
    const updatedItinerary = { ...itineraries[index], [key]: value }
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
        <div key={index} className="mb-4 border p-2 rounded-md border-primary">
          <h2 className="text-lg font-bold mb-2">Day {itinerary.day}</h2>

          <Input
            type="text"
            placeholder="Title"
            value={itinerary.title}
            onChange={(e) => updateField(index, "title", e.target.value)}
            required
          />

          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mt-4"
            placeholder="Enter itinerary details"
            value={itinerary.details}
            required
            onChange={(e) => updateField(index, "details", e.target.value)}
          />

          <h1 className="text-lg font-bold mt-4">Links</h1>
          {itinerary.links.map((link, linkIndex) => (
            <div key={linkIndex} className="mt-2 flex items-center">
              <Input
                type="text"
                placeholder="Key (text)"
                value={link.text}
                onChange={(e) =>
                  updateLink(index, linkIndex, "text", e.target.value)
                }
                className="flex-grow mr-2"
              />
              <Input
                type="text"
                placeholder="Value (url)"
                value={link.url}
                onChange={(e) =>
                  updateLink(index, linkIndex, "url", e.target.value)
                }
                className="flex-grow mr-2"
              />
              <Button
                type="button"
                onClick={() => removeLink(index, linkIndex)}
                variant={"destructive"}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => addLink(index)}
            className="mt-2 flex items-center text-white"
          >
            <Camera size={18} className="mr-2" />
            Add Link
          </Button>

          <h1 className="text-lg font-bold mt-4">Accommodations</h1>
          <Input
            type="text"
            placeholder="Accommodation"
            value={itinerary.accommodations}
            onChange={(e) =>
              updateField(index, "accommodations", e.target.value)
            }
            required
          />

          <h1 className="text-lg font-bold mt-4">Meals</h1>
          <Input
            type="text"
            placeholder="Meals"
            value={itinerary.meals}
            onChange={(e) => updateField(index, "meals", e.target.value)}
            required
          />

          <Button
            type="button"
            onClick={() => removeItinerary(index)}
            variant={"destructive"}
            className="mt-4"
          >
            <Trash2 size={18} className="mr-2" />
            Remove Itinerary
          </Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={addItinerary}
        className="mt-4 flex items-center text-white"
      >
        Add Itinerary
      </Button>
    </div>
  )
}

export default ItinerariesInput
