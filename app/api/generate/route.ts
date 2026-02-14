import { NextResponse } from "next/server"
import type { GenerateRequest, GenerateResponse, GeneratedImage } from "@/lib/types"
import { GALLERY_ITEMS } from "@/lib/mock-data"

// PRODUCTION: Replace with Nano Banana (Google Gemini) API call
// import { GoogleGenAI } from '@google/genai'
// const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY })
// Use model: quality === 'premium' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image'
// Config: { responseModalities: ['image', 'text'], numberOfImages: 4 }

const ASPECT_RATIOS: Record<string, { width: number; height: number }> = {
  "3:4": { width: 768, height: 1024 },
  "1:1": { width: 1024, height: 1024 },
  "4:3": { width: 1024, height: 768 },
  "16:9": { width: 1024, height: 576 },
}

// Generate a shuffled set of images for each request
let callCount = 0

export async function POST(request: Request) {
  const body: GenerateRequest = await request.json()
  const { enhancedPrompt, aspectRatio, count } = body

  // Simulate generation delay (2-3 seconds like real API)
  await new Promise((resolve) => setTimeout(resolve, 2500))

  const dims = ASPECT_RATIOS[aspectRatio] || ASPECT_RATIOS["3:4"]

  // Rotate through gallery items so each generation returns different images
  callCount++
  const offset = (callCount * 3) % GALLERY_ITEMS.length
  const images: GeneratedImage[] = Array.from({ length: count || 4 }, (_, i) => {
    const item = GALLERY_ITEMS[(offset + i) % GALLERY_ITEMS.length]
    return {
      id: `gen-${Date.now()}-${i}`,
      url: item.url,
      prompt: enhancedPrompt,
      width: dims.width,
      height: dims.height,
    }
  })

  const response: GenerateResponse = { images }
  return NextResponse.json(response)
}
