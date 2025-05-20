<template>
  <div 
    class="card-frame" 
    :class="frameClasses"
    :style="frameStyle"
  >
    <!-- Outer black border -->
    <div class="black-border"></div>
    <!-- Colored gradient background -->
    <div class="frame-border"></div>
    <!-- Content area -->
    <div class="frame-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import '../../styles/variables.css';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['Monster', 'Spell', 'Trap'].includes(value)
  },
  compact: {
    type: Boolean,
    default: false
  },
  legendary: {
    type: Boolean,
    default: false
  }
});

// Inject card data to access attribute
const cardData = inject('cardData', {});

// Attribute colors based on Rush Duel design
const attributeColors = {
  'LIGHT': {
    frame: '#FFD700', // Gold/Yellow
    gradient: 'linear-gradient(135deg, #FFE57F, #FFC300)',
    emblem: '#FFF8DC'
  },
  'DARK': {
    frame: '#8B4B8B', // Purple
    gradient: 'linear-gradient(135deg, #9B6B9B, #6B4B6B)',
    emblem: '#DDA0DD'
  },
  'FIRE': {
    frame: '#DC143C', // Crimson
    gradient: 'linear-gradient(135deg, #FF6B6B, #C41E3A)',
    emblem: '#FFB6C1'
  },
  'WATER': {
    frame: '#4169E1', // Royal Blue
    gradient: 'linear-gradient(135deg, #6B9EFF, #2B5EC6)',
    emblem: '#87CEEB'
  },
  'EARTH': {
    frame: '#8B4513', // Saddle Brown
    gradient: 'linear-gradient(135deg, #A0522D, #654321)',
    emblem: '#DEB887'
  },
  'WIND': {
    frame: '#3CB371', // Sea Green
    gradient: 'linear-gradient(135deg, #66BB6A, #2E8B57)',
    emblem: '#98FB98'
  },
  'DIVINE': {
    frame: '#FFD700', // Gold
    gradient: 'linear-gradient(135deg, #FFE57F, #FFB347)',
    emblem: '#FFFACD'
  }
};

const frameClasses = computed(() => {
  const classes = [
    `frame-${props.type.toLowerCase()}`,
    `frame-${cardData.attribute?.toLowerCase() || 'default'}`
  ];
  
  if (props.legendary) {
    classes.push('frame-legendary');
  }
  
  if (props.compact) {
    classes.push('frame-compact');
  }
  
  // Add print-specific classes
  classes.push('frame-bleed');
  
  return classes;
});

const frameStyle = computed(() => {
  let styles = {};
  
  if (props.type === 'Monster' && cardData.attribute) {
    const colors = attributeColors[cardData.attribute];
    if (colors) {
      styles = {
        '--frame-color': colors.frame,
        '--frame-gradient': colors.gradient,
        '--frame-emblem-color': colors.emblem
      };
    }
  }
  
  return styles;
});
</script>

<style scoped>
.card-frame {
  position: relative;
  width: var(--card-width);
  height: 0;
  padding-bottom: calc(var(--card-width) * var(--card-ratio));
  overflow: visible; /* Changed to visible to show the outer border */
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-shadow);
  box-sizing: border-box;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* Print dimensions */
  --card-print-width: 2.5in;
  --card-print-height: 3.5in;
  --card-bleed: 0.125in;
  --card-safe-margin: 0.125in;
  
  /* Border width variables */
  --border-width: calc(var(--card-width) * 0.04); /* 4% of card width (20% less than 5%) */
  --compact-border-width: calc(var(--card-width) * 0.024); /* 2.4% for compact mode (20% less than 3%) */
}

/* Outer black border */
.black-border {
  position: absolute;
  top: calc(var(--border-width) * -1);
  left: calc(var(--border-width) * -1);
  right: calc(var(--border-width) * -1);
  bottom: calc(var(--border-width) * -1);
  background: #000;
  border-radius: calc(var(--card-border-radius) + var(--border-width));
  z-index: 0;
}

/* Frame border with gradient background */
.frame-border {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  border-radius: var(--card-border-radius);
  background: var(--frame-gradient, none);
  pointer-events: none;
  z-index: 1;
}

/* Content area with safe margins */
.frame-content {
  position: absolute;
  inset: 0;
  padding: var(--card-safe-margin);
  z-index: 2;
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: var(--card-border-radius);
  overflow: hidden;
}

/* Attribute-specific frame colors and backgrounds */
.frame-light .frame-border {
  background: linear-gradient(135deg, #FFE57F, #FFC300);
}

.frame-dark .frame-border {
  background: linear-gradient(135deg, #9B6B9B, #6B4B6B);
}

.frame-fire .frame-border {
  background: linear-gradient(135deg, #FF6B6B, #C41E3A);
}

.frame-water .frame-border {
  background: linear-gradient(135deg, #6B9EFF, #2B5EC6);
}

.frame-earth .frame-border {
  background: linear-gradient(135deg, #A0522D, #654321);
}

.frame-wind .frame-border {
  background: linear-gradient(135deg, #66BB6A, #2E8B57);
}

.frame-divine .frame-border {
  background: linear-gradient(135deg, #FFE57F, #FFB347);
}

/* Legendary card styling */
.frame-legendary .frame-border {
  background: linear-gradient(
    135deg,
    #FFD700 0%,
    #FFF8DC 20%,
    #FFD700 40%,
    #FFF8DC 60%,
    #FFD700 80%,
    #FFF8DC 100%
  );
  box-shadow: inset 0 0 10px rgba(255, 215, 0, 0.3);
}

.frame-legendary.card-frame {
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

/* Spell and Trap card frames */
.frame-spell .frame-border {
  background: linear-gradient(135deg, #2E8B57, #228B22);
}

.frame-trap .frame-border {
  background: linear-gradient(135deg, #DC143C, #8B0000);
}

/* Compact mode adjustments */
.frame-compact .black-border {
  top: calc(var(--compact-border-width) * -1);
  left: calc(var(--compact-border-width) * -1);
  right: calc(var(--compact-border-width) * -1);
  bottom: calc(var(--compact-border-width) * -1);
  border-radius: calc(var(--card-border-radius) + var(--compact-border-width));
}

/* Hover effects (web only) */
@media (hover: hover) {
  .card-frame:hover {
    transform: translateY(-2px);
    box-shadow: var(--card-hover-shadow);
  }
}

/* Print-specific styles */
@media print {
  .card-frame {
    width: var(--card-print-width);
    height: var(--card-print-height);
    padding-bottom: 0;
    page-break-inside: avoid;
    break-inside: avoid;
    --border-width: calc(var(--card-print-width) * 0.04); /* 4% for print (20% less than 5%) */
  }
  
  .frame-bleed {
    /* Extend frame to bleed area */
    margin: calc(-1 * var(--card-bleed));
    width: calc(var(--card-print-width) + (2 * var(--card-bleed)));
    height: calc(var(--card-print-height) + (2 * var(--card-bleed)));
  }
  
  .black-border {
    top: calc(var(--border-width) * -1);
    left: calc(var(--border-width) * -1);
    right: calc(var(--border-width) * -1);
    bottom: calc(var(--border-width) * -1);
  }
  
  .frame-content {
    padding: calc(var(--card-bleed) + var(--card-safe-margin));
  }
}
</style>