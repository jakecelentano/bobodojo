<template>
  <div class="local-image-example">
    <h3>Local Image Usage Examples</h3>
    
    <!-- Method 1: Import the image -->
    <div class="example">
      <h4>Method 1: Import</h4>
      <img :src="sampleImage" alt="Sample from import" />
      <code>{{ sampleImage }}</code>
    </div>
    
    <!-- Method 2: Direct URL path -->
    <div class="example">
      <h4>Method 2: Direct Path</h4>
      <img src="/src/assets/sample.png" alt="Sample from direct path" />
      <code>/src/assets/sample.png</code>
    </div>
    
    <!-- Method 3: Using @ alias -->
    <div class="example">
      <h4>Method 3: @ Alias</h4>
      <img src="@/assets/sample.png" alt="Sample from @ alias" />
      <code>@/assets/sample.png</code>
    </div>
  </div>
</template>

<script setup>
// Method 1: Import the image
import sampleImage from '@/assets/sample.png';
</script>

<style scoped>
.local-image-example {
  padding: 20px;
}

.example {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

img {
  max-width: 200px;
  height: auto;
  display: block;
  margin: 10px 0;
}

code {
  background: #f5f5f5;
  padding: 2px 8px;
  border-radius: 3px;
  font-family: monospace;
}
</style>