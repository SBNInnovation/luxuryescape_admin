interface Link {
  text: string
  url: string
}

export interface HighlightType {
  highlightsTitle: string
  highlightPicture: File | null
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

export interface BookingPriceInterface {
  _id: string
  adventureId: string
  adventureType: string
  solo: string
  soloThreeStar: string
  soloFourStar: string
  soloFiveStar: string
  singleSupplementary: string
  singleSupplementaryThreeStar: string
  singleSupplementaryFourStar: string
  singleSupplementaryFiveStar: string
  standardThreeStar: string
  standardFourStar: string
  standardFiveStar: string
}

export interface sessionData {
  expires: string
  user: {
    name: string
    email: string
    id: string
  }
  jwt: string
}
