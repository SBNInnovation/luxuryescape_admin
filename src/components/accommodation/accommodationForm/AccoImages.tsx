// import Image from "next/image"
// import React, { useState, useEffect } from "react"

// interface AccoImagesProps {
//   images: File[]
//   setImages: React.Dispatch<React.SetStateAction<File[]>>
//   error?: string
//   maxImages?: number
//   maxFileSize?: number
//   previews?: string[]
//   oldImagesPreviews?: string[]
//   imageToDelete?: React.Dispatch<React.SetStateAction<string[]>>
//   setPreviews?: React.Dispatch<React.SetStateAction<string[]>>
// }

// const AccoImages: React.FC<AccoImagesProps> = ({
//   images,
//   setImages,
//   previews,
//   setPreviews,
//   oldImagesPreviews,
//   imageToDelete,
//   error,
//   maxImages = 5,
//   maxFileSize = 1 * 1024 * 1024, // 1MB default
// }) => {
//   // Handle creating and cleaning up image previews
//   useEffect(() => {

//     const objectUrls = images.map((image) => URL.createObjectURL(image))
//     setPreviews && setPreviews(objectUrls)

//     return () => {
//       objectUrls.forEach((url) => URL.revokeObjectURL(url))
//     }
//   }, [images])

//   // Handle adding new images
//   const handleAccommodationImages = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const files = e.target.files
//     if (files) {
//       // Convert FileList to Array and apply validations
//       const newImages = Array.from(files).filter(
//         (file) => file.type.startsWith("image/") && file.size <= maxFileSize
//       )

//       setImages((prev) => {
//         // Combine and slice to max images
//         const combinedImages = [...prev, ...newImages]
//         return combinedImages.slice(0, maxImages)
//       })
//     }
//   }

//   // Handle removing an image
//   const removeImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index))
//   }

//   return (
//     <div className="mb-4">
//       <label className="block text-lg font-medium text-gray-700">
//         Accommodation Images <span className="text-red-700">*</span>
//       </label>
//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       <div className="mt-2">
//         <input
//           type="file"
//           onChange={handleAccommodationImages}
//           accept="image/*"
//           multiple
//           className="mb-2"
//         />
//         <p className="text-sm text-gray-600 mb-2">
//           Max {maxImages} images, each up to {maxFileSize / 1024 / 1024}MB
//         </p>

//         {images.length > 0 && (
//           <div className="grid grid-cols-3 gap-4 mt-4">
//             {previews?.map((preview, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={preview}
//                   alt={`Accommodation ${index + 1}`}
//                   className="w-full h-32 object-cover rounded-lg"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   aria-label={`Remove image ${index + 1}`}
//                   className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <p className="text-sm text-gray-600 mt-4">Currect Image:</p>
//         {oldImagesPreviews && oldImagesPreviews.length > 0 && (
//           <div className="grid grid-cols-3 gap-4 mt-4">
//             {oldImagesPreviews.map((preview, index) => (
//               <div key={index} className="relative">
//                 <Image
//                   src={preview}
//                   alt={`Accommodation ${index + 1}`}
//                   className="object-cover rounded-lg"
//                   width={200}
//                   height={200}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   aria-label={`Remove image ${index + 1}`}
//                   className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AccoImages

import Image from "next/image"
import React, { useState, useEffect } from "react"
import { set } from "zod"

interface AccoImagesProps {
  images: File[]
  setImages: React.Dispatch<React.SetStateAction<File[]>>
  error?: string
  maxImages?: number
  maxFileSize?: number
  previews?: string[]
  oldImagesPreviews?: string[]
  setOldImagesPreviews?: React.Dispatch<React.SetStateAction<string[]>>
  imageToDelete?: React.Dispatch<React.SetStateAction<string[]>>
  setPreviews?: React.Dispatch<React.SetStateAction<string[]>>
}

const AccoImages: React.FC<AccoImagesProps> = ({
  images,
  setImages,
  previews,
  setPreviews,
  oldImagesPreviews,
  setOldImagesPreviews,
  imageToDelete,
  error,
  maxImages = 5,
  maxFileSize = 1 * 1024 * 1024, // 1MB default
}) => {
  // Handle creating and cleaning up image previews
  useEffect(() => {
    const objectUrls = images.map((image) => URL.createObjectURL(image))
    setPreviews && setPreviews(objectUrls)

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [images])

  // Handle adding new images
  const handleAccommodationImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files
    if (files) {
      // Convert FileList to Array and apply validations
      const newImages = Array.from(files).filter(
        (file) => file.type.startsWith("image/") && file.size <= maxFileSize
      )

      setImages((prev) => {
        // Combine and slice to max images
        const combinedImages = [...prev, ...newImages]
        return combinedImages.slice(0, maxImages)
      })
    }
  }

  // Handle removing a new image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle removing an existing image
  const removeOldImage = (index: number, imagePath: string) => {
    if (imageToDelete) {
      // Add the image path to the imageToDelete state
      imageToDelete((prev) => [...prev, imagePath])
      setOldImagesPreviews &&
        setOldImagesPreviews((prev) => prev.filter((_, i) => i !== index))

      // Remove the image from oldImagesPreviews if needed
      // This would typically be handled by the parent component
      // based on the imageToDelete state
    }
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
        <p className="text-sm text-gray-600 mb-2">
          Max {maxImages} images, each up to {maxFileSize / 1024 / 1024}MB
        </p>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {previews?.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Accommodation ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label={`Remove image ${index + 1}`}
                  className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-600 mt-4">Current Images:</p>
        {oldImagesPreviews && oldImagesPreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {oldImagesPreviews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview}
                  alt={`Accommodation ${index + 1}`}
                  className="object-cover rounded-lg"
                  width={200}
                  height={200}
                />
                <button
                  type="button"
                  onClick={() => removeOldImage(index, preview)}
                  aria-label={`Remove image ${index + 1}`}
                  className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AccoImages
