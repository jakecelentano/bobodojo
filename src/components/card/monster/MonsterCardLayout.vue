<template>
  <div 
    class="monster-card-layout" 
    :class="layoutClasses"
  >
    <!-- Card Header with Name and Attribute -->
    <div class="card-header">
      <h2 class="card-name">{{ card.name }}</h2>
      <div class="attribute-emblem" :class="`emblem-${attributeClass}`">
        <span class="attribute-text">{{ card.attribute }}</span>
      </div>
    </div>

    <!-- Level Display with Star -->
    <div class="level-section">
      <div class="level-display">
        <div class="star-shape"></div>
        <span class="level-number">{{ card.level || 8 }}</span>
      </div>
      <div v-if="isLegendary" class="legend-tag">
        LEGEND
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

    <!-- Type Header -->
    <div class="type-header">
      <span class="monster-type">{{ card.monster_type || 'DRAGON' }}</span>
      <span class="type-separator">/</span>
      <span class="card-subtype">{{ card.card_subtype || 'Normal' }}</span>
    </div>

    <!-- Stats Display -->
    <div class="stats-section">
      <div class="stat-box stat-atk">
        <span class="stat-label">ATK</span>
        <span class="stat-value">{{ card.atk || '3000' }}</span>
      </div>
      <div class="stat-box stat-def">
        <span class="stat-label">DEF</span>
        <span class="stat-value">{{ card.def || '2500' }}</span>
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
      <span class="rush-duel-logo">RUSH DUEL</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
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

const layoutClasses = computed(() => {
  const classes = [];
  if (props.compact) classes.push('compact-layout');
  if (props.isLegendary) classes.push('legendary-layout');
  return classes;
});

const attributeClass = computed(() => {
  return (props.card.attribute || 'LIGHT').toLowerCase();
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
}

.card-name {
  font-family: var(--card-title-font, 'Arial Black', sans-serif);
  font-size: calc(var(--card-title-size) * 1);
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  color: #000;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  flex: 1;
  line-height: 1.2;
  min-height: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 100%;
  white-space: nowrap;
}

.attribute-emblem {
  width: var(--attribute-emblem-size);
  height: var(--attribute-emblem-size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--card-type-size) * 0.7);
  font-weight: bold;
  color: #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
  margin-left: var(--internal-margin);
  min-width: 24px;
  min-height: 24px;
}

.emblem-light { background: radial-gradient(circle, #FFF8DC, #FFD700); }
.emblem-dark { background: radial-gradient(circle, #DDA0DD, #8B4B8B); }
.emblem-fire { background: radial-gradient(circle, #FFB6C1, #DC143C); }
.emblem-water { background: radial-gradient(circle, #87CEEB, #4169E1); }
.emblem-earth { background: radial-gradient(circle, #DEB887, #8B4513); }
.emblem-wind { background: radial-gradient(circle, #98FB98, #3CB371); }
.emblem-divine { background: radial-gradient(circle, #FFFACD, #FFD700); }

/* Level Section */
.level-section {
  display: flex;
  align-items: center;
  height: var(--card-level-height);
  margin-bottom: var(--internal-margin);
  gap: calc(var(--internal-margin) * 2);
  z-index: 3;
}

.level-display {
  position: relative;
  width: var(--level-icon-size);
  height: var(--level-icon-size);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
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
  font-size: calc(var(--card-level-size) * 0.8);
  color: #000;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
  user-select: none; /* Prevent text selection */
}

.legend-tag {
  background: linear-gradient(45deg, #FFD700, #FFF8DC);
  padding: 2px 12px;
  border-radius: 12px;
  font-size: calc(var(--card-footer-size) * 1);
  font-weight: bold;
  color: #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  white-space: nowrap;
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
  font-size: calc(var(--card-type-size) * 1);
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
  font-size: calc(var(--card-stats-size) * 0.8);
}

.stat-value {
  font-size: calc(var(--card-stats-size) * 1.2);
  font-family: 'Arial Black', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
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
  font-size: calc(var(--card-description-size) * 1);
  line-height: 1.3;
  margin: 0;
  font-style: italic;
}

.effect-text {
  font-size: calc(var(--card-description-size) * 1);
  line-height: 1.3;
  margin: var(--internal-margin) 0 0 0;
  padding-top: var(--internal-margin);
  border-top: 1px solid #DDD;
}

/* Card Footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: calc(var(--card-footer-size) * 1);
  color: #666;
  margin-top: auto;
  height: var(--card-footer-height);
  padding-top: calc(var(--internal-margin) * 0.5);
  z-index: 3;
}

.card-code {
  font-family: monospace;
}

.rush-duel-logo {
  font-weight: bold;
  font-style: italic;
  color: #000;
}

/* Compact mode adjustments */
.compact-layout .card-name {
  font-size: calc(var(--card-title-size) * 0.8);
}

.compact-layout .level-display {
  transform: scale(0.8);
}

.compact-layout .text-area {
  max-height: 60px;
  overflow-y: auto;
}

.compact-layout .type-header {
  padding: calc(var(--internal-margin) * 0.3);
  font-size: calc(var(--card-type-size) * 0.8);
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