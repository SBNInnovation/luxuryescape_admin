import React from "react"
import { Camera, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { HighlightType } from "../Types/Types"

interface HighlightsInputProps {
  highlights: HighlightType[]
  setHighlights: React.Dispatch<React.SetStateAction<HighlightType[]>>
  error: string
}

const HighlightsInput: React.FC<HighlightsInputProps> = ({
  highlights,
  setHighlights,
  error,
}) => {
  const updateHighlight = (index: number, updatedHighlight: HighlightType) => {
    const updatedHighlights = highlights.map((highlight, i) =>
      i === index ? updatedHighlight : highlight
    )
    setHighlights(updatedHighlights)
  }

  const addHighlight = () => {
    setHighlights([...highlights, { content: "", links: [] }])
  }

  const removeHighlight = (index: number) => {
    const updatedHighlights = highlights.filter((_, i) => i !== index)
    setHighlights(updatedHighlights)
  }

  const updateLink = (
    highlightIndex: number,
    linkIndex: number,
    key: "text" | "url",
    value: string
  ) => {
    const updatedLinks = [...highlights[highlightIndex].links]
    updatedLinks[linkIndex][key] = value
    updateHighlight(highlightIndex, {
      ...highlights[highlightIndex],
      links: updatedLinks,
    })
  }

  const addLink = (highlightIndex: number) => {
    const updatedLinks = [
      ...highlights[highlightIndex].links,
      { text: "", url: "" },
    ]
    updateHighlight(highlightIndex, {
      ...highlights[highlightIndex],
      links: updatedLinks,
    })
  }

  const removeLink = (highlightIndex: number, linkIndex: number) => {
    const updatedLinks = highlights[highlightIndex].links.filter(
      (_, i) => i !== linkIndex
    )
    updateHighlight(highlightIndex, {
      ...highlights[highlightIndex],
      links: updatedLinks,
    })
  }

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700">
        Highlights:
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {highlights.map((highlight, index) => (
        <div
          key={index}
          className="mb-4 border p-2 rounded-md border-primary pb-4"
        >
          <div className="flex items-center justify-between">
            <Input
              type="text"
              required
              placeholder="Highlight Content"
              value={highlight.content}
              onChange={(e) =>
                updateHighlight(index, {
                  ...highlight,
                  content: e.target.value,
                })
              }
              className="flex-grow"
            />
            <Button
              type="button"
              onClick={() => removeHighlight(index)}
              variant={"destructive"}
              className="ml-4"
            >
              <Trash2 size={18} />
              Remove Highlight
            </Button>
          </div>

          <h1 className="text-lg font-bold mt-4">Links</h1>

          {highlight.links.map((link, linkIndex) => (
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
        </div>
      ))}

      <Button
        type="button"
        onClick={addHighlight}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Highlight
      </Button>
    </div>
  )
}

export default HighlightsInput
