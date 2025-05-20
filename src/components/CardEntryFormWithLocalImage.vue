<template>
  <div class="local-image-demo">
    <h3>How to Use Local Images in Card Creation</h3>
    
    <div class="demo-section">
      <h4>Option 1: Import and Use Variable</h4>
      <p>Import the image at the top of your script and use it as a variable:</p>
      <pre>
import sampleImage from '@/assets/sample.png';

// Then in your data:
card: {
  image_url: sampleImage
}</pre>
      <p>URL Value: <code>{{ importedImageUrl }}</code></p>
    </div>

    <div class="demo-section">
      <h4>Option 2: Use @ Alias Path</h4>
      <p>Use the @ alias directly in the URL field:</p>
      <pre>card: {
  image_url: '@/assets/sample.png'
}</pre>
      <p>Note: This works during development but may need build configuration for production.</p>
    </div>

    <div class="demo-section">
      <h4>Option 3: Use Public Directory</h4>
      <p>Move your image to the public directory and use absolute path:</p>
      <pre>// Move sample.png to public/images/sample.png
card: {
  image_url: '/images/sample.png'
}</pre>
    </div>

    <div class="demo-section">
      <h4>Option 4: Direct Development Path</h4>
      <p>During development, you can use:</p>
      <pre>card: {
  image_url: '/src/assets/sample.png'
}</pre>
      <p>Note: This only works in development mode, not in production builds.</p>
    </div>

    <div class="preview">
      <h4>Preview with Local Image</h4>
      <CardRenderer 
        :card="demoCard" 
        size="medium" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CardRenderer from './card/CardRenderer.vue';
import sampleImage from '@/assets/sample.png';

// This is the URL that will be stored
const importedImageUrl = ref(sampleImage);

// Demo card using the imported image
const demoCard = ref({
  id: 'demo-1',
  name: 'Sample Dragon',
  card_type: 'Monster',
  attribute: 'LIGHT',
  level: 8,
  monster_type: 'Dragon',
  card_subtype: 'Effect',
  atk: '3000',
  def: '2500',
  description: 'This card uses a local image from src/assets',
  effect_text: 'When this card is summoned, you can see a local image was used.',
  image_url: sampleImage, // Using the imported image
  card_code: 'DEMO-001',
  isLegendary: true
});
</script>

<style scoped>
.local-image-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin: 30px 0;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.demo-section h4 {
  margin-top: 0;
  color: #4a6baf;
}

pre {
  background: #2d2d2d;
  color: #fff;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  background: #e0e0e0;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}

.preview {
  margin-top: 40px;
  padding: 20px;
  background: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>