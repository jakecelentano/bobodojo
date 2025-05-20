<template>
  <div class="spelltrap-card-header">
    <div class="card-name-container">
      <h3 class="card-name">{{ name }}</h3>
    </div>
    <div class="spelltrap-type-container">
      <div 
        class="spelltrap-type-icon" 
        :class="[typeClass, subtypeClass]"
        :title="fullTypeTitle"
      >
        {{ typeSymbol }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  cardType: {
    type: String,
    required: true,
    validator: (value) => ['Spell', 'Trap'].includes(value)
  },
  cardSubtype: {
    type: String,
    default: 'Normal'
  }
});

const typeClass = computed(() => `card-${props.cardType.toLowerCase()}`);
const subtypeClass = computed(() => `subtype-${props.cardSubtype.toLowerCase().replace('-', '')}`);

// Determine symbol based on card subtype
const typeSymbol = computed(() => {
  const subtypeMap = {
    'Normal': '★',
    'Quick-Play': '⚡',
    'Continuous': '∞',
    'Ritual': '🔮',
    'Equip': '⚔️',
    'Field': '🏔️',
    'Counter': '↩️'
  };
  
  return subtypeMap[props.cardSubtype] || '★';
});

const fullTypeTitle = computed(() => {
  return `${props.cardSubtype} ${props.cardType}`;
});
</script>

<style scoped>
.spelltrap-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 5%;
  background-color: rgba(255, 255, 255, 0.8);
  margin-top: 2%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-name {
  margin: 0;
  font-family: var(--card-title-font);
  font-size: var(--card-title-size);
  font-weight: bold;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
}

.spelltrap-type-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spelltrap-type-icon {
  width: calc(var(--card-title-size) * 2);
  height: calc(var(--card-title-size) * 2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--card-title-size) * 0.8);
  color: white;
  font-weight: bold;
}

/* Spell card types */
.card-spell {
  background-color: var(--spell-border);
}

/* Trap card types */
.card-trap {
  background-color: var(--trap-border);
}

/* Subtypes with special styling */
.subtype-quickplay {
  box-shadow: 0 0 5px #ffd700;
}

.subtype-continuous {
  box-shadow: 0 0 5px #00bfff;
}

.subtype-counter {
  box-shadow: 0 0 5px #ff1493;
}
</style>
