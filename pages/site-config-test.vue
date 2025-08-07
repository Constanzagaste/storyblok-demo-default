<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Site Configuration Test</h1>
    
    <!-- Test SiteConfig Component -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">SiteConfig Component Test</h2>
      <div v-if="testBlok" class="border p-4 rounded">
        <StoryblokComponent :blok="testBlok" :index="0" />
      </div>
      <div v-else class="text-red-600">No test data available</div>
    </div>

    <!-- Raw Data Display -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Raw Site Config Data</h2>
      <div class="bg-gray-100 p-4 rounded">
        <pre class="text-sm overflow-auto">{{ JSON.stringify(siteConfigData, null, 2) }}</pre>
      </div>
    </div>

    <!-- Manual Test -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Manual Test</h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="border p-4 rounded">
          <h3 class="font-semibold mb-2">Header Configuration</h3>
          <p><strong>Logo:</strong> {{ siteConfigData?.content?.header_logo?.filename || 'Not configured' }}</p>
          <p><strong>Light Header:</strong> {{ siteConfigData?.content?.header_light ? 'Yes' : 'No' }}</p>
        </div>
        <div class="border p-4 rounded">
          <h3 class="font-semibold mb-2">Footer Configuration</h3>
          <p><strong>Headline:</strong> {{ siteConfigData?.content?.footer_headline || 'Not configured' }}</p>
          <p><strong>Light Footer:</strong> {{ siteConfigData?.content?.footer_light ? 'Yes' : 'No' }}</p>
        </div>
      </div>
    </div>

    <!-- Fetch Button -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Manual Fetch</h2>
      <button 
        @click="fetchSiteConfig" 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Fetch Site Config
      </button>
      <div v-if="fetchError" class="mt-2 text-red-600">
        Error: {{ fetchError }}
      </div>
    </div>
  </div>
</template>

<script setup>
const siteConfigData = ref(null);
const testBlok = ref(null);
const fetchError = ref(null);

// Create a test blok for the SiteConfig component
const createTestBlok = (data) => {
  return {
    component: 'site-config',
    ...data?.content,
  };
};

// Fetch site config data
const fetchSiteConfig = async () => {
  try {
    fetchError.value = null;
    const getSiteConfigFn = getSiteConfig();
    const data = await getSiteConfigFn();
    siteConfigData.value = data.value;
    testBlok.value = createTestBlok(data.value);
    console.log('✅ Site config fetched:', data.value);
  } catch (error) {
    fetchError.value = error.message;
    console.error('❌ Error fetching site config:', error);
  }
};

// Fetch on mount
onMounted(() => {
  fetchSiteConfig();
});
</script> 