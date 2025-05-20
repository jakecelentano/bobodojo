<template>
  <div class="monster-card-header" :class="{ 'legendary-header': isLegendary }">
    <div class="legend-badge" v-if="isLegendary">LEGEND</div>
    <div class="card-name-container">
      <h3 class="card-name" :class="{ 'legendary-name': isLegendary }">{{ name }}</h3>
    </div>
    <div class="attribute-container">
      <div class="attribute-icon" :class="attributeClass">
        <span v-if="attribute === 'LIGHT'" class="japanese-character">光</span>
        <span v-else>{{ attribute }}</span>
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
  attribute: {
    type: String,
    required: true,
    validator: (value) => ['DARK', 'LIGHT', 'EARTH', 'WATER', 'FIRE', 'WIND', 'DIVINE'].includes(value)
  },
  isLegendary: {
    type: Boolean,
    default: false
  }
});

const attributeClass = computed(() => `attribute-${props.attribute.toLowerCase()}`);
</script>

<style scoped>
.monster-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 5%;
  background-color: rgba(255, 255, 255, 0.8);
  margin-top: 2%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.legendary-header {
  background-color: transparent;
  box-shadow: none;
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
  max-width: 75%;
}

.legendary-name {
  color: #d4a231;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  font-size: calc(var(--card-title-size) * 1.2);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.legend-badge {
  position: absolute;
  left: 10%;
  top: 23%;
  background-image: var(--legend-badge-bg);
  color: var(--legend-badge-text);
  font-weight: bold;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: calc(var(--card-title-size) * 0.6);
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.attribute-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.attribute-icon {
  width: calc(var(--card-title-size) * 2);
  height: calc(var(--card-title-size) * 2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--card-title-size) * 0.6);
  color: white;
  font-weight: bold;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.japanese-character {
  font-size: calc(var(--card-title-size) * 1);
  font-weight: normal;
}

.attribute-dark {
  background-color: #5a3068;
}

.attribute-light {
  background-color: #f8c858;
  color: #333;
}

.attribute-earth {
  background-color: #8d5d38;
}

.attribute-water {
  background-color: #3d7dca;
}

.attribute-fire {
  background-color: #e64539;
}

.attribute-wind {
  background-color: #7dd45c;
  color: #333;
}

.attribute-divine {
  background-color: #fedb8b;
  color: #333;
  /* Add glow effect for divine */
  box-shadow: 0 0 10px #fedb8b;
}
</style>
