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
              <p v-if="blok.header_logo && blok.header_logo.filename" class="text-sm">
                <strong>Logo:</strong> {{ blok.header_logo.filename }}
              </p>
              <p v-else-if="blok.header_logo" class="text-sm">
                <strong>Logo:</strong> <span class="text-gray-500">Logo configured but filename not available</span>
              </p>
              <p v-else class="text-sm">
                <strong>Logo:</strong> <span class="text-gray-500">No logo configured</span>
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
              <div v-if="blok.footer_headline && blok.footer_headline.length > 0" class="text-sm">
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
              <div v-else-if="blok.footer_headline" class="text-sm">
                <strong>Headline:</strong> <span class="text-gray-500">{{ blok.footer_headline }}</span>
              </div>
              <div v-else class="text-sm">
                <strong>Headline:</strong> <span class="text-gray-500">No headline configured</span>
              </div>
              <p v-if="blok.footer_logo && blok.footer_logo.filename" class="text-sm">
                <strong>Logo:</strong> {{ blok.footer_logo.filename }}
              </p>
              <p v-else-if="blok.footer_logo" class="text-sm">
                <strong>Logo:</strong> <span class="text-gray-500">Logo configured but filename not available</span>
              </p>
              <p v-else class="text-sm">
                <strong>Logo:</strong> <span class="text-gray-500">No logo configured</span>
              </p>
              <p class="text-sm">
                <strong>Light Footer:</strong> {{ blok.footer_light ? 'Yes' : 'No' }}
              </p>
            </div>
          </div>

          <!-- Navigation Configuration -->
          <div class="mb-8">
            <h3 class="mb-4 text-xl font-semibold">Navigation Configuration</h3>
            <div class="space-y-4">
              <div v-if="blok.header_nav && blok.header_nav.length > 0">
                <h4 class="font-semibold text-sm mb-2">Header Navigation:</h4>
                <ul class="list-disc list-inside text-sm space-y-1">
                  <li v-for="item in blok.header_nav" :key="item._uid">
                    {{ item.label }}
                  </li>
                </ul>
              </div>
              <div v-if="blok.footer_nav_1 && blok.footer_nav_1.length > 0">
                <h4 class="font-semibold text-sm mb-2">{{ blok.footer_nav_1_headline || 'Footer Navigation 1' }}:</h4>
                <ul class="list-disc list-inside text-sm space-y-1">
                  <li v-for="item in blok.footer_nav_1" :key="item._uid">
                    {{ item.label }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Social Media Configuration -->
          <div class="mb-8" v-if="blok.in || blok.facebook || blok.instagram || blok.youtube">
            <h3 class="mb-4 text-xl font-semibold">Social Media Configuration</h3>
            <div class="space-y-2 text-sm">
              <p v-if="blok.in?.cached_url">
                <strong>LinkedIn:</strong> {{ blok.in.cached_url }}
              </p>
              <p v-if="blok.facebook?.cached_url">
                <strong>Facebook:</strong> {{ blok.facebook.cached_url }}
              </p>
              <p v-if="blok.instagram?.cached_url">
                <strong>Instagram:</strong> {{ blok.instagram.cached_url }}
              </p>
              <p v-if="blok.youtube?.cached_url">
                <strong>YouTube:</strong> {{ blok.youtube.cached_url }}
              </p>
            </div>
          </div>

          <!-- Footer About Section -->
          <div class="mb-8" v-if="blok.footer_about">
            <h3 class="mb-4 text-xl font-semibold">Footer About Section</h3>
            <div class="text-sm">
              <p v-if="blok.footer_about.content && blok.footer_about.content[0]?.content?.[0]?.content?.[0]?.text">
                <strong>About Text:</strong> {{ blok.footer_about.content[0].content[0].content[0].text }}
              </p>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="mb-8" v-if="blok.footer_nav_3 && blok.footer_nav_3.length > 0">
            <h3 class="mb-4 text-xl font-semibold">Contact Information</h3>
            <div class="space-y-2 text-sm">
              <div v-for="item in blok.footer_nav_3" :key="item._uid">
                <strong>{{ item.label }}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Section -->
        <div class="preview-section">
          <h3 class="mb-4 text-xl font-semibold">Live Preview</h3>
          
          <!-- Header Preview -->
          <div class="mb-6">
            <h4 class="font-semibold text-sm mb-2 text-gray-600">Header Preview:</h4>
            <div class="border rounded-lg p-4 bg-white shadow-sm">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <img 
                    v-if="blok.header_logo?.filename" 
                    :src="blok.header_logo.filename" 
                    :alt="blok.header_logo?.alt || 'Logo'"
                    class="h-8 w-auto object-contain"
                  />
                  <div v-else class="h-8 w-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                    Logo
                  </div>
                </div>
                <nav class="hidden md:flex space-x-6">
                  <a 
                    v-for="item in blok.header_nav" 
                    :key="item._uid"
                    href="#"
                    class="text-sm hover:text-blue-600 transition-colors"
                  >
                    {{ item.label }}
                  </a>
                </nav>
                <div class="flex items-center space-x-2">
                  <button 
                    v-for="button in blok.header_buttons" 
                    :key="button._uid"
                    class="px-4 py-2 text-sm rounded"
                    :class="button.background_color === 'primary-dark' ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'"
                  >
                    {{ button.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer Preview -->
          <div class="mb-6">
            <h4 class="font-semibold text-sm mb-2 text-gray-600">Footer Preview:</h4>
            <div class="border rounded-lg p-6 bg-gray-50">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Footer Headline -->
                <div class="md:col-span-3 mb-4">
                  <div v-if="blok.footer_headline && blok.footer_headline.length > 0">
                    <StoryblokComponent
                      v-for="headline in blok.footer_headline"
                      :key="headline._uid"
                      :blok="headline"
                      :index="0"
                    />
                  </div>
                </div>
                
                <!-- Footer Navigation Sections -->
                <div v-if="blok.footer_nav_1 && blok.footer_nav_1.length > 0">
                  <h5 class="font-semibold text-sm mb-2">{{ blok.footer_nav_1_headline || 'Navigation' }}</h5>
                  <ul class="space-y-1 text-sm">
                    <li v-for="item in blok.footer_nav_1" :key="item._uid">
                      <a href="#" class="hover:text-blue-600 transition-colors">{{ item.label }}</a>
                    </li>
                  </ul>
                </div>
                
                <div v-if="blok.footer_nav_2 && blok.footer_nav_2.length > 0">
                  <h5 class="font-semibold text-sm mb-2">{{ blok.footer_nav_2_headline || 'Learn' }}</h5>
                  <ul class="space-y-1 text-sm">
                    <li v-for="item in blok.footer_nav_2" :key="item._uid">
                      <a href="#" class="hover:text-blue-600 transition-colors">{{ item.label }}</a>
                    </li>
                  </ul>
                </div>
                
                <div v-if="blok.footer_nav_3 && blok.footer_nav_3.length > 0">
                  <h5 class="font-semibold text-sm mb-2">{{ blok.footer_nav_3_headline || 'Contact' }}</h5>
                  <ul class="space-y-1 text-sm">
                    <li v-for="item in blok.footer_nav_3" :key="item._uid">
                      <span class="text-gray-600">{{ item.label }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <!-- Social Media Links -->
              <div v-if="blok.in || blok.facebook || blok.instagram || blok.youtube" class="mt-6 pt-4 border-t">
                <div class="flex space-x-4">
                  <a v-if="blok.in?.cached_url" href="#" class="text-gray-600 hover:text-blue-600">
                    <span class="text-sm">LinkedIn</span>
                  </a>
                  <a v-if="blok.facebook?.cached_url" href="#" class="text-gray-600 hover:text-blue-600">
                    <span class="text-sm">Facebook</span>
                  </a>
                  <a v-if="blok.instagram?.cached_url" href="#" class="text-gray-600 hover:text-blue-600">
                    <span class="text-sm">Instagram</span>
                  </a>
                  <a v-if="blok.youtube?.cached_url" href="#" class="text-gray-600 hover:text-blue-600">
                    <span class="text-sm">YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Debug Information -->
          <details class="mt-4">
            <summary class="cursor-pointer text-sm font-semibold text-blue-600">Debug Information</summary>
            <div class="mt-2 p-2 bg-gray-100 rounded text-xs">
              <p><strong>Component:</strong> {{ blok?.component || 'Not set' }}</p>
              <p><strong>Header Logo:</strong> {{ blok?.header_logo ? 'Configured' : 'Not configured' }}</p>
              <p><strong>Header Light:</strong> {{ blok?.header_light }}</p>
              <p><strong>Footer Headline:</strong> {{ blok?.footer_headline ? 'Configured' : 'Not configured' }}</p>
              <p><strong>Footer Light:</strong> {{ blok?.footer_light }}</p>
              <p><strong>Use Custom Colors:</strong> {{ blok?.use_custom_colors }}</p>
              <p><strong>Use Custom Fonts:</strong> {{ blok?.use_custom_fonts }}</p>
              <details class="mt-2">
                <summary class="cursor-pointer text-xs font-semibold text-red-600">Raw JSON Data</summary>
                <pre class="mt-2 text-xs overflow-auto max-h-96">{{ JSON.stringify(blok, null, 2) }}</pre>
              </details>
            </div>
          </details>
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
