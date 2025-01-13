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

export interface ItineraryType {
  day: number
  title: string
  details: string
  accommodations: string
  meals: string
  links: Link[]
}

export interface ServicesType {
  inclusives: string[]
  exclusives: string[]
}

export interface FAQType {
  question: string
  answer: string
}
