<script setup>
const props = defineProps({ blok: Object, uuid: String });

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
      filter_query: {
        categories: {
          in_array: props.uuid,
        },
      },
      language,
      fallback_lang: 'default',
      resolve_relations: 'article-page.categories',
    });

    articles.value = data.stories;
  } catch (error) {
    console.error('Error fetching category articles:', error);
  }
});

const gridClasses = computed(() => getGridClasses());
</script>

<template>
  <main v-editable="blok" class="container py-12 md:py-16">
    <H1Headline
      v-if="blok.headline"
    >
      {{ blok.headline }}
    </H1Headline>
    <div
      :class="gridClasses"
    >
      <ArticleCardVertical
        v-for="article in articles"
        :key="article.uuid"
        :article="article.content"
        :slug="article.full_slug"
      />
    </div>
  </main>
</template>
