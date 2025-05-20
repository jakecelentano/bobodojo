# Quick Reference: Using Local Images

## To use your local `sample.png` for a new card:

### Option 1: Click the Helper Button
1. In the "Image URL" field, click **"Use sample.png"**
2. The image path will be automatically filled in

### Option 2: Manual Entry
Enter one of these in the Image URL field:
- `@/assets/sample.png` (recommended)
- `/src/assets/sample.png` (development only)

### Option 3: Import Method (for developers)
```javascript
import sampleImage from '@/assets/sample.png';

// Then use: sampleImage as the URL
```

## Important Notes:
- The sample.png is located in: `src/assets/sample.png`
- For production builds, use the import method or public directory
- The helper button automatically uses the correct path
- Images are optimized for both web display and print

## Example Usage:
1. Open the card creation form
2. Fill in card details
3. In the Image URL field, either:
   - Click "Use sample.png" button, OR
   - Type: `@/assets/sample.png`
4. Submit the form

The card will now display your local image!