// ── Style Profile ──
export interface StyleProfile {
  palettes: PaletteOption[]
  styles: StyleOption[]
  subjects: SubjectOption[]
  mood: MoodOption | null
  room: RoomOption | null
}

export type PaletteOption = "warm-sunset" | "cool-ocean" | "earth-stone" | "botanical" | "monochrome" | "vibrant-pop"
export type StyleOption = "abstract" | "realistic" | "illustrated" | "surreal" | "minimal" | "retro"
export type SubjectOption = "landscapes" | "florals" | "geometric" | "animals" | "architecture" | "portraits" | "space" | "still-life"
export type MoodOption = "calm" | "bold" | "warm" | "fresh" | "elegant" | "playful"
export type RoomOption = "living-room" | "bedroom" | "office" | "dining" | "nursery" | "hallway"

// ── Generation ──
export interface GeneratedImage {
  id: string
  url: string
  prompt: string
  width: number
  height: number
}

export interface RefinementState {
  basePrompt: string
  activeModifiers: string[]
  selectedVariantId: string | null
  generationHistory: GeneratedImage[][]
}

export interface EnhancePromptRequest {
  userInput: string
  styleProfile: StyleProfile
  aspectRatio: string
}

export interface EnhancePromptResponse {
  enhancedPrompt: string
  conceptSummary: string
}

export interface GenerateRequest {
  enhancedPrompt: string
  aspectRatio: string
  count: number
  quality: "standard" | "premium"
}

export interface GenerateResponse {
  images: GeneratedImage[]
}

// ── Product Configurator ──
export interface SizeOption {
  id: string
  label: string
  basePrice: number
}

export interface MediumOption {
  id: string
  label: string
  description: string
  upcharge: number
}

export interface FrameOption {
  id: string
  label: string
  upcharge: number
  color: string
}

export interface MatOption {
  id: string
  label: string
  upcharge: number
}

export interface ProductVariantMapping {
  size: string
  medium: string
  frame: string
  shopifyVariantId: string
  printfulVariantId: number
  price: number
}

// ── Cart ──
export interface CartItem {
  id: string
  variantId: string
  imageId: string
  imageUrl: string
  title: string
  size: string
  medium: string
  frame: string
  mat: string
  price: number
  quantity: number
  type?: "ai-art" | "quote-art"
  inspireDesign?: InspireDesign
}

export interface Cart {
  id: string
  items: CartItem[]
  totalPrice: number
  checkoutUrl: string
}

// ── Gallery ──
export interface GalleryItem {
  id: string
  url: string
  title: string
  style: StyleOption
  subject: SubjectOption
  palette: PaletteOption
  prompt: string
}

// ── Inspire / Motivational Quote Art ──
export type InspireCategory =
  | "stoic"
  | "poetry"
  | "entrepreneurship"
  | "mindfulness"
  | "leadership"
  | "love"

export interface InspireQuote {
  id: string
  text: string
  author: string
  authorTitle?: string
  category: InspireCategory
  tags: string[]
}

export type InspireTypography =
  | "classic-serif"
  | "bold-statement"
  | "minimal-modern"
  | "handwritten"
  | "editorial"
  | "poetic"

export type InspireBackground =
  | "solid"
  | "gradient"
  | "textured"
  | "photographic"
  | "dark"

export type InspirePalette =
  | "warm-neutrals"
  | "midnight"
  | "ocean"
  | "earth"
  | "blush"
  | "monochrome"

export interface InspireDesign {
  id: string
  quote: InspireQuote
  typography: InspireTypography
  background: InspireBackground
  palette: InspirePalette
  showAuthor: boolean
  alignment: "left" | "center" | "right"
  quoteSize: "compact" | "standard" | "oversized"
}

// ── Starting Concepts ──
export interface StartingConcept {
  id: string
  title: string
  prompt: string
  styles: StyleOption[]
  subjects: SubjectOption[]
  moods: MoodOption[]
}
