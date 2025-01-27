import { Input } from "@/components/ui/input"
import React from "react"

interface TitleInputProps {
  rating: number
  setRating: React.Dispatch<React.SetStateAction<number>>
  error: string
}

const RatingInput: React.FC<TitleInputProps> = ({
  rating,
  setRating,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value))
  }
  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700">
        Rating (1-5)<span className="text-red-700">*</span>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input
        type="number"
        value={rating}
        onChange={handleChange}
        min={1}
        max={5}
        placeholder="Enter Rating (1-5)"
        className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
      />
    </div>
  )
}

export default RatingInput
