<template>
  <div class="spelltrap-card-footer">
    <div class="spelltrap-type-text">
      {{ displayType }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
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

// Format the displayed type string
const displayType = computed(() => {
  return `[ ${props.cardSubtype} ${props.cardType} Card ]`;
});
</script>

<style scoped>
.spelltrap-card-footer {
  margin-top: auto;
  padding: 8px 5%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  margin: 5px 5% 8px 5%;
}

.spelltrap-type-text {
  font-family: var(--card-text-font);
  font-size: calc(var(--card-stats-size) * 0.9);
  font-style: italic;
  color: #333;
  text-align: center;
}
</style>
