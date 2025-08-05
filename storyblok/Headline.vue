<script setup>
const props = defineProps({
  blok: Object,
  index: Number,
});

const classes = computed(() => {
  let classes = 'font-display font-black mb-3 md:mb-6 text-3xl ';

  if (props.blok.size === 'small') {
    classes += 'sm:text-3xl lg:text-4xl ';
  }
  else if (props.blok.size === 'large') {
    classes += 'sm:text-5xl lg:text-6xl ';
  }
  else {
    classes += ' sm:text-4xl lg:text-5xl ';
  }

  if (props.blok.color) {
    classes += `${props.blok.color}`;
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
  <component :is="tag" v-editable="blok" :class="classes">
    <span v-if="blok.highlight" class="highlight">{{ blok.highlight }}</span>
    <span v-if="blok.text">{{ blok.text }}</span>
  </component>
</template>

<style scoped>
.highlight {
  color: var(--primary-highlight, #6251B8);
}
</style> 