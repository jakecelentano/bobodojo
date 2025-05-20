<template>
  <div 
    class="monster-card-layout" 
    :class="layoutClasses"
  >
    <!-- Card Header with Name and Attribute -->
    <div class="card-header">
      <h2 class="card-name">{{ card.name }}</h2>
      <div class="attribute-emblem" :class="`emblem-${attributeClass}`">
        <!-- SVG icons for each attribute -->
        <svg v-if="attributeClass === 'light'" class="attribute-icon" viewBox="0 0 24 24">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
        </svg>
        <svg v-else-if="attributeClass === 'dark'" class="attribute-icon" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
        <svg v-else-if="attributeClass === 'water'" class="attribute-icon" viewBox="0 0 24 24">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z"/>
        </svg>
        <svg v-else-if="attributeClass === 'fire'" class="attribute-icon" viewBox="0 0 24 24">
          <path d="M13.5 0.67s0.74 2.65 0.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l0.03-0.36c-2.02 2.4-3.23 5.53-3.23 8.89 0 4.42 3.58 8 8 8s8-3.58 8-8C20 7.57 17.5 3.03 13.5 0.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-0.36 3.6-1.21 4.62-2.58 0.39 1.29 0.59 2.65 0.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
        </svg>
        <svg v-else-if="attributeClass === 'earth'" class="attribute-icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 3h6.93c-.04.34-.11.67-.19 1H13v-1zm0 3h5.92c-.2.35-.43.69-.68 1H13v-1zm0 3h2.87c-.87.48-1.84.8-2.87.93v-.93z"/>
        </svg>
        <svg v-else-if="attributeClass === 'wind'" class="attribute-icon" viewBox="0 0 24 24">
          <path d="M14 9h6c.55 0 1 .45 1 1s-.45 1-1 1h-6c-1.1 0-2 .9-2 2 0 .55-.45 1-1 1s-1-.45-1-1c0-2.21 1.79-4 4-4zm-2.45 5.5c-.55 0-1 .45-1 1s.45 1 1 1h2c1.1 0 2 .9 2 2 0 .55.45 1 1 1s1-.45 1-1c0-2.21-1.79-4-4-4h-2zm-3.1-3c-.55 0-1 .45-1 1s.45 1 1 1h.1c.55 0 1-.45 1-1s-.45-1-1-1h-.1z"/>
        </svg>
        <svg v-else-if="attributeClass === 'divine'" class="attribute-icon" viewBox="0 0 24 24">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/>
        </svg>
      </div>
    </div>

    <!-- Card Image Area -->
    <div class="image-area">
      <CardImage 
        :imageUrl="card.image_url" 
        :altText="`${card.name} artwork`" 
        :isLegendary="isLegendary"
      />
    </div>

    <!-- Type Header with SVG Icon -->
    <div class="type-header">
      <span class="monster-type">{{ card.monster_type || 'DRAGON' }}</span>
      <span class="type-separator">/</span>
      <span class="card-subtype">{{ card.card_subtype || 'Normal' }}</span>
    </div>

    <!-- Stats Display with Level -->
    <div class="stats-section">
      <!-- Level moved to left of stats -->
      <div class="level-display">
        <div class="star-shape"></div>
        <span class="level-number">{{ card.level || 8 }}</span>
      </div>
      
      <div class="stat-box stat-atk">
        <span class="stat-label">ATK</span>
        <span class="stat-value">{{ card.atk || '3000' }}</span>
      </div>
      
      <div class="stat-box stat-def">
        <span class="stat-label">DEF</span>
        <span class="stat-value">{{ card.def || '2500' }}</span>
      </div>
      
      <div v-if="isLegendary" class="legend-tag">
        LEGEND
      </div>
    </div>

    <!-- Card Text Area -->
    <div class="text-area">
      <p class="description-text">{{ card.description }}</p>
      <p v-if="card.effect_text" class="effect-text">
        {{ card.effect_text }}
      </p>
    </div>

    <!-- Card Footer -->
    <div class="card-footer">
      <span v-if="card.card_code" class="card-code">{{ card.card_code }}</span>
      <span class="mojo-dojo-logo">Mojo Dojo</span>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import CardImage from '../CardImage.vue';

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  },
  isLegendary: {
    type: Boolean,
    default: false
  }
});

// Get card size information from parent
const cardSize = inject('cardSize', 'medium');

const layoutClasses = computed(() => {
  const classes = [];
  if (props.compact) classes.push('compact-layout');
  if (props.isLegendary) classes.push('legendary-layout');
  // Add size-based class
  classes.push(`size-${cardSize}`);
  return classes;
});

const attributeClass = computed(() => {
  return (props.card.attribute || 'LIGHT').toLowerCase();
});

// Text scale factor based on card size
const textScaleFactor = computed(() => {
  switch(cardSize) {
    case 'small': return 0.75;
    case 'medium': return 1;
    case 'large': return 1.25;
    default: return 1;
  }
});
</script>

<style scoped>
.monster-card-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  background: transparent; /* Make transparent to show gradient from frame-border */
  z-index: 2;
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--card-header-height);
  margin-bottom: var(--internal-margin);
  z-index: 3;
  padding: 0 calc(var(--internal-margin) * 0.5);
  position: relative; /* For absolute positioning of emblem */
}

.card-name {
  font-family: var(--card-title-font, 'Arial Black', sans-serif);
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  color: #000;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  line-height: 1.2;
  min-height: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 100%;
  white-space: nowrap;
  text-align: left; /* Left justify */
  letter-spacing: -0.02em; /* Tighten letter spacing slightly */
  width: 100%; /* Fill the width of the container */
}

/* Size-specific text scaling for card name - based on 25 chars filling 80% width */
.size-small .card-name {
  font-size: calc(var(--card-width) * 0.4); /* 6.4% of card width */
  max-width: 80%; /* Limit to 80% of container width */
  padding-right: calc(var(--attribute-emblem-size) + var(--internal-margin));
}

.size-medium .card-name {
  font-size: calc(var(--card-width) * 0.84); /* 6.4% of card width */
  max-width: 80%; /* Limit to 80% of container width */
  padding-right: calc(var(--attribute-emblem-size) + var(--internal-margin));
}

.size-large .card-name {
  font-size: calc(var(--card-width) * 0.84); /* 6.4% of card width */
  max-width: 80%; /* Limit to 80% of container width */
  padding-right: calc(var(--attribute-emblem-size) + var(--internal-margin));
}

.attribute-emblem {
  width: var(--attribute-emblem-size);
  height: var(--attribute-emblem-size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
  padding: 4px;
  min-width: 32px;
  min-height: 32px;
  position: absolute;
  right: calc(var(--internal-margin) * 0.5);
  top: 50%;
  transform: translateY(-50%);
}

.attribute-icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.emblem-light { 
  background: radial-gradient(circle, #FFF8DC, #FFD700); 
  color: #D4A017;
}

.emblem-dark { 
  background: radial-gradient(circle, #DDA0DD, #8B4B8B); 
  color: #4B0082;
}

.emblem-fire { 
  background: radial-gradient(circle, #FFB6C1, #DC143C); 
  color: #B22222;
}

.emblem-water { 
  background: radial-gradient(circle, #87CEEB, #4169E1); 
  color: #0000CD;
}

.emblem-earth { 
  background: radial-gradient(circle, #DEB887, #8B4513); 
  color: #8B4513;
}

.emblem-wind { 
  background: radial-gradient(circle, #98FB98, #3CB371); 
  color: #006400;
}

.emblem-divine { 
  background: radial-gradient(circle, #FFFACD, #FFD700); 
  color: #B8860B;
}

/* Image Area */
.image-area {
  height: var(--card-image-height);
  margin: var(--internal-margin) 0;
  overflow: hidden;
  border-radius: calc(var(--card-border-radius) * 0.5);
  position: relative;
  z-index: 3;
}

/* Type Header */
.type-header {
  background: linear-gradient(to right, #333, #000);
  color: #FFF;
  padding: calc(var(--internal-margin) * 0.5) var(--internal-margin);
  font-weight: bold;
  text-align: center;
  margin: var(--internal-margin) 0;
  border-radius: calc(var(--card-border-radius) * 0.3);
  text-transform: uppercase;
  height: var(--card-type-height);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

/* Size-specific text scaling for type header */
.size-small .type-header {
  font-size: calc(var(--card-width) * 0.07); /* 7% of card width */
}

.size-medium .type-header {
  font-size: calc(var(--card-width) * 0.055); /* 5.5% of card width */
}

.size-large .type-header {
  font-size: calc(var(--card-width) * 0.045); /* 4.5% of card width */
}

.type-separator {
  margin: 0 calc(var(--internal-margin) * 0.5);
}

/* Stats Section */
.stats-section {
  display: flex;
  gap: var(--internal-margin);
  margin: var(--internal-margin) 0;
  height: var(--card-stats-height);
  z-index: 3;
  align-items: center;
}

.level-display {
  position: relative;
  width: var(--level-icon-size);
  height: var(--level-icon-size);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--internal-margin);
  min-width: 24px;
  min-height: 24px;
  flex-shrink: 0;
}

.star-shape {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #FFD700;
  clip-path: polygon(
    50% 0%, 
    61% 35%, 
    98% 35%, 
    68% 57%, 
    79% 91%, 
    50% 70%, 
    21% 91%, 
    32% 57%, 
    2% 35%, 
    39% 35%
  );
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.level-number {
  position: relative;
  z-index: 4;
  font-weight: bold;
  color: #000;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
  user-select: none; /* Prevent text selection */
}

/* Size-specific text scaling for level number */
.size-small .level-number {
  font-size: calc(var(--card-width) * 0.08); /* 8% of card width */
}

.size-medium .level-number {
  font-size: calc(var(--card-width) * 0.065); /* 6.5% of card width */
}

.size-large .level-number {
  font-size: calc(var(--card-width) * 0.055); /* 5.5% of card width */
}

.stat-box {
  flex: 1;
  padding: var(--internal-margin);
  border-radius: calc(var(--card-border-radius) * 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.stat-atk {
  background: linear-gradient(135deg, #FF4444, #CC0000);
  color: #FFF;
}

.stat-def {
  background: linear-gradient(135deg, #4444FF, #0000CC);
  color: #FFF;
}

.stat-label {
  font-family: 'Arial', sans-serif;
}

.stat-value {
  font-family: 'Arial Black', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* Size-specific text scaling for stats */
.size-small .stat-label {
  font-size: calc(var(--card-width) * 0.06); /* 6% of card width */
}

.size-medium .stat-label {
  font-size: calc(var(--card-width) * 0.05); /* 5% of card width */
}

.size-large .stat-label {
  font-size: calc(var(--card-width) * 0.04); /* 4% of card width */
}

.size-small .stat-value {
  font-size: calc(var(--card-width) * 0.08); /* 8% of card width */
}

.size-medium .stat-value {
  font-size: calc(var(--card-width) * 0.07); /* 7% of card width */
}

.size-large .stat-value {
  font-size: calc(var(--card-width) * 0.06); /* 6% of card width */
}

.legend-tag {
  background: linear-gradient(45deg, #FFD700, #FFF8DC);
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: bold;
  color: #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  white-space: nowrap;
  margin-left: auto;
  flex-shrink: 0;
}

/* Size-specific text scaling for legend tag */
.size-small .legend-tag {
  font-size: calc(var(--card-width) * 0.05); /* 5% of card width */
}

.size-medium .legend-tag {
  font-size: calc(var(--card-width) * 0.04); /* 4% of card width */
}

.size-large .legend-tag {
  font-size: calc(var(--card-width) * 0.035); /* 3.5% of card width */
}

/* Text Area */
.text-area {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: calc(var(--card-border-radius) * 0.3);
  padding: var(--internal-margin);
  margin: var(--internal-margin) 0;
  flex: 0 0 auto;
  height: var(--card-text-height);
  overflow-y: auto;
  z-index: 3;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.description-text {
  line-height: 1.3;
  margin: 0;
  font-style: italic;
}

.effect-text {
  line-height: 1.3;
  margin: var(--internal-margin) 0 0 0;
  padding-top: var(--internal-margin);
  border-top: 1px solid #DDD;
}

/* Size-specific text scaling for card text */
.size-small .description-text,
.size-small .effect-text {
  font-size: calc(var(--card-width) * 0.06); /* 6% of card width */
}

.size-medium .description-text,
.size-medium .effect-text {
  font-size: calc(var(--card-width) * 0.05); /* 5% of card width */
}

.size-large .description-text,
.size-large .effect-text {
  font-size: calc(var(--card-width) * 0.04); /* 4% of card width */
}

/* Card Footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  margin-top: auto;
  height: var(--card-footer-height);
  padding-top: calc(var(--internal-margin) * 0.5);
  z-index: 3;
}

/* Size-specific text scaling for footer */
.size-small .card-footer {
  font-size: calc(var(--card-width) * 0.05); /* 5% of card width */
}

.size-medium .card-footer {
  font-size: calc(var(--card-width) * 0.04); /* 4% of card width */
}

.size-large .card-footer {
  font-size: calc(var(--card-width) * 0.035); /* 3.5% of card width */
}

.card-code {
  font-family: monospace;
}

.mojo-dojo-logo {
  font-weight: bold;
  font-style: italic;
  color: #000;
}

/* Compact mode adjustments */
.compact-layout .level-display {
  transform: scale(0.8);
}

.compact-layout .text-area {
  max-height: 60px;
  overflow-y: auto;
}

.compact-layout .stat-box {
  padding: calc(var(--internal-margin) * 0.5);
}

/* Print-specific adjustments */
@media print {
  .monster-card-layout {
    font-size: var(--print-description-size);
  }
  
  .card-name {
    font-size: var(--print-title-size);
  }
  
  .type-header {
    font-size: var(--print-type-size);
  }
  
  .stat-label {
    font-size: var(--print-stats-size);
  }
  
  .stat-value {
    font-size: calc(var(--print-stats-size) * 1.25);
  }
  
  .description-text, .effect-text {
    font-size: var(--print-description-size);
  }
  
  .card-footer {
    font-size: var(--print-footer-size);
  }
  
  .text-area {
    max-height: none;
    overflow: visible;
  }
}
</style>