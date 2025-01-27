import React from "react"

interface AccoImagesProps {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  error: string
}

const AccoImages: React.FC<AccoImagesProps> = ({
  images,
  setImages,
  error,
}) => {
  // Handle adding new images
  const handleAccommodationImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setImages((prev) => [...prev, ...newImages])
    }
  }

  // Handle removing an image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700">
        Accommodation Images <span className="text-red-700">*</span>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="mt-2">
        <input
          type="file"
          onChange={handleAccommodationImages}
          accept="image/*"
          multiple
          className="mb-2"
        />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Accommodation ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AccoImages
