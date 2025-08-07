<script setup>
// Fetch the home story for content
const story = ref(null);
const siteConfig = ref(null);

onMounted(async () => {
  try {
    const storyblokApi = useStoryblokApi();
    
    if (storyblokApi) {
      // Fetch the home story
      const { data } = await storyblokApi.get('cdn/stories/home', {
        version: 'published',
        resolve_links: 'url'
      });
      
      if (data && data.story) {
        story.value = data.story;
        
        // Find the first blok where component === "site-config" and store it separately
        if (story.value.content.body) {
          const siteConfigBlok = story.value.content.body.find(blok => blok.component === 'site-config');
          if (siteConfigBlok) {
            siteConfig.value = siteConfigBlok;
            // Remove the site-config blok from the body so it doesn't render as content
            story.value.content.body = story.value.content.body.filter(blok => blok.component !== 'site-config');
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching home story:', error);
  }
});
</script>

<template>
  <div>
    <Header :config="siteConfig" />
    <!-- Render the actual page content -->
    <div v-if="story && story.content && story.content.body">
      <ComponentCheck
        v-for="(currentBlok, index) in story.content.body"
        :key="currentBlok._uid"
        :blok="currentBlok"
        :index="index"
      />
    </div>
    <Footer :config="siteConfig" />
  </div>
</template>