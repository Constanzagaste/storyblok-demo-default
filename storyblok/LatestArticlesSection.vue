<script setup>
defineProps({ blok: Object, index: Number });

const articles = ref(null);

onMounted(async () => {
  const { slug } = useRoute().params;
  let language = 'default';

  if (slug) {
    const getLanguageFn = getLanguage();
    language = await getLanguageFn(slug);
  }

  const storyblokApi = useStoryblokApi();
  const getVersionFn = getVersion();
  
  try {
    const { data } = await storyblokApi.get(`cdn/stories/`, {
      version: getVersionFn(),
      starts_with: 'articles',
      language,
      fallback_lang: 'default',
      resolve_relations: 'article-page.categories',
      is_startpage: false,
      per_page: 6,
    });

    articles.value = data.stories;
  } catch (error) {
    console.error('Error fetching latest articles:', error);
  }
});
</script>

<template>
  <section
    v-editable="blok"
    class="page-section latest-articles-section bg-white"
  >
    <div class="container">
      <Headline v-if="blok.headline" :headline="blok.headline" :index="index" class="text-center" />
      <Lead v-if="blok.lead" class="text-center">
        {{ blok.lead }}
      </Lead>
      <div v-if="articles" class="mt-24 grid gap-x-24 gap-y-12 lg:grid-cols-2">
        <ArticleCardHorizontal
          v-for="article in articles"
          :key="article.uuid"
          :article="article.content"
          :slug="article.full_slug"
        />
      </div>
    </div>
  </section>
</template>
