<script setup>
const props = defineProps({
  blok: Object,
  headline: Object,
  index: Number,
});

// Handle both blok and headline props
const headlineData = computed(() => {
  return props.blok || props.headline || {};
});

const classes = computed(() => {
  let classes = 'font-display font-black mb-3 md:mb-6 text-3xl ';

  if (headlineData.value.size === 'small') {
    classes += 'sm:text-3xl lg:text-4xl ';
  }
  else if (headlineData.value.size === 'large') {
    classes += 'sm:text-5xl lg:text-6xl ';
  }
  else {
    classes += ' sm:text-4xl lg:text-5xl ';
  }

  if (headlineData.value.color) {
    classes += `${headlineData.value.color}`;
  }
  else {
    classes += 'text-[--headline-color]';
  }

  return classes;
});

const tag = computed(() => {
  return props.index === 0 ? 'h1' : 'h2';
});
</script>

<template>
  <component :is="tag" v-editable="headlineData" :class="classes">
    <span v-if="headlineData.highlight" class="highlight">{{ headlineData.highlight }}</span>
    <span v-if="headlineData.text">{{ headlineData.text }}</span>
  </component>
</template>

<style scoped>
.highlight {
  color: var(--primary-highlight, #6251B8);
}
</style> 