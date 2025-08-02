<script setup>
import { StoryblokComponent } from '@storyblok/vue';

defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <StoryblokComponent
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>
