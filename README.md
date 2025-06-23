# Gaurav Thapa - Personal Website

A modern, creative personal website featuring aura gradients, glassmorphism design, and advanced scroll animations.

## ✨ Features

- **Aura Gradients with Grain Texture**: Dynamic, animated gradient backgrounds with subtle noise overlay
- **Custom Cursor**: Smooth blur cursor that responds to interactive elements
- **Glassmorphism Design**: Beautiful frosted glass effects with backdrop blur
- **Advanced Scroll Animations**: Parallax effects, scroll-triggered animations, and perspective transforms
- **Collapsible Sections**: Cards that stack and transform during scroll interactions
- **Responsive Design**: Optimized for all device sizes
- **High Performance**: Built with Next.js 14 and optimized for speed

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-site
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Deployment Ready**: Optimized for production

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── AuraBackground.tsx     # Animated gradient background
│   │   ├── CustomCursor.tsx       # Blur cursor component
│   │   ├── HeroSection.tsx        # Main hero section
│   │   ├── ScrollSection.tsx      # Reusable scroll section
│   │   ├── AboutSection.tsx       # About me section
│   │   ├── ProjectCard.tsx        # Project showcase cards
│   │   └── WritingCard.tsx        # Blog/writing cards
│   ├── globals.css                # Global styles and animations
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page component
├── tailwind.config.js             # Tailwind configuration
└── package.json                   # Dependencies
```

## 🎨 Design Philosophy

This website combines several modern design trends:

- **Glassmorphism**: Translucent elements with backdrop blur for depth
- **Aura Gradients**: Smooth, animated color gradients that create atmosphere
- **Grainy Texture**: Subtle noise overlay for organic feel
- **High-Tech Animations**: Smooth, purposeful animations that enhance UX
- **Collapsible Scroll**: Advanced scroll interactions where elements stack

## 🔧 Customization

### Colors and Gradients
Modify the gradient colors in `tailwind.config.js`:

```javascript
backgroundImage: {
  'aura-gradient': 'linear-gradient(-45deg, #your-colors)',
}
```

### Content
Update the content in `app/page.tsx`:
- Personal information in the hero section
- Projects array with your work
- Writings array with your blog posts
- Skills in the AboutSection component

### Animations
Customize animations in `app/globals.css` and component files using Framer Motion.

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first design approach
- Adaptive layouts for different screen sizes
- Touch-friendly interactions
- Optimized performance on all devices

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
```bash
npm run build
npm start
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements that could benefit others, pull requests are welcome!

---

Built with ❤️ by Gaurav Thapa 