# Missing Images

The following images are referenced in the application but are currently missing. You'll need to add these images to run the application without errors.

## Logo Images

**Location:** `/public/static/images/`

- `dark-logo.png` - Logo displayed in dark mode
- `light-logo.png` - Logo displayed in light mode (if different from dark logo)

**Recommended specifications:**
- Format: PNG with transparent background
- Dimensions: 120px width × 45px height (or proportional)
- File size: Keep under 50KB for optimal loading

## Product Category Images

**Location:** `/public/images/`

The landing page displays category images for different jewelry types:

1. `layered-necklace.jpg` - Category image for necklaces
2. `rings-ribbon.jpg` - Category image for rings
3. `diamond-necklace-gold-cloth.jpg` - Category image for luxury necklaces
4. `model-small-earrings.jpg` - Category image for earrings
5. `model-wire-hoop.jpg` - Category image for hoop earrings

**Recommended specifications:**
- Format: JPG or WebP
- Aspect ratio: 3:4 (portrait)
- Dimensions: 600px × 800px (minimum)
- Quality: 80-90% compression
- File size: 100-300KB per image

## Quick Setup

### Option 1: Use Placeholder Images (Temporary)
The application will show broken image placeholders until you add real images.

### Option 2: Add Your Images
1. Create the required directories if they don't exist:
   ```bash
   mkdir -p public/images
   mkdir -p public/static/images
   ```

2. Add your logo files to `public/static/images/`
3. Add your product category images to `public/images/`

### Option 3: Use Stock Images
You can use royalty-free jewelry images from:
- Unsplash (https://unsplash.com/s/photos/jewelry)
- Pexels (https://www.pexels.com/search/jewelry/)
- Pixabay (https://pixabay.com/images/search/jewelry/)

## Current Status

✅ Pattern SVG created (`/public/pattern.svg`)
❌ Logo images missing
❌ Product category images missing

## Notes

- The application will continue to function without these images, but will show 404 errors in the console
- Images are optimized automatically by Next.js Image component
- Consider using WebP format for better compression and quality
