# README.md

# 🧄 Drip & Garlic

A modern, animated restaurant landing page built with Next.js 15, GSAP, and Framer Motion. Features a stunning 3D menu book with scroll-triggered animations, floating food cards, and smooth page transitions.

![Drip & Garlic Preview](https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80)

## ✨ Features

- **3D Animated Menu Book** - Scroll-triggered book that opens with page-turning animations
- **Floating Food Cards** - Menu items fly out in 3D space with parallax effects
- **Smooth Loading Animation** - Staggered letter animation with spring physics
- **Interactive Hero Section** - Dynamic dripping sauce animations
- **Location Section** - Embedded map with business hours
- **Fully Responsive** - Optimized for mobile and desktop
- **Dark Theme** - Elegant dark UI with orange accents

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Transitions**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: TypeScript
- **Font**: Geist Sans & Geist Mono

## 📁 Project Structure
drip-and-garlic/
├── app/
│ ├── globals.css # Global styles & Tailwind imports
│ ├── layout.tsx # Root layout with fonts
│ └── page.tsx # Main landing page
├── components/
│ └── ui/
│ ├── drip-hero.tsx # Hero section with drip animations
│ ├── menu-book-3d.tsx # 3D animated menu book
│ ├── item-showcase.tsx # Featured items display
│ ├── drip-location.tsx # Location & hours section
│ ├── drip-landing.tsx # Main landing wrapper
│ ├── location-map.tsx # Map component
│ └── loader.tsx # Loading screen animation
├── lib/
│ └── utils.ts # Utility functions (cn)
├── public/ # Static assets
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json


## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rehan-devs/drip-and-garlic.git
   cd drip-and-garlic
Install dependencies

```bash

npm install
# or
yarn install
# or
pnpm install

Run the development server

npm run dev
# or
yarn dev
# or
pnpm dev
```
---
Open in browser
Navigate to http://localhost:3000
---

### 📦 Dependencies
- JSON
```bash
{
  "dependencies": {
    "next": "15.x",
    "react": "19.x",
    "react-dom": "19.x",
    "gsap": "^3.12.x",
    "motion": "^12.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  }
}
```
---

### 🎨 Customization
- Colors

The theme uses a warm color palette defined throughout the components:
```bash
Primary Orange: #E88D2A
Light Orange: #F5A623
Dark Orange: #C76D1A
Background: #0A0A0A
Text Light: #FFF5E6
Text Muted: #A8A29E
Menu Items
Edit the defaultCategories array in components/ui/menu-book-3d.tsx to customize menu items:
```
---

### TypeScript
---
```bash
const defaultCategories: MenuCategory[] = [
  {
    title: "Your Category",
    emoji: "🍕",
    items: [
      {
        name: "Item Name",
        description: "Item description",
        price: "$10",
        badge: "🔥 POPULAR",
        image: "https://your-image-url.com"
      }
    ]
  }
];
Business Info

Update the DripLocation component props for your business details:
```
### React
```bash
<DripLocation
  heading="Find us"
  address="Your Address Here"
  phone="(555) 123-4567"
  instagram="@yourbusiness"
  hours={[
    { days: "Mon-Fri", time: "9AM - 9PM" },
    { days: "Sat-Sun", time: "10AM - 10PM" }
  ]}
/>

```

### 🔧 Scripts
```bash
Command	Description
npm run dev	Start development server
npm run build	Build for production
npm run start	Start production server
npm run lint	Run ESLint

```

### 📱 Responsive Breakpoints
```bash
Mobile: < 768px (simplified animations)
Desktop: ≥ 768px (full 3D effects)
⚡ Performance
GSAP animations use will-change for GPU acceleration
Images use loading="lazy" for deferred loading
ScrollTrigger is only registered on client-side
Loader component prevents layout shift on initial load

```

### 🌐 Deployment
```bash
Vercel (Recommended)
Deploy with Vercel

Push to GitHub
Import project in Vercel
Deploy automatically
Other Platforms
Bash

npm run build
npm run start

```
---
### 📄 License
MIT License - feel free to use this for your own projects!

---

### 🙏 Credits
Food images from Unsplash
Icons and emojis from native system fonts
Animation inspiration from modern restaurant websites