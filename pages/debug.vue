<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Storyblok Debug Page</h1>
    
    <div class="space-y-6">
      <!-- Environment Info -->
      <div class="bg-gray-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Environment Info</h2>
        <p><strong>STORYBLOK_TOKEN:</strong> {{ tokenInfo }}</p>
        <p><strong>Environment:</strong> {{ isDev ? 'Development' : 'Production' }}</p>
        <p><strong>Current URL:</strong> {{ $route.fullPath }}</p>
      </div>

      <!-- Component Registration Status -->
      <div class="bg-blue-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Component Registration Status</h2>
        <div v-for="(status, component) in componentStatus" :key="component" class="mb-2">
          <span class="font-mono">{{ component }}:</span>
          <span :class="status ? 'text-green-600' : 'text-red-600'">
            {{ status ? '✅ Registered' : '❌ Not Found' }}
          </span>
        </div>
      </div>

      <!-- Storyblok API Test -->
      <div class="bg-yellow-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Storyblok API Test</h2>
        <button @click="testAPI" class="bg-blue-500 text-white px-4 py-2 rounded">
          Test API Connection
        </button>
        <div v-if="apiResult" class="mt-4">
          <h3 class="font-semibold">API Result:</h3>
          <pre class="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-auto">{{ apiResult }}</pre>
        </div>
      </div>

      <!-- Manual Component Test -->
      <div class="bg-green-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Manual Component Test</h2>
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold">Herosection Test:</h3>
            <div v-if="herosectionComponent" class="border p-4 mt-2">
              <StoryblokComponent :blok="herosectionComponent" />
            </div>
            <div v-else class="text-red-600">Herosection component not available</div>
          </div>
          
          <div>
            <h3 class="font-semibold">SiteConfig Test:</h3>
            <div v-if="siteConfigComponent" class="border p-4 mt-2">
              <StoryblokComponent :blok="siteConfigComponent" />
            </div>
            <div v-else class="text-red-600">SiteConfig component not available</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isDev = process.dev;
const tokenInfo = computed(() => {
  const token = process.env.STORYBLOK_TOKEN || useRuntimeConfig().public.STORYBLOK_TOKEN;
  if (!token) return 'Not set';
  return `${token.substring(0, 10)}...${token.substring(token.length - 5)}`;
});

const componentStatus = ref({});
const apiResult = ref('');
const herosectionComponent = ref(null);
const siteConfigComponent = ref(null);

// Check component registration
onMounted(() => {
  const checkComponent = (name) => {
    try {
      return resolveComponent(name) !== name;
    } catch {
      return false;
    }
  };

  componentStatus.value = {
    'herosection': checkComponent('herosection'),
    'hero-section': checkComponent('hero-section'),
    'hero_section': checkComponent('hero_section'),
    'site-config': checkComponent('site-config'),
    'site_config': checkComponent('site_config'),
    'page': checkComponent('page'),
    'headline': checkComponent('headline')
  };

  // Create test components
  herosectionComponent.value = {
    component: 'herosection',
    headline: [
      {
        component: 'headline',
        text: 'Test Hero Section',
        highlight: 'Test',
        size: 'large',
        color: 'text-blue-600'
      }
    ],
    subheadline: 'This is a test hero section',
    background_image: null
  };

  siteConfigComponent.value = {
    component: 'site-config',
    meta_title: 'Test Site Config',
    meta_description: 'Test site configuration',
    header_logo: null,
    header_light: true,
    footer_headline: [
      {
        component: 'headline',
        text: 'Test Footer Headline',
        highlight: 'Test',
        size: 'small',
        color: 'text-gray-600'
      }
    ],
    footer_light: false
  };
});

// Test Storyblok API
const testAPI = async () => {
  try {
    const storyblokApi = useStoryblokApi();
    if (!storyblokApi) {
      apiResult.value = 'Storyblok API not available';
      return;
    }

    const { data } = await storyblokApi.get('cdn/stories/home', {
      version: 'draft',
      resolve_links: 'url'
    });

    apiResult.value = JSON.stringify(data, null, 2);
  } catch (error) {
    apiResult.value = `Error: ${error.message}\n\nFull error: ${JSON.stringify(error, null, 2)}`;
  }
};
</script> 