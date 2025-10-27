# Momin Ads - Professional Website

A fully responsive, dynamic, and animated website for Momin Ads - a creative printing and branding agency.

## 🌟 Features

### Design & UI/UX
- **Light & Dark Mode Toggle** - Smooth theme switching with localStorage persistence
- **Fully Responsive Design** - Mobile-first approach, works perfectly on all devices
- **Modern Animations** - Scroll-triggered animations, hover effects, and smooth transitions
- **Professional Color Scheme** - Yellow (#FFD700), Black (#000000), White (#FFFFFF)

### Sections
- **Hero Section** - Animated tagline "Your Vision, Our Creation" with CTA button
- **About Us** - Mission, experience, and quality information
- **Services** - Comprehensive grid of all services with hover animations
- **Gallery/Portfolio** - Image gallery with lightbox functionality
- **Contact** - Web3Forms integrated contact form with service dropdown

### Interactive Features
- **Smooth Scrolling Navigation** - Active link highlighting based on scroll position
- **Gallery Lightbox** - Full-screen image viewing with keyboard navigation
- **Contact Form** - Web3Forms integration with success/error notifications
- **Mobile Menu** - Responsive hamburger menu for mobile devices

### Bonus Features
- **Preloader Animation** - Logo animation with loading bar
- **Floating WhatsApp Button** - Direct WhatsApp contact
- **Back to Top Button** - Smooth scroll to top functionality
- **Scroll Animations** - Intersection Observer for fade-in effects

## 🚀 Services Covered

- LED Boards, 3D & Acrylic Signs
- Flex & Backlit Boards
- Vinyl, Wall & Car Stickers
- Banners, Flags & Standees
- Visiting & Premium Business Cards
- Printed T-Shirts, Keychains, Cups, Frames
- Bill Books, Letterheads, Office Stationery
- Event Branding, Corporate Gifting
- Digital Banners, Logos, Posters, and more

## 📁 File Structure

```
MOMIN-ADS/
├── index.html          # Main HTML file
├── style.css           # CSS with light/dark themes
├── script.js           # JavaScript functionality
├── images/             # Image directory
│   └── placeholder-generator.html  # Image generator tool
├── create-images.html # Placeholder image creator
└── README.md          # This file
```

## 🛠️ Setup Instructions

### 1. Web3Forms Integration
To enable the contact form, you need to:

1. Visit [Web3Forms](https://web3forms.com/)
2. Create a free account
3. Get your access key
4. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `index.html` with your actual access key

```html
<input type="hidden" name="access_key" value="YOUR_ACTUAL_ACCESS_KEY">
```

### 2. Customize Content
- Update contact information in the HTML
- Replace placeholder images with actual portfolio images
- Modify service descriptions as needed
- Update social media links

### 3. Deploy
The website is ready to deploy to any web hosting service:
- **GitHub Pages** - Free hosting for static sites
- **Netlify** - Easy deployment with form handling
- **Vercel** - Fast deployment with global CDN
- **Traditional Web Hosting** - Upload files via FTP

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization:

```css
:root {
    --primary-yellow: #FFD700;
    --primary-black: #000000;
    --primary-white: #FFFFFF;
}
```

### Fonts
Currently uses Poppins font from Google Fonts. To change:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Images
Replace the Unsplash image URLs in the gallery section with your actual portfolio images.

## 📱 Mobile Responsiveness

The website is fully responsive with:
- Mobile-first CSS approach
- Hamburger menu for mobile navigation
- Optimized touch interactions
- Responsive images and layouts
- Touch-friendly button sizes

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📞 Contact Information

Update the contact information in the HTML file:

```html
<!-- Update these sections -->
<div class="contact-item">
    <div class="contact-icon">
        <i class="fas fa-phone"></i>
    </div>
    <div class="contact-details">
        <h4>Phone</h4>
        <p>+92 300 1234567</p>  <!-- Update phone number -->
    </div>
</div>
```

## 🚀 Performance Features

- **Lazy Loading** - Images load only when needed
- **Optimized Animations** - Hardware-accelerated CSS transitions
- **Minimal JavaScript** - Lightweight and fast
- **SEO Optimized** - Proper meta tags and semantic HTML

## 📈 Analytics Integration

To add Google Analytics, insert the tracking code before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🎯 SEO Features

- Semantic HTML structure
- Meta descriptions and titles
- Alt text for all images
- Proper heading hierarchy
- Fast loading times

## 📄 License

This website template is created for Momin Ads. Feel free to customize and use for your business.

---

**Created with ❤️ for Momin Ads - Your Vision, Our Creation**
