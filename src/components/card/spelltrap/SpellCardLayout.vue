<template>
  <div class="spell-card-layout" :class="{ 'compact': compact }">
    <SpellTrapHeader 
      :name="card.name" 
      cardType="Spell" 
      :cardSubtype="card.card_subtype || 'Normal'" 
    />
    <CardImage :imageUrl="card.image_url" :altText="`${card.name} artwork`" />
    <CardText :compact="compact" maxHeight="30%">
      {{ card.description }}
      <div v-if="card.effect_text" class="effect-text">
        {{ card.effect_text }}
      </div>
    </CardText>
    <SpellTrapFooter 
      cardType="Spell" 
      :cardSubtype="card.card_subtype || 'Normal'"
    />
  </div>
</template>

<script setup>
import SpellTrapHeader from './SpellTrapHeader.vue';
import CardImage from '../CardImage.vue';
import CardText from '../CardText.vue';
import SpellTrapFooter from './SpellTrapFooter.vue';

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.spell-card-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
}

.effect-text {
  margin-top: 8px;
  font-style: italic;
  font-size: 0.9em;
  padding-top: 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.compact .effect-text {
  display: none;
}
</style>
