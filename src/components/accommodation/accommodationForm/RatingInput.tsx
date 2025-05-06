import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from "react"

interface RatingInputProps {
  rating: number
  setRating: React.Dispatch<React.SetStateAction<number>>
  error: string
}

const RatingInput: React.FC<RatingInputProps> = ({
  rating,
  setRating,
  error,
}) => {
  // Updated handler for Select component
  const handleSelectChange = (value: string) => {
    setRating(Number(value))
  }

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700">
        Rating (1-5)<span className="text-red-700">*</span>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Select value={rating?.toString()} onValueChange={handleSelectChange}>
        <SelectTrigger className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <SelectValue placeholder="Select Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">1 star</SelectItem>
            <SelectItem value="2">2 star</SelectItem>
            <SelectItem value="3">3 star</SelectItem>
            <SelectItem value="4">4 star</SelectItem>
            <SelectItem value="5">5 star</SelectItem>
            <SelectItem value="6">Premium 5 star</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default RatingInput
