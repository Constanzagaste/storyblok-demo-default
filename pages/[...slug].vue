<script setup>
const getSlugFn = getSlug();
const getProcessedSlugFn = getProcessedSlug();
const getLanguageFn = getLanguage();
const getReleaseIdFn = getReleaseId();
const getVersionFn = getVersion();

const slug = await getSlugFn();
const processedSlug = await getProcessedSlugFn();
const language = await getLanguageFn(slug);
const releaseId = await getReleaseIdFn();

const resolveRelations = [
  'banner-reference.banners',
  'featured-articles-section.articles',
  'article-page.categories',
  'article-page.author',
  'article-page.call_to_action',
  'testimonials-section.testimonials',
];
const story = ref(null);

onMounted(async () => {
  try {
    const storyblokApi = useStoryblokApi();

    if (!storyblokApi) {
      console.warn('Storyblok API not available. Using fallback story.');
      // Create a fallback story to prevent null errors
      story.value = {
        id: 'fallback-story',
        uuid: 'fallback-uuid',
        content: {
          component: 'default-page',
          meta_title: 'Storyblok Not Configured',
          meta_description: 'Please configure your Storyblok token to view content.',
          body: [
            {
              component: 'text-section',
              text: '<h1>Storyblok Not Configured</h1><p>Please set your STORYBLOK_TOKEN in the .env file to view content.</p>',
            },
          ],
        },
      };
    }
    else {
      const apiParams = {
        version: getVersionFn(),
        language,
        fallback_lang: 'default',
        resolve_relations: resolveRelations,
        resolve_links: 'url',
        from_release: releaseId,
      };

      const { customParent } = useRuntimeConfig().public;

             console.log('🔍 Fetching story with slug:', processedSlug);
       console.log('🔍 API Token available:', !!process.env.STORYBLOK_TOKEN);
       console.log('🔍 API Token length:', process.env.STORYBLOK_TOKEN?.length || 0);

       // Special handling for site-config route
       if (processedSlug === 'site-config') {
        console.log('🔧 Detected site-config route, fetching site configuration...');
        try {
          const { data } = await storyblokApi.get(
            'cdn/stories/site-config',
            apiParams,
          );
                     if (data && data.story) {
             story.value = data.story;
             console.log('✅ Site config fetched successfully:', data.story?.content?.component);
             console.log('🔍 Site config content:', data.story?.content);
             console.log('🔍 Full API response:', JSON.stringify(data, null, 2));
           } else {
            console.warn('⚠️ Site config story not found, creating fallback');
            story.value = {
              id: 'site-config-fallback',
              uuid: 'site-config-uuid',
              content: {
                component: 'site-config',
                meta_title: 'Site Configuration',
                meta_description: 'Site configuration settings',
                // Add any default site config properties here
              },
            };
          }
        } catch (siteConfigError) {
          console.warn('⚠️ Error fetching site config, creating fallback:', siteConfigError.message);
          console.warn('⚠️ Full error:', siteConfigError);
          story.value = {
            id: 'site-config-fallback',
            uuid: 'site-config-uuid',
            content: {
              component: 'site-config',
              meta_title: 'Site Configuration',
              meta_description: 'Site configuration settings',
              // Add any default site config properties here
            },
          };
        }
      } else {
        try {
          const { data } = await storyblokApi.get(
            `cdn/stories/${processedSlug}`,
            apiParams,
          );
                     story.value = data.story;
           console.log('✅ Story fetched successfully:', data.story?.content?.component);
           console.log('🔍 Story content structure:', JSON.stringify(data.story?.content, null, 2));
           console.log('🔍 Story body components:', data.story?.content?.body?.map(item => item.component) || []);
        } catch (error) {
          console.error('Error fetching story:', error);
          if (error.status === 404) {
            try {
              const { data } = await storyblokApi.get('cdn/stories/error-404', apiParams);
              story.value = data.story;
            } catch (fallbackError) {
              console.error('Error fetching 404 page:', fallbackError);
              // Create a fallback story to prevent null errors
              story.value = {
                id: 'fallback-story',
                uuid: 'fallback-uuid',
                content: {
                  component: 'default-page',
                  meta_title: 'Page Not Found',
                  meta_description: 'The page you are looking for could not be found.',
                  body: [
                    {
                      component: 'text-section',
                      text: '<h1>Page Not Found</h1><p>The page you are looking for could not be found.</p>',
                    },
                  ],
                },
              };
            }
          } else {
            console.error('Error fetching story:', error);
            // Create a fallback story to prevent null errors
            story.value = {
              id: 'fallback-story',
              uuid: 'fallback-uuid',
              content: {
                component: 'default-page',
                meta_title: 'Error Loading Page',
                meta_description: 'There was an error loading the page content.',
                body: [
                  {
                    component: 'text-section',
                    text: '<h1>Error Loading Page</h1><p>There was an error loading the page content.</p>',
                  },
                ],
              },
            };
          }
        }
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    // Create a fallback story to prevent null errors
    story.value = {
      id: 'fallback-story',
      uuid: 'fallback-uuid',
      content: {
        component: 'default-page',
        meta_title: 'Unexpected Error',
        meta_description: 'An unexpected error occurred.',
        body: [
          {
            component: 'text-section',
            text: '<h1>Unexpected Error</h1><p>An unexpected error occurred.</p>',
          },
        ],
      },
    };
  }
});

const viewingSiteConfig = ref(false);
const _viewingSiteConfigState = useState(
  'viewingSiteConfig',
  () => viewingSiteConfig.value,
);

// Update viewingSiteConfig when story changes
watch(() => story.value?.content?.component, (newComponent) => {
  if (newComponent) {
    viewingSiteConfig.value = newComponent === 'site-config';
    _viewingSiteConfigState.value = viewingSiteConfig.value;
  }
}, { immediate: true });

// Ensure components are available
onMounted(() => {
  // Check if components are registered
  const checkComponent = (name) => {
    try {
      return resolveComponent(name) !== name;
    } catch {
      return false;
    }
  };
  
  // Log component availability
  console.log('🔍 Checking component availability:');
  console.log('Page component:', checkComponent('page'));
  console.log('Herosection component:', checkComponent('herosection'));
  console.log('SiteConfig component:', checkComponent('site-config'));
  
  // If critical components are missing, try to register them manually
  if (!checkComponent('herosection')) {
    console.log('⚠️ Herosection component not found, attempting manual registration...');
    try {
      const HerosectionComponent = import.meta.glob('~/storyblok/Herosection.vue', { eager: true });
      const componentPath = Object.keys(HerosectionComponent)[0];
      if (componentPath) {
        const component = HerosectionComponent[componentPath].default;
        getCurrentInstance()?.appContext.app.component('herosection', component);
        getCurrentInstance()?.appContext.app.component('hero-section', component);
        getCurrentInstance()?.appContext.app.component('hero_section', component);
        getCurrentInstance()?.appContext.app.component('hero', component);
        console.log('✅ Herosection manually registered');
      }
    } catch (error) {
      console.warn('⚠️ Failed to manually register Herosection:', error);
    }
  }
  
  // Also check for the exact Storyblok component names
  if (!checkComponent('hero-section')) {
    console.log('⚠️ hero-section component not found, attempting manual registration...');
    try {
      const HerosectionComponent = import.meta.glob('~/storyblok/Herosection.vue', { eager: true });
      const componentPath = Object.keys(HerosectionComponent)[0];
      if (componentPath) {
        const component = HerosectionComponent[componentPath].default;
        getCurrentInstance()?.appContext.app.component('hero-section', component);
        console.log('✅ hero-section manually registered');
      }
    } catch (error) {
      console.warn('⚠️ Failed to manually register hero-section:', error);
    }
  }
  
  if (!checkComponent('site-config')) {
    console.log('⚠️ SiteConfig component not found, attempting manual registration...');
    try {
      const SiteConfigComponent = import.meta.glob('~/storyblok/SiteConfig.vue', { eager: true });
      const componentPath = Object.keys(SiteConfigComponent)[0];
      if (componentPath) {
        const component = SiteConfigComponent[componentPath].default;
        getCurrentInstance()?.appContext.app.component('site-config', component);
        getCurrentInstance()?.appContext.app.component('site_config', component);
        console.log('✅ SiteConfig manually registered');
      }
    } catch (error) {
      console.warn('⚠️ Failed to manually register SiteConfig:', error);
    }
  }
  
  // Log all available components for debugging
  const nuxtApp = useNuxtApp();
  console.log('🔍 All registered components:', Object.keys(nuxtApp.vueApp._context.components));
  
  // Emergency component registration if normal registration failed
  setTimeout(() => {
    if (process.client && window.__storyblokComponents) {
      console.log('🚨 Emergency component registration from page...');
      
      const components = window.__storyblokComponents;
      const emergencyMappings = [
        { storyblokName: 'hero-section', componentName: 'HeroSection' },
        { storyblokName: 'hero_section', componentName: 'HeroSection' },
        { storyblokName: 'hero', componentName: 'HeroSection' },
        { storyblokName: 'herosection', componentName: 'HeroSection' },
        { storyblokName: 'site-config', componentName: 'SiteConfig' },
        { storyblokName: 'site_config', componentName: 'SiteConfig' },
        { storyblokName: 'page', componentName: 'Page' },
        { storyblokName: 'headline', componentName: 'Headline' },
        { storyblokName: 'Headline', componentName: 'Headline' }
      ];
      
      emergencyMappings.forEach(({ storyblokName, componentName }) => {
        const component = components[componentName];
        if (component && !checkComponent(storyblokName)) {
          try {
            nuxtApp.vueApp.component(storyblokName, component);
            console.log(`🚨 Emergency - Registered ${storyblokName} -> ${componentName}`);
          } catch (error) {
            console.warn(`⚠️ Emergency - Failed to register ${storyblokName}:`, error);
          }
        }
      });
    }
  }, 3000);
});

useHead({
  title: story.value?.content?.meta_title ?? 'Brand New Day',
  meta: [
    { name: 'description', content: story.value?.content?.meta_title ?? 'A Demo Day for Your New Storyblok Project.' },
  ],
});
</script>

<template>
  <div>
    <div v-if="story && story.content">
      <StoryblokComponent :blok="story.content" :uuid="story.uuid" />
    </div>
    <div v-else-if="!story" class="flex min-h-screen items-center justify-center">
      <div class="text-center">
        <h1 class="mb-4 text-2xl font-bold">Loading...</h1>
        <p class="text-gray-600">Please wait while we load the page content.</p>
      </div>
    </div>
  </div>
</template>
