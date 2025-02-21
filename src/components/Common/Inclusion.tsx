import React from "react"

interface AccommodationInputProps {
  inclusion: string[]
  setInclusion: React.Dispatch<React.SetStateAction<string[]>>
  error: string
}

const Inclusion: React.FC<AccommodationInputProps> = ({
  inclusion,
  setInclusion,
  error,
}) => {
  const handleAddInclusion = () => {
    setInclusion([...inclusion, ""])
  }

  const handleInclusionChange = (index: number, value: string) => {
    const updateInclusion = inclusion.map((inclusion, i) =>
      i === index ? value : inclusion
    )
    setInclusion(updateInclusion)
  }

  const handleRemoveInclusion = (index: number) => {
    const updateInclusion = inclusion.filter((_, i) => i !== index)
    setInclusion(updateInclusion)
  }

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700">
        Inclusion <span className="text-red-700">*</span>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {inclusion.map((inclusion, index) => (
        <div key={index} className="mt-2 flex items-center space-x-4">
          <input
            type="text"
            value={inclusion}
            onChange={(e) => handleInclusionChange(index, e.target.value)}
            placeholder={`Accommodation #${index + 1}`}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
          <button
            type="button"
            onClick={() => handleRemoveInclusion(index)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddInclusion}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add New
      </button>
    </div>
  )
}

export default Inclusion
