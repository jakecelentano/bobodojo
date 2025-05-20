<template>
  <div class="monster-card-footer">
    <div class="monster-type-container">
      <div class="monster-type">
        {{ displayType }}
      </div>
    </div>
    <div class="stats-and-info">
      <div class="monster-stats-container">
        <div class="monster-stat atk-stat">ATK <span class="stat-value">{{ atk }}</span></div>
        <div class="monster-stat def-stat">DEF <span class="stat-value">{{ def }}</span></div>
      </div>
    </div>
    <div class="card-branding" v-if="isLegendary">
      <div class="copyright">@YGOSATELLITE</div>
      <div class="rush-duel-logo">RUSH DUEL</div>
      <div class="card-code">{{ cardCode || props.card?.card_code || 'RD/KP01-JP000' }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  monsterType: {
    type: String,
    required: true
  },
  cardSubtype: {
    type: String,
    default: 'Normal'
  },
  atk: {
    type: [Number, String],
    required: true
  },
  def: {
    type: [Number, String],
    required: true
  },
  isLegendary: {
    type: Boolean,
    default: false
  },
  cardCode: {
    type: String,
    default: ''
  },
  card: {
    type: Object,
    default: () => ({})
  }
});

// Format the displayed type string
const displayType = computed(() => {
  if (props.cardSubtype === 'Normal') {
    return `[${props.monsterType.toUpperCase()}/NORMAL]`;
  } else {
    return `[${props.monsterType.toUpperCase()}/${props.cardSubtype.toUpperCase()}]`;
  }
});
</script>

<style scoped>
.monster-card-footer {
  margin-top: auto;
  padding: 5px 5%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 2%;
}

.monster-type-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  border-radius: 3px;
}

.monster-type {
  font-family: var(--card-text-font);
  font-size: calc(var(--card-stats-size) * 0.9);
  font-style: italic;
  color: #333;
  text-align: left;
  font-weight: bold;
}

.stats-and-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.monster-stats-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.monster-stat {
  font-family: var(--card-text-font);
  font-size: var(--card-stats-size);
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.atk-stat {
  background-color: var(--atk-bg);
  color: #fff;
}

.def-stat {
  background-color: var(--def-bg);
  color: #fff;
}

.stat-value {
  color: var(--stats-text-color);
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  font-size: calc(var(--card-stats-size) * 1.2);
}

.card-branding {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  font-size: calc(var(--card-stats-size) * 0.6);
  color: var(--card-code-color);
}

.copyright {
  font-weight: bold;
}

.rush-duel-logo {
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: #000;
  color: #fff;
  padding: 2px 6px;
  border-radius: 2px;
}

.card-code {
  font-weight: bold;
}
</style>
