<script setup>
const props = defineProps({
  blok: Object,
  index: Number,
});
</script>

<template>
  <section class="hero-section">
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <!-- Hero Content -->
        <div class="hero-content">
          <h1 v-if="blok.headline" class="mb-6 text-4xl font-bold lg:text-6xl">
            {{ blok.headline }}
          </h1>
          <p v-if="blok.subheadline" class="mb-8 text-xl text-gray-600">
            {{ blok.subheadline }}
          </p>
          <div v-if="blok.cta" class="flex flex-wrap gap-4">
            <a
              v-if="blok.cta.primary"
              :href="blok.cta.primary.url"
              class="rounded-lg bg-blue-600 px-8 py-3 text-white transition-colors hover:bg-blue-700"
            >
              {{ blok.cta.primary.text }}
            </a>
            <a
              v-if="blok.cta.secondary"
              :href="blok.cta.secondary.url"
              class="rounded-lg border border-gray-300 px-8 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              {{ blok.cta.secondary.text }}
            </a>
          </div>
        </div>

        <!-- Hero Image -->
        <div v-if="blok.image" class="hero-image">
          <img
            :src="blok.image.filename"
            :alt="blok.image.alt || 'Hero image'"
            class="h-auto w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-content h1 {
  color: white;
}

.hero-content p {
  color: rgba(255, 255, 255, 0.9);
}
</style>
