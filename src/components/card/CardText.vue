<template>
  <div class="card-text-container" :class="{ 'compact': compact }">
    <div ref="textElement" class="card-text" :class="{ 'scrollable': shouldScroll }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import '../../styles/variables.css';

const props = defineProps({
  compact: {
    type: Boolean,
    default: false
  },
  maxHeight: {
    type: String,
    default: 'auto'
  }
});

const textElement = ref(null);
const shouldScroll = ref(false);

// Check if content is overflowing and should be scrollable
const checkOverflow = () => {
  if (textElement.value) {
    const element = textElement.value;
    shouldScroll.value = element.scrollHeight > element.clientHeight;
  }
};

onMounted(() => {
  checkOverflow();
  // Add resize listener to check again if window size changes
  window.addEventListener('resize', checkOverflow);
});

// Clean up
onUnmounted(() => {
  window.removeEventListener('resize', checkOverflow);
});
</script>

<style scoped>
.card-text-container {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: calc(var(--card-border-radius) / 2);
  padding: 8px;
  box-sizing: border-box;
  margin-top: var(--element-spacing);
}

.card-text {
  font-family: var(--card-text-font);
  font-size: var(--card-description-size);
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: v-bind('props.maxHeight');
  transition: max-height 0.3s;
}

.card-text.scrollable {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
}

.card-text.scrollable::-webkit-scrollbar {
  width: 4px;
}

.card-text.scrollable::-webkit-scrollbar-track {
  background: transparent;
}

.card-text.scrollable::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.compact .card-text {
  font-size: calc(var(--card-description-size) * 0.9);
  line-height: 1.3;
  max-height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
