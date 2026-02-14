# Muse -- AI-Powered Wall Art

Muse is a premium AI-powered wall art store built with Next.js. Users discover their aesthetic through an interactive style quiz, generate custom artwork with AI, configure museum-quality print products, and check out through a Shopify-powered storefront with Printful print-on-demand fulfillment.

## Architecture

```
+---------------------------------------------------+
|                 Next.js Frontend                   |
|  (Style Quiz, Generation Studio, Configurator)    |
+----------------+----------------+-----------------+
                 |                |
       +---------v--------+  +---v--------------------+
       |  Next.js API     |  |  Shopify Storefront    |
       |  Routes (/api/*) |  |  GraphQL API           |
       |                  |  |  (Cart + Checkout)      |
       +--+----------+----+  +------------------------+
          |          |
    +-----v----+ +---v-----------+
    | Nano     | | Printful      |
    | Banana   | | API v2        |
    | API      | | (Orders +     |
    | (image   | |  Files +      |
    |  gen)    | |  Products)    |
    +----------+ +---------------+
```

**Data flow:** Style quiz -> style profile in context -> user prompt -> API enhances prompt via LLM + style profile -> image generation API returns 4 variants -> user selects and configures product -> Shopify cart -> Shopify checkout/payment -> Printful fulfillment webhook -> print, ship, track.

> **MVP Note:** All external API integrations (image generation, Shopify Storefront, Printful) are currently implemented as mock service modules with realistic data shapes and simulated latency. Each mock module documents where the real API call goes, what credentials are needed, and the expected request/response format so a developer can swap in live APIs without restructuring.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Fonts | Playfair Display (headings), DM Sans (body) |
| State | React Context (StyleProfile, Generation, Cart) |
| Notifications | Sonner |
| Package Manager | pnpm |

## Pages and Routes

| Route | Description |
|-------|------------|
| `/` | Landing page -- hero, how-it-works flow, sample gallery, footer |
| `/discover` | 5-step style discovery quiz (palette, style, subject, mood, room) |
| `/create` | Generation studio -- prompt input, AI image generation, refinement |
| `/configure/[imageId]` | Product configurator -- size, medium, frame, mat selection with live preview |
| `/gallery` | Curated gallery with style/subject/palette filters |
| `/cart` | Shopping cart with order summary |
| `/checkout-placeholder` | Placeholder checkout page (Shopify checkout integration point) |

### API Routes

| Endpoint | Purpose |
|----------|---------|
| `POST /api/enhance-prompt` | Enhances user prompt with style profile context (mock LLM) |
| `POST /api/generate` | Generates image variants from enhanced prompt (mock image gen) |
| `POST /api/upload-image` | Uploads selected image for print production (mock) |
| `POST /api/fulfill-order` | Creates Printful fulfillment order (mock) |

## Project Structure

```
app/
  api/                      # API route handlers
    enhance-prompt/
    fulfill-order/
    generate/
    upload-image/
  cart/                     # Cart page
  checkout-placeholder/     # Checkout placeholder
  configure/[imageId]/      # Product configurator (dynamic)
  create/                   # Generation studio
  discover/                 # Style discovery quiz
  gallery/                  # Curated gallery
  page.tsx                  # Landing page
  layout.tsx                # Root layout (fonts, providers, header)
  globals.css               # Design tokens (warm neutral palette)

components/
  cart/
    cart-view.tsx            # Cart items list, summary, checkout CTA
  configure/
    art-preview.tsx          # Art-only / room mockup / detail zoom views
    product-configurator.tsx # Size, medium, frame, mat selectors + pricing
  create/
    generation-studio.tsx    # Two-panel studio layout
    prompt-panel.tsx         # Prompt input, starting concepts, aspect/quality
    results-panel.tsx        # Image grid, selection, refinement, history
  discover/
    style-quiz.tsx           # Quiz orchestrator with step navigation
    quiz-results.tsx         # Results display + CTA to generation studio
    steps/
      palette-step.tsx       # Color palette selection (multi-select)
      style-step.tsx         # Art style selection (multi-select)
      subject-step.tsx       # Subject matter selection (multi-select)
      mood-step.tsx          # Mood/atmosphere selection (single)
      room-step.tsx          # Room type selection (single)
  gallery/
    gallery-grid.tsx         # Filterable masonry-style gallery
  landing/
    hero-section.tsx         # Animated hero with CTA
    how-it-works.tsx         # 3-step process explanation
    sample-gallery.tsx       # Filterable gallery preview
    footer-section.tsx       # Site footer
  providers.tsx              # Context providers wrapper
  site-header.tsx            # Navigation header with cart badge

lib/
  types.ts                   # All TypeScript interfaces and type definitions
  contexts.tsx               # StyleProfile, Generation, and Cart contexts
  mock-data/
    index.ts                 # Sizes, mediums, frames, mats, gallery items,
                             # starting concepts, quiz options, pricing helpers
  shopify-mock.ts            # Mock Shopify Storefront API client
  printful-mock.ts           # Mock Printful API client
```

## Design System

The visual design follows a premium art gallery aesthetic:

- **Palette:** Warm neutrals -- cream backgrounds (`hsl(40, 30%, 97%)`), charcoal text (`hsl(30, 10%, 12%)`), warm copper accent (`hsl(25, 60%, 52%)`)
- **Typography:** Playfair Display serif for headings, DM Sans for body text
- **Spacing:** Generous whitespace, clean minimal chrome
- **Motion:** Subtle Framer Motion transitions on page changes, hover states, and quiz steps

## Product Configuration Options

| Category | Options |
|----------|---------|
| **Sizes** | 8x10, 12x16, 16x20, 18x24, 24x36, 30x40 |
| **Mediums** | Fine Art Paper, Canvas, Acrylic, Metal |
| **Frames** | None, Black, White, Natural Wood, Walnut, Gallery Float |
| **Mats** | None, White, Off-White |
| **Aspect Ratios** | Portrait (3:4), Square (1:1), Landscape (4:3), Wide (16:9) |

Pricing is calculated dynamically from base size price + medium upcharge + frame upcharge + mat upcharge. All prices are stored in cents.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000) with Turbopack for fast refresh.

### Build

```bash
pnpm build
pnpm start
```

## Environment Variables

For the MVP, no environment variables are required -- all integrations use mock modules. When swapping in live APIs, you will need:

```env
# Shopify Storefront API
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxx
SHOPIFY_API_VERSION=2026-01

# Image Generation (Nano Banana)
NANO_BANANA_API_KEY=xxxxx

# Printful
PRINTFUL_API_KEY=xxxxx

# LLM for prompt enhancement
LLM_API_KEY=xxxxx
```

## Swapping Mock Services for Live APIs

Each mock module (`lib/shopify-mock.ts`, `lib/printful-mock.ts`, and the `/api/*` route handlers) includes inline documentation describing:

1. The real API endpoint and method
2. Required credentials/headers
3. Expected request body shape
4. Expected response body shape

To go live, replace the mock function bodies with real `fetch` calls while keeping the same TypeScript interfaces. No component or page restructuring is needed.

## License

Private -- all rights reserved.
