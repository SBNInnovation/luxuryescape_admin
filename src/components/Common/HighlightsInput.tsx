// import React, { useState, useEffect } from "react"
// import { Camera, Trash2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// interface HighlightType {
//   highlightsTitle: string
//   highlightPicture: File | null // Keep File type for handling but won't be in final JSON
//   highlightPicturePreview?: string // Optional URL for preview
//   highlightPictureId?: string // Optional ID for existing images
// }

// interface HighlightsInputProps {
//   highlights: HighlightType[]
//   highlightPicturePreviews?: string[]
//   setHighlights: React.Dispatch<React.SetStateAction<HighlightType[]>>
//   error: string
// }

// const HighlightsInput: React.FC<HighlightsInputProps> = ({
//   highlights,
//   setHighlights,
//   highlightPicturePreviews,
//   error,
// }) => {
//   // State to store preview URLs
//   const [previewUrls, setPreviewUrls] = useState<string[]>(
//     Array(highlights.length).fill("")
//   )

//   // Initialize preview URLs when component mounts or highlights change
//   useEffect(() => {
//     // Create preview URLs for existing files
//     const urls = highlights.map((highlight) => {
//       if (highlight.highlightPicture instanceof File) {
//         return URL.createObjectURL(highlight.highlightPicture)
//       }
//       return ""
//     })

//     setPreviewUrls(urls)

//     // Cleanup function to revoke URLs when component unmounts
//     return () => {
//       urls.forEach((url) => {
//         if (url) URL.revokeObjectURL(url)
//       })
//     }
//   }, [highlights])

//   const updateHighlight = (
//     index: number,
//     updatedHighlight: Partial<HighlightType>
//   ) => {
//     const updatedHighlights = highlights.map((highlight, i) =>
//       i === index ? { ...highlight, ...updatedHighlight } : highlight
//     )
//     setHighlights(updatedHighlights)
//   }

//   const addHighlight = () => {
//     setHighlights([
//       ...highlights,
//       { highlightsTitle: "", highlightPicture: null },
//     ])
//     setPreviewUrls([...previewUrls, ""])
//   }

//   const removeHighlight = (index: number) => {
//     // Clean up URL object to prevent memory leaks
//     if (previewUrls[index]) {
//       URL.revokeObjectURL(previewUrls[index])
//     }

//     const updatedHighlights = highlights.filter((_, i) => i !== index)
//     setHighlights(updatedHighlights)

//     const updatedPreviewUrls = [...previewUrls]
//     updatedPreviewUrls.splice(index, 1)
//     setPreviewUrls(updatedPreviewUrls)
//   }

//   const handleFileChange = (index: number, file: File) => {
//     if (file) {
//       // Revoke previous URL if exists to prevent memory leaks
//       if (previewUrls[index]) {
//         URL.revokeObjectURL(previewUrls[index])
//       }

//       // Update the file in our highlights state
//       updateHighlight(index, { highlightPicture: file })

//       // Create a temporary URL for preview
//       const fileUrl = URL.createObjectURL(file)
//       const updatedPreviewUrls = [...previewUrls]
//       updatedPreviewUrls[index] = fileUrl
//       setPreviewUrls(updatedPreviewUrls)
//     }
//   }

//   console.log("highlights img preview")

//   return (
//     <div className="mb-4">
//       <label className="block text-lg font-medium text-gray-700">
//         Highlights:
//       </label>
//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       {highlights.map((highlight, index) => (
//         <div key={index} className="mb-4 border p-4 rounded-md border-primary">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-md font-medium">Highlight {index + 1}</h3>
//             <Button
//               type="button"
//               onClick={() => removeHighlight(index)}
//               variant="destructive"
//               size="sm"
//             >
//               <Trash2 size={18} className="mr-2" />
//               Remove
//             </Button>
//           </div>

//           <div className="space-y-4">
//             {/* Title Input */}
//             <div>
//               <Input
//                 type="text"
//                 required
//                 placeholder="Enter highlight title"
//                 value={highlight.highlightsTitle}
//                 onChange={(e) =>
//                   updateHighlight(index, {
//                     highlightsTitle: e.target.value,
//                   })
//                 }
//                 className="w-full"
//               />
//             </div>

//             {/* Picture Upload */}
//             <div>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0]
//                     if (file) {
//                       handleFileChange(index, file)
//                     }
//                   }}
//                   className="w-full"
//                 />
//                 <Button
//                   type="button"
//                   size="icon"
//                   variant="outline"
//                   className="flex-shrink-0"
//                 >
//                   <Camera size={18} />
//                 </Button>
//               </div>

//               {/* File name display */}
//               {highlight.highlightPicture instanceof File && (
//                 <p className="mt-1 text-sm text-gray-500">
//                   Selected file: {highlight.highlightPicture.name}
//                 </p>
//               )}

//               {/* Picture Preview */}
//               {highlight.highlightPicturePreview && (
//                 <div className="mt-2">
//                   <img
//                     src={highlight.highlightPicturePreview}
//                     alt={`Preview of ${highlight.highlightsTitle}`}
//                     className="mt-2 max-h-32 rounded-md border border-gray-200"
//                   />
//                 </div>
//               )}

//               {/* Picture Preview */}
//               {previewUrls[index] && (
//                 <div className="mt-2">
//                   <img
//                     src={previewUrls[index]}
//                     alt={`Preview of ${highlight.highlightsTitle}`}
//                     className="mt-2 max-h-32 rounded-md border border-gray-200"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}

//       <Button
//         type="button"
//         onClick={addHighlight}
//         className="mt-4 flex items-center text-white"
//       >
//         <Camera size={18} className="mr-2" />
//         Add Highlight
//       </Button>
//     </div>
//   )
// }

// export default HighlightsInput

import React, { useState, useEffect } from "react"
import { Camera, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HighlightType {
  highlightsTitle: string
  highlightPicture: File | null
  highlightPicturePreview?: string
  highlightPictureId?: string
}

interface HighlightsInputProps {
  highlights: HighlightType[]
  highlightPicturePreviews?: string[]
  setHighlights: React.Dispatch<React.SetStateAction<HighlightType[]>>
  error: string
}

const HighlightsInput: React.FC<HighlightsInputProps> = ({
  highlights,
  setHighlights,
  highlightPicturePreviews,
  error,
}) => {
  // State to store preview URLs
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    Array(highlights.length).fill("")
  )

  // Initialize preview URLs when component mounts or highlights change
  useEffect(() => {
    // Create preview URLs for existing files
    const urls = highlights.map((highlight) => {
      if (highlight.highlightPicture instanceof File) {
        return URL.createObjectURL(highlight.highlightPicture)
      }
      return ""
    })

    setPreviewUrls(urls)

    // Cleanup function to revoke URLs when component unmounts
    return () => {
      urls.forEach((url) => {
        if (url) URL.revokeObjectURL(url)
      })
    }
  }, [highlights])

  const updateHighlight = (
    index: number,
    updatedHighlight: Partial<HighlightType>
  ) => {
    const updatedHighlights = highlights.map((highlight, i) =>
      i === index ? { ...highlight, ...updatedHighlight } : highlight
    )
    setHighlights(updatedHighlights)
  }

  const addHighlight = () => {
    setHighlights([
      ...highlights,
      { highlightsTitle: "", highlightPicture: null },
    ])
    setPreviewUrls([...previewUrls, ""])
  }

  const removeHighlight = (index: number) => {
    // Clean up URL object to prevent memory leaks
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index])
    }

    const updatedHighlights = highlights.filter((_, i) => i !== index)
    setHighlights(updatedHighlights)

    const updatedPreviewUrls = [...previewUrls]
    updatedPreviewUrls.splice(index, 1)
    setPreviewUrls(updatedPreviewUrls)
  }

  const handleFileChange = (index: number, file: File) => {
    if (file) {
      // Revoke previous URL if exists to prevent memory leaks
      if (previewUrls[index]) {
        URL.revokeObjectURL(previewUrls[index])
      }

      // Update the file in our highlights state
      updateHighlight(index, { highlightPicture: file })

      // Create a temporary URL for preview
      const fileUrl = URL.createObjectURL(file)
      const updatedPreviewUrls = [...previewUrls]
      updatedPreviewUrls[index] = fileUrl
      setPreviewUrls(updatedPreviewUrls)
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700">
        Highlights:
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {highlights.map((highlight, index) => (
        <div key={index} className="mb-4 border p-4 rounded-md border-primary">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-medium">Highlight {index + 1}</h3>
            <Button
              type="button"
              onClick={() => removeHighlight(index)}
              variant="destructive"
              size="sm"
            >
              <Trash2 size={18} className="mr-2" />
              Remove
            </Button>
          </div>

          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <Input
                type="text"
                required
                placeholder="Enter highlight title"
                value={highlight.highlightsTitle || ""} // Add fallback empty string
                onChange={(e) =>
                  updateHighlight(index, {
                    highlightsTitle: e.target.value,
                  })
                }
                className="w-full"
              />
            </div>

            {/* Picture Upload - Keep as uncontrolled component */}
            <div>
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileChange(index, file)
                    }
                  }}
                  className="w-full"
                  // Remove value prop for file inputs - they should be uncontrolled
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="flex-shrink-0"
                >
                  <Camera size={18} />
                </Button>
              </div>

              {/* File name display */}
              {highlight.highlightPicture instanceof File && (
                <p className="mt-1 text-sm text-gray-500">
                  Selected file: {highlight.highlightPicture.name}
                </p>
              )}

              {/* Picture Preview from props */}
              {highlight.highlightPicturePreview && (
                <div className="mt-2">
                  <img
                    src={highlight.highlightPicturePreview}
                    alt={`Preview of ${
                      highlight.highlightsTitle || "highlight"
                    }`}
                    className="mt-2 max-h-32 rounded-md border border-gray-200"
                  />
                </div>
              )}
              {/* for edit preview  */}
              {highlightPicturePreviews && (
                <div className="mt-2">
                  <p>Existing : </p>
                  <img
                    src={highlightPicturePreviews[index]}
                    alt={`Preview of ${
                      highlight.highlightsTitle || "highlight"
                    }`}
                    className="mt-2 max-h-32 rounded-md border border-gray-200"
                  />
                </div>
              )}

              {/* Picture Preview from local state */}
              {previewUrls[index] && (
                <div className="mt-2">
                  <p>New : </p>
                  <img
                    src={previewUrls[index]}
                    alt={`Preview of ${
                      highlight.highlightsTitle || "highlight"
                    }`}
                    className="mt-2 max-h-32 rounded-md border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={addHighlight}
        className="mt-4 flex items-center text-white"
      >
        <Camera size={18} className="mr-2" />
        Add Highlight
      </Button>
    </div>
  )
}

export default HighlightsInput
