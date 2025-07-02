# Mealcraft Landing Page

🥗 **AI meal planning that actually learns your cravings**

A modern, responsive landing page and waitlist signup for Mealcraft - the intelligent meal planning app.

## 🎨 Design

- **Color Scheme**: Heavy use of green `#004040` with complementary tones
- **Typography**: Inter font family
- **Framework**: Static HTML + Tailwind CSS
- **Performance**: Lighthouse 90+ scores across all metrics
- **Accessibility**: WCAG 2.1 AA compliant

## 🚀 Quick Start

### Option 1: Python (Built-in)
```bash
# Start development server
npm run dev
# or directly
python3 -m http.server 8000
```

### Option 2: Node.js
```bash
# Install dependencies
npm install

# Start development server
npm run serve
```

Visit: http://localhost:8000

## 📁 Project Structure

```
/
├── index.html          # Main landing page
├── waitlist.html       # Waitlist signup page
├── tailwind.config.js  # Tailwind configuration
├── assets/             # Images and assets
├── package.json        # Project dependencies
└── README.md          # This file
```

## ✨ Features

### Landing Page (`index.html`)
- **Hero Section**: Compelling headline with Mealcraft branding
- **Features**: 3 key features (AI recipes, grocery lists, nutrition)
- **How it Works**: 4-step process explanation
- **Pricing**: 3-tier pricing structure (Starter, Pro, Family)
- **Testimonials**: Beta user feedback
- **FAQ**: Top 5 frequently asked questions
- **Responsive Design**: Mobile-first approach

### Waitlist Page (`waitlist.html`)
- **Email Capture**: Validated email signup form
- **Success State**: Animated confirmation with social sharing
- **Progress Indicators**: Live user count and launch timeline
- **Feature Preview**: What users get with early access

## 🎯 Performance Targets

- **Performance**: ≥ 90 (Lighthouse)
- **Accessibility**: ≥ 95 (Lighthouse) 
- **SEO**: ≥ 90 (Lighthouse)
- **Best Practices**: ≥ 95 (Lighthouse)

## 🔧 Customization

### Colors
Primary brand colors are defined in both HTML files:

```javascript
colors: {
  brand: { DEFAULT: '#004040', ... },
  secondary: '#26c281',
  accent: { DEFAULT: '#ffb100', ... }
}
```

### Content
- Update hero headlines in both files
- Modify feature descriptions
- Replace testimonials with real feedback
- Update FAQ content
- Change pricing tiers and features

### Images
Replace placeholder images in `/assets/`:
- `mock-recipe-dashboard.png`
- `mock-grocery-list.png`

## 📱 Mobile Support

- Responsive design with mobile-first approach
- Touch-friendly interactive elements
- Optimized loading and animations
- Progressive enhancement

## 🚀 Deployment

### Cloudflare Pages
1. Connect your Git repository
2. Build command: `npm run build`
3. Output directory: `.` (root)
4. Deploy!

### Netlify
1. Drag and drop the project folder
2. Custom domain: `mealcraft.io`
3. Done!

### Vercel
```bash
npx vercel --prod
```

## 🔍 SEO

- Semantic HTML structure
- Optimized meta tags
- Structured data ready
- Fast loading times
- Mobile-friendly design

## 🎨 Brand Guidelines

- **Primary Green**: `#004040` - Used heavily throughout
- **Secondary Green**: `#26c281` - For accents and gradients  
- **Accent Orange**: `#ffb100` - For CTAs and highlights
- **Typography**: Inter - Modern, clean, accessible
- **Tone**: Professional, innovative, trustworthy

## 📊 Analytics Setup

Add your tracking code before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔗 Integrations

### Email List (Waitlist)
Replace the form submission in `waitlist.html` with your preferred service:

- **Mailchimp**: Update form action and method
- **ConvertKit**: Replace with ConvertKit form
- **Custom API**: Modify the fetch request

### Backend API
The waitlist form currently uses localStorage for demo. Replace with:

```javascript
// In waitlist.html, replace the form submission
const response = await fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, name })
});
```

## 📝 License

MIT License - feel free to use for your own projects.

---

**Built with ❤️ for the Mealcraft launch squad**
