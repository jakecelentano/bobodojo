<template>
  <div 
    class="card-image-container thin-bezel aspect-ratio-maintained" 
    :class="{ 'legendary-image': isLegendary }"
  >
    <picture v-if="imageUrl && !hasError" class="image-wrapper">
      <!-- WebP format for modern browsers -->
      <source 
        :srcset="getWebPUrl(imageUrl)"
        type="image/webp"
        media="(max-width: 768px)"
      />
      <!-- High resolution for print -->
      <source 
        :srcset="getHighResUrl(imageUrl)"
        media="print"
      />
      <!-- Default image -->
      <img 
        :src="imageUrl" 
        :alt="altText"
        class="card-image"
        loading="lazy"
        @error="handleImageError"
        @load="handleImageLoad"
      />
    </picture>
    
    <div v-else-if="hasError" class="card-image-placeholder error">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <span>Image Unavailable</span>
    </div>
    
    <div v-else class="card-image-placeholder">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
      </svg>
      <span>No Image</span>
    </div>
    
    <!-- Loading overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import '../../styles/variables.css';

const props = defineProps({
  imageUrl: {
    type: String,
    default: ''
  },
  altText: {
    type: String,
    default: 'Card artwork'
  },
  isLegendary: {
    type: Boolean,
    default: false
  }
});

const isLoading = ref(false);
const hasError = ref(false);

// Generate WebP URL for better compression
const getWebPUrl = (url) => {
  if (!url) return '';
  // In a real app, this would point to a CDN that converts images
  // For now, just return the original URL
  return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
};

// Generate high-resolution URL for print
const getHighResUrl = (url) => {
  if (!url) return '';
  // In a real app, this would point to a high-res version
  // For now, just return the original URL
  return url.replace(/\.(jpg|jpeg|png)$/i, '@2x.$1');
};

const handleImageError = () => {
  hasError.value = true;
  isLoading.value = false;
};

const handleImageLoad = () => {
  isLoading.value = false;
};
</script>

<style scoped>
.card-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: calc(var(--card-border-radius) * 0.5);
  box-sizing: border-box;
  z-index: 3;
}

/* Thin bezel design */
.thin-bezel {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Aspect ratio maintenance */
.aspect-ratio-maintained {
  aspect-ratio: 1 / 1;
}

/* Legendary styling */
.legendary-image {
  border-color: #FFD700;
  box-shadow: 
    inset 0 1px 2px rgba(0, 0, 0, 0.1),
    0 0 10px rgba(255, 215, 0, 0.3);
}

.image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Placeholder styling */
.card-image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(var(--internal-margin) * 2);
  width: 100%;
  height: 100%;
  color: #999;
  font-size: calc(var(--card-description-size) * 1);
  text-align: center;
  padding: var(--card-padding);
}

.card-image-placeholder.error {
  background-color: #FFF5F5;
  color: #E53E3E;
}

/* SVG icon sizing */
.card-image-placeholder svg {
  width: calc(var(--card-width) * 0.15);
  height: calc(var(--card-width) * 0.15);
  min-width: 24px;
  min-height: 24px;
}

/* Loading overlay */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.spinner {
  width: calc(var(--card-width) * 0.1);
  height: calc(var(--card-width) * 0.1);
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4A6BAF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  min-width: 20px;
  min-height: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Print-specific styles */
@media print {
  .card-image-container {
    /* Ensure high quality for print */
    background-color: white;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .card-image {
    /* Use higher resolution for print */
    image-resolution: 300dpi;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>