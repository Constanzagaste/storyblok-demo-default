<script setup>
const slug = await getSlug();
const processedSlug = await getProcessedSlug();
const language = await getLanguage(slug);
const releaseId = await getReleaseId();
const resolveRelations = [
  'banner-reference.banners',
  'featured-articles-section.articles',
  'article-page.categories',
  'article-page.author',
  'article-page.call_to_action',
  'testimonials-section.testimonials',
];
const story = ref(null);

console.log('Page setup - slug:', slug, 'processedSlug:', processedSlug);

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
      version: getVersion(),
      language,
      fallback_lang: 'default',
      resolve_relations: resolveRelations,
      resolve_links: 'url',
      from_release: releaseId,
    };

    console.log('Fetching story with params:', apiParams);

    const { customParent } = useRuntimeConfig().public;

    try {
      const { data } = await storyblokApi.get(
        `cdn/stories/${processedSlug}`,
        apiParams,
      );
      story.value = data.story;
      console.log('Story loaded successfully:', story.value?.content?.component);
      console.log('Story content:', story.value?.content);
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
                text: '<h1>Error Loading Page</h1><p>There was an error loading the page content. Please check your Storyblok configuration.</p>',
              },
            ],
          },
        };
      }
    }

    onMounted(() => {
      if (story.value && story.value.id) {
        useStoryblokBridge(story.value.id, evStory => (story.value = evStory), {
          resolveRelations,
          customParent,
          preventClicks: true,
        });
      }
    });
  }
}
catch (error) {
  console.error('Critical error in page setup:', error);
  // Create a fallback story to prevent null errors
  story.value = {
    id: 'fallback-story',
    uuid: 'fallback-uuid',
    content: {
      component: 'default-page',
      meta_title: 'Application Error',
      meta_description: 'There was a critical error in the application.',
      body: [
        {
          component: 'text-section',
          text: '<h1>Application Error</h1><p>There was a critical error in the application. Please check your configuration and try again.</p>',
        },
      ],
    },
  };
}

const viewingSiteConfig = ref(
  story.value?.content?.component === 'site-config',
);
const _viewingSiteConfigState = useState(
  'viewingSiteConfig',
  () => viewingSiteConfig.value,
);

useHead({
  title: story.value?.content?.meta_title ?? 'Brand New Day',
  meta: [
    { name: 'description', content: story.value?.content?.meta_title ?? 'A Demo Day for Your New Storyblok Project.' },
  ],
});
</script>

<template>
  <div>
    <div v-if="story && story.content && !viewingSiteConfig">
      <StoryblokComponent :blok="story.content" :uuid="story.uuid" />
    </div>
    <div v-else-if="!story" class="flex min-h-screen items-center justify-center">
      <div class="text-center">
        <h1 class="mb-4 text-2xl font-bold">Loading...</h1>
        <p class="text-gray-600">Please wait while we load the page content.</p>
      </div>
    </div>
    <div v-else class="flex min-h-screen items-center justify-center">
      <div class="text-center">
        <h1 class="mb-4 text-2xl font-bold">Debug Info</h1>
        <p class="text-gray-600">Story: {{ story ? 'Loaded' : 'Not loaded' }}</p>
        <p class="text-gray-600">Component: {{ story?.content?.component }}</p>
        <p class="text-gray-600">Viewing Site Config: {{ viewingSiteConfig }}</p>
        <p class="text-gray-600">Story ID: {{ story?.id }}</p>
        <p class="text-gray-600">Story UUID: {{ story?.uuid }}</p>
      </div>
    </div>
  </div>
</template>
