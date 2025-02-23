interface Link {
  text: string
  url: string
}

export interface HighlightType {
  content: string
  links: Link[]
}

interface Link {
  text: string
  url: string
}

interface AccommodationType {
  accommodationTitle: string
  accommodationPics: File[]
  accommodationDescription: string
}

// export interface ItineraryType {
//   day: string
//   title: string
//   description: string
//   itineraryDayPhoto: File | null
//   itineraryDayPhotoPreview: string | null
//   accommodation: AccommodationType[]
//   links: { text: string; url: string }[]
// }

export interface ItineraryType {
  day: string
  title: string
  description: string
  itineraryDayPhoto: File | null
  itineraryDayPhotoPreview?: string
  accommodation: string[]
  links: Array<{ text: string; url: string }>
}

export interface ServicesType {
  inclusives: string[]
  exclusives: string[]
}

export interface FAQType {
  question: string
  answer: string
}
