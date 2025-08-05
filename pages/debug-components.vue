<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Component Diagnostic Page</h1>
    
    <div class="space-y-6">
      <!-- Test Hero Section -->
      <div class="bg-blue-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Test Hero Section</h2>
        <div class="border p-4 bg-white">
          <StoryblokComponent :blok="testHeroSection" />
        </div>
      </div>
      
      <!-- Test Site Config -->
      <div class="bg-green-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Test Site Config</h2>
        <div class="border p-4 bg-white">
          <StoryblokComponent :blok="testSiteConfig" />
        </div>
      </div>
      
      <!-- Raw Component Test -->
      <div class="bg-yellow-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Raw Component Test</h2>
        <div class="border p-4 bg-white">
          <HeroSection :blok="testHeroSection" />
        </div>
      </div>
      
      <!-- Component Availability -->
      <div class="bg-red-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Component Availability</h2>
        <div class="space-y-2">
          <div v-for="(status, component) in componentStatus" :key="component">
            <span class="font-mono">{{ component }}:</span>
            <span :class="status ? 'text-green-600' : 'text-red-600'">
              {{ status ? '✅ Available' : '❌ Not Available' }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Test Data -->
      <div class="bg-gray-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Test Data</h2>
        <pre class="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-auto">{{ JSON.stringify({ hero: testHeroSection, siteConfig: testSiteConfig }, null, 2) }}</pre>
      </div>
      
      <!-- Real Storyblok Data Test -->
      <div class="bg-purple-100 p-4 rounded">
        <h2 class="text-xl font-semibold mb-2">Real Storyblok Data Test</h2>
        <div class="border p-4 bg-white">
          <StoryblokComponent :blok="realStoryblokHero" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const componentStatus = ref({});
const testHeroSection = ref({
  component: 'hero-section',
  _uid: 'test-hero-uid',
  headline: [
    {
      component: 'headline',
      _uid: 'test-headline-uid',
      text: 'Test Hero Section',
      highlight: 'Test',
      size: 'large',
      color: 'text-blue-600'
    }
  ],
  subheadline: 'This is a test hero section',
  image: null,
  cta: null
});

const testSiteConfig = ref({
  component: 'site-config',
  _uid: 'test-site-config-uid',
  meta_title: 'Test Site Config',
  meta_description: 'Test site configuration',
  header_logo: null,
  header_light: true,
  footer_headline: [
    {
      component: 'headline',
      _uid: 'test-footer-headline-uid',
      text: 'Test Footer Headline',
      highlight: 'Test',
      size: 'small',
      color: 'text-gray-600'
    }
  ],
  footer_light: false,
  use_custom_colors: false,
  use_custom_fonts: false
});

// Real Storyblok data structure based on your debug output
const realStoryblokHero = ref({
  _uid: "ab36b2ae-a0a9-4ffd-bb8a-793fc7b8eb18",
  text: "With Smart PPC, you only pay for clicks on your ads — and I make sure those clicks come from people who want what you offer, not just random traffic.",
  image: {
    id: 76102491820422,
    alt: "",
    name: "",
    focus: "",
    title: "",
    source: "",
    filename: "https://a.storyblok.com/f/286007590720437/826x551/8ff5de34ae/google-microsoft-certified-bachelor-s-in-marketing-agency-level-experience-in-house-ecommerce-experience-bilingual-english-spanish-custom-campaigns-direct-local-support-9.png",
    copyright: "",
    fieldtype: "asset",
    meta_data: {},
    is_external_url: false
  },
  layout: "stacked",
  buttons: [],
  eyebrow: "Click by Val",
  headline: [
    {
      _uid: "53d53a02-4676-4963-8d4c-208b12659cd7",
      text: "Strategic Google & Microsoft PPC Services",
      component: "Headline",
      highlight: "",
      _editable: "<!--#storyblok#{\"name\": \"Headline\", \"space\": \"286007590720437\", \"uid\": \"53d53a02-4676-4963-8d4c-208b12659cd7\", \"id\": \"74648503536705\"}-->"
    },
    {
      _uid: "71529c7a-a93c-42df-ae9a-c043e5c52fd4",
      text: "🚀 Smarter ads. More customers. No wasted budget. ",
      component: "Headline",
      highlight: "",
      _editable: "<!--#storyblok#{\"name\": \"Headline\", \"space\": \"286007590720437\", \"uid\": \"71529c7a-a93c-42df-ae9a-c043e5c52fd4\", \"id\": \"74648503536705\"}-->"
    }
  ],
  component: "hero-section",
  button_text: "",
  text_alignment: "left",
  background_color: "primary-background",
  image_decoration: false,
  secondary_background_color: "primary-background",
  preserve_image_aspect_ratio: false,
  _editable: "<!--#storyblok#{\"name\": \"hero-section\", \"space\": \"286007590720437\", \"uid\": \"ab36b2ae-a0a9-4ffd-bb8a-793fc7b8eb18\", \"id\": \"74648503536705\"}-->"
});

onMounted(() => {
  const checkComponent = (name) => {
    try {
      return resolveComponent(name) !== name;
    } catch {
      return false;
    }
  };

  componentStatus.value = {
    'hero-section': checkComponent('hero-section'),
    'site-config': checkComponent('site-config'),
    'HeroSection': checkComponent('HeroSection'),
    'SiteConfig': checkComponent('SiteConfig'),
    'headline': checkComponent('headline'),
    'Headline': checkComponent('Headline')
  };
});
</script> 