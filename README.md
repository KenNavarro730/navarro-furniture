# Navarro Furniture Website

A modern, mobile-responsive website for your couch reselling business.

## Quick Start

1. Double-click `index.html` to view the website locally
2. Replace placeholder images in the `images/` folder with your real photos
3. Edit `inventory.js` to add/remove couches

---

## 🛋️ How to Add New Couches

### Step 1: Add Your Photo
Drag and drop your couch photo into the `images/` folder. 
Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

### Step 2: Edit inventory.js
Open `inventory.js` and add a new entry to the `COUCHES` array:

```javascript
{
    id: "couch-5",              // Unique ID (any text)
    name: "Your Couch Name",    // Display name
    price: 299,                 // Price in dollars (no $ sign)
    image: "images/my-couch.jpg", // Path to your image
    dimensions: '80" W × 36" D × 32" H',  // Dimensions
    available: true,            // Set to false to hide
    deliveryNote: "Delivery available this week"
}
```

### Step 3: Save and Refresh
Save the file and refresh your browser - that's it!

---

## 📁 File Structure

```
Navarro Furniture/
├── index.html      # Main website (don't edit unless needed)
├── styles.css      # Styling (don't edit unless needed)
├── script.js       # Functionality (don't edit)
├── inventory.js    # ← EDIT THIS to manage your couches
├── README.md       # This file
└── images/         # ← DROP photos here
    ├── hero-couch.jpg
    ├── couch-1.jpg
    ├── couch-2.jpg
    └── ...
```

---

## 📱 Mobile Responsive

The site automatically adapts to all screen sizes:
- Desktop (1024px+)
- Tablet (768px - 1024px)  
- Mobile (< 768px)

---

## 🚀 Deployment

This site is ready for deployment to Vercel, Netlify, or any static hosting.

### Deploy to Vercel:
1. Push to GitHub
2. Connect repo to Vercel
3. Deploy!

---

## 📞 Contact Info

Phone: **267-265-9284**
Delivery: 9 AM - 5 PM, 7 days a week
