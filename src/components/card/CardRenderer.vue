<template>
  <div 
    class="card-renderer" 
    :class="[sizeClass]"
    @click="$emit('click')"
  >
    <CardFrame 
      :type="card.card_type" 
      :compact="isCompact"
      :legendary="isCardLegendary"
    >
      <component 
        :is="cardLayoutComponent" 
        :card="card" 
        :compact="isCompact"
        :isLegendary="isCardLegendary"
      />
    </CardFrame>
  </div>
</template>

<script setup>
import { computed, provide } from 'vue';
import CardFrame from './CardFrame.vue';
import MonsterCardLayout from './monster/MonsterCardLayout.vue';
import SpellCardLayout from './spelltrap/SpellCardLayout.vue';
import TrapCardLayout from './spelltrap/TrapCardLayout.vue';

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  isLegendary: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

// Provide card data for child components
provide('cardData', props.card);
  
// Provide card size information for child components
provide('cardSize', props.size);

// Determine if the card should use compact mode
const isCompact = computed(() => props.size === 'small');

// Determine if the card should use legendary styling
const isCardLegendary = computed(() => props.isLegendary || props.card.isLegendary || false);

// Size class for responsive styling
const sizeClass = computed(() => `size-${props.size}`);

// Determine the correct component based on card type
const cardLayoutComponent = computed(() => {
  switch (props.card.card_type) {
    case 'Monster':
      return MonsterCardLayout;
    case 'Spell':
      return SpellCardLayout;
    case 'Trap':
      return TrapCardLayout;
    default:
      // Fallback to Monster if unknown
      return MonsterCardLayout;
  }
});
</script>

<style scoped>
.card-renderer {
  display: block;
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s;
  overflow: visible;
  margin: 0 auto;
}

.card-renderer:hover {
  transform: translateY(-5px);
}

/* Size variants - preserve aspect ratio but change container width */
.size-small {
  max-width: 200px;
}

.size-medium {
  max-width: 300px;
}

.size-large {
  max-width: 400px;
}

/* Responsive adjustments for mobile */
@media (max-width: 768px) {
  .size-small {
    max-width: 150px;
  }

  .size-medium {
    max-width: 220px;
  }

  .size-large {
    max-width: 300px;
  }
}

/* Print-specific adjustments */
@media print {
  .card-renderer {
    width: var(--card-print-width);
    max-width: none;
    transform: none !important;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .card-renderer:hover {
    transform: none;
  }
}
</style>