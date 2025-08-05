<script setup>
const props = defineProps({
  blok: Object,
  index: Number,
});


</script>

<template>
  <div v-editable="blok" class="site-config">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- Site Configuration Form -->
        <div class="config-section">
          <h2 class="mb-6 text-2xl font-bold">Site Configuration</h2>
          
          <!-- Custom Colors Section -->
          <div v-if="blok.use_custom_colors" class="mb-8">
            <h3 class="mb-4 text-xl font-semibold">Custom Colors</h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-if="blok.primary_highlight_color" class="color-preview">
                <div class="mb-2 h-8 w-full rounded border" :style="{ backgroundColor: blok.primary_highlight_color.color }"></div>
                <p class="text-sm">Primary Highlight</p>
              </div>
              <div v-if="blok.primary_background_color" class="color-preview">
                <div class="mb-2 h-8 w-full rounded border" :style="{ backgroundColor: blok.primary_background_color.color }"></div>
                <p class="text-sm">Primary Background</p>
              </div>
            </div>
          </div>

          <!-- Custom Fonts Section -->
          <div v-if="blok.use_custom_fonts" class="mb-8">
            <h3 class="mb-4 text-xl font-semibold">Custom Fonts</h3>
            <div class="space-y-2">
              <p v-if="blok.custom_font_display" class="text-sm">
                <strong>Display Font:</strong> {{ blok.custom_font_display }}
              </p>
              <p v-if="blok.custom_font_body" class="text-sm">
                <strong>Body Font:</strong> {{ blok.custom_font_body }}
              </p>
            </div>
          </div>

          <!-- Header Configuration -->
          <div class="mb-8">
            <h3 class="mb-4 text-xl font-semibold">Header Configuration</h3>
            <div class="space-y-2">
              <p v-if="blok.header_logo" class="text-sm">
                <strong>Logo:</strong> {{ blok.header_logo.filename }}
              </p>
              <p class="text-sm">
                <strong>Light Header:</strong> {{ blok.header_light ? 'Yes' : 'No' }}
              </p>
            </div>
          </div>

          <!-- Footer Configuration -->
          <div class="mb-8">
            <h3 class="mb-4 text-xl font-semibold">Footer Configuration</h3>
            <div class="space-y-2">
              <div v-if="blok.footer_headline" class="text-sm">
                <strong>Headline:</strong>
                <div class="mt-2">
                  <StoryblokComponent
                    v-for="headline in blok.footer_headline"
                    :key="headline._uid"
                    :blok="headline"
                    :index="0"
                  />
                </div>
              </div>
              <p v-if="blok.footer_logo" class="text-sm">
                <strong>Logo:</strong> {{ blok.footer_logo.filename }}
              </p>
              <p class="text-sm">
                <strong>Light Footer:</strong> {{ blok.footer_light ? 'Yes' : 'No' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Preview Section -->
        <div class="preview-section">
          <h3 class="mb-4 text-xl font-semibold">Configuration Preview</h3>
          <div class="rounded-lg border p-4">
            <p class="text-sm text-gray-600">
              This page shows your current site configuration settings. 
              Changes made in Storyblok will be reflected here.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site-config {
  background-color: var(--primary-background, #F5F5F7);
  min-height: 100vh;
}

.color-preview {
  padding: 8px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}
</style>
