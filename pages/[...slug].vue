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

      try {
        const { data } = await storyblokApi.get(
          `cdn/stories/${processedSlug}`,
          apiParams,
        );
        story.value = data.story;
      }
      catch (error) {
        console.error('Error fetching story:', error);
        if (error.status === 404) {
          try {
            const { data } = await storyblokApi.get('cdn/stories/error-404', apiParams);
            story.value = data.story;
          }
          catch (fallbackError) {
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
        }
        else {
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
  catch (error) {
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
