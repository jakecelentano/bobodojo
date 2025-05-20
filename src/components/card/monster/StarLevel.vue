<template>
  <div class="level-indicator-container">
    <div class="level-indicator">
      <div class="level-star">★</div>
      <div class="level-number">{{ level }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  level: {
    type: Number,
    required: true,
    validator: (value) => value >= 1 && value <= 12
  }
});
</script>

<style scoped>
.level-indicator-container {
  position: absolute;
  bottom: 33%;
  left: 8%;
  z-index: 10;
}

.level-indicator {
  position: relative;
  width: calc(var(--card-title-size) * 3);
  height: calc(var(--card-title-size) * 3);
  background: linear-gradient(to bottom, #ff3d00, #8b0000);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 2px solid #ffea00;
}

.level-star {
  position: absolute;
  color: #ffea00;
  font-size: calc(var(--card-title-size) * 2.2);
  z-index: 1;
}

.level-number {
  position: absolute;
  color: #ffea00;
  font-size: calc(var(--card-title-size) * 1.8);
  font-weight: bold;
  z-index: 2;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
</style>
