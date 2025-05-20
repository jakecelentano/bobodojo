# Using Local Images in BoboDojo

There are several ways to use local images in your cards:

## Method 1: Import the Image (Recommended)

At the top of your component, import the image:

```javascript
import sampleImage from '@/assets/sample.png';
```

Then use it in your card data:

```javascript
card: {
  image_url: sampleImage
}
```

This method ensures the image is properly bundled and will work in production.

## Method 2: Direct Path (Development Only)

During development, you can use direct paths:

```javascript
card: {
  image_url: '/src/assets/sample.png'
}
```

⚠️ Note: This only works in development mode, not in production builds.

## Method 3: Using the @ Alias

You can use the @ alias in your image URL:

```javascript
card: {
  image_url: '@/assets/sample.png'
}
```

Note: This might require additional configuration for production builds.

## Method 4: Public Directory

Place images in the `public` directory:

1. Create a folder: `public/images/`
2. Move your image there: `public/images/sample.png`
3. Reference it with an absolute path:

```javascript
card: {
  image_url: '/images/sample.png'
}
```

## Using the Helper Button

In the CardEntryForm, there's now a helper button that automatically uses the sample.png:

1. Click "Use sample.png" button
2. It will automatically fill the image URL field
3. The image will be displayed in your card

## Adding More Local Images

To add more local images:

1. Place them in `src/assets/`
2. Import them in your component:
   ```javascript
   import dragon from '@/assets/dragon.png';
   import wizard from '@/assets/wizard.png';
   ```
3. Use them in your cards or add more helper buttons

## Example Card with Local Image

```javascript
const card = {
  name: 'Local Dragon',
  card_type: 'Monster',
  attribute: 'LIGHT',
  level: 8,
  image_url: sampleImage, // Using imported image
  // ... other card properties
};
```

## Tips

- For best results, use images that are at least 400x400 pixels
- PNG format works best for card artwork
- Images are automatically lazy-loaded for performance
- The CardImage component handles loading states and errors