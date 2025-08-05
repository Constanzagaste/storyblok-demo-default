<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Production Data Test</h1>
    
    <div class="space-y-6">
      <!-- API Token Status -->
      <div class="bg-blue-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">API Token Status</h2>
        <p><strong>Token Available:</strong> {{ tokenAvailable ? '✅ Yes' : '❌ No' }}</p>
        <p><strong>Token Length:</strong> {{ tokenLength }}</p>
        <p><strong>Token Preview:</strong> {{ tokenPreview }}</p>
      </div>
      
      <!-- Fetch Home Page Data -->
      <div class="bg-green-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Home Page Data</h2>
        <button @click="fetchHomeData" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Fetch Home Data
        </button>
        <div v-if="homeData" class="mt-4">
          <h3 class="font-semibold">Home Data:</h3>
          <pre class="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-auto">{{ JSON.stringify(homeData, null, 2) }}</pre>
        </div>
        <div v-if="homeError" class="mt-4 text-red-600">
          <h3 class="font-semibold">Error:</h3>
          <pre class="bg-red-100 p-4 rounded">{{ homeError }}</pre>
        </div>
      </div>
      
      <!-- Fetch Site Config Data -->
      <div class="bg-yellow-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Site Config Data</h2>
        <button @click="fetchSiteConfigData" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Fetch Site Config Data
        </button>
        <div v-if="siteConfigData" class="mt-4">
          <h3 class="font-semibold">Site Config Data:</h3>
          <pre class="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-auto">{{ JSON.stringify(siteConfigData, null, 2) }}</pre>
        </div>
        <div v-if="siteConfigError" class="mt-4 text-red-600">
          <h3 class="font-semibold">Error:</h3>
          <pre class="bg-red-100 p-4 rounded">{{ siteConfigError }}</pre>
        </div>
      </div>
      
      <!-- Render Test -->
      <div class="bg-purple-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Render Test</h2>
        <div v-if="homeData && homeData.story" class="border p-4 bg-white">
          <h3 class="font-semibold mb-2">Rendering Home Data:</h3>
          <StoryblokComponent :blok="homeData.story.content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tokenAvailable = ref(false);
const tokenLength = ref(0);
const tokenPreview = ref('');
const homeData = ref(null);
const homeError = ref(null);
const siteConfigData = ref(null);
const siteConfigError = ref(null);

onMounted(() => {
  // Check API token
  const token = process.env.STORYBLOK_TOKEN || useRuntimeConfig().public.STORYBLOK_TOKEN;
  tokenAvailable.value = !!token;
  tokenLength.value = token?.length || 0;
  tokenPreview.value = token ? `${token.substring(0, 10)}...${token.substring(token.length - 5)}` : 'Not set';
});

const fetchHomeData = async () => {
  try {
    const storyblokApi = useStoryblokApi();
    if (!storyblokApi) {
      homeError.value = 'Storyblok API not available';
      return;
    }

    const { data } = await storyblokApi.get('cdn/stories/home', {
      version: 'draft',
      resolve_links: 'url'
    });

    homeData.value = data;
    homeError.value = null;
  } catch (error) {
    homeError.value = `Error: ${error.message}\n\nFull error: ${JSON.stringify(error, null, 2)}`;
    homeData.value = null;
  }
};

const fetchSiteConfigData = async () => {
  try {
    const storyblokApi = useStoryblokApi();
    if (!storyblokApi) {
      siteConfigError.value = 'Storyblok API not available';
      return;
    }

    const { data } = await storyblokApi.get('cdn/stories/site-config', {
      version: 'draft',
      resolve_links: 'url'
    });

    siteConfigData.value = data;
    siteConfigError.value = null;
  } catch (error) {
    siteConfigError.value = `Error: ${error.message}\n\nFull error: ${JSON.stringify(error, null, 2)}`;
    siteConfigData.value = null;
  }
};
</script> 