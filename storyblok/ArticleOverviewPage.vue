<script setup>
defineProps({ blok: Object });

const searchTerm = ref('');
const checkedCategory = ref('');
const loading = ref(true);
const articles = ref(null);
const categories = ref(null);

const filterQuery = computed(() => {
  const query = {};

  if (checkedCategory.value) {
    query.categories = {
      in: checkedCategory.value,
    };
  }

  return query;
});

onMounted(async () => {
  const { slug } = useRoute().params;
  let language = 'default';

  if (slug) {
    const getLanguageFn = getLanguage();
    language = await getLanguageFn(slug);
  }

  const storyblokApi = useStoryblokApi();
  const getVersionFn = getVersion();

  const fetchArticles = async () => {
    loading.value = true;
    articles.value = null;
    try {
      const { data } = await storyblokApi.get('cdn/stories/', {
        version: getVersionFn(),
        starts_with: 'articles',
        language,
        fallback_lang: 'default',
        search_term: searchTerm.value,
        filter_query: filterQuery.value,
        resolve_relations: 'article-page.categories',
      });
      articles.value = data.stories.filter(story => story.is_startpage !== true);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
    loading.value = false;
  };

  const getCategories = async () => {
    try {
      const { data } = await storyblokApi.get('cdn/stories/', {
        version: getVersionFn(),
        starts_with: 'categories',
      });
      categories.value = data.stories.filter(story => story.is_startpage !== true);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  await fetchArticles();
  await getCategories();

  const resetCategories = () => {
    checkedCategory.value = '';
    fetchArticles();
  };

  watch(searchTerm, () => {
    fetchArticles();
  });

  watch(checkedCategory, () => {
    fetchArticles();
  });
});

const gridClasses = computed(() => getGridClasses());
</script>

<template>
  <section v-editable="blok" class="container">
    <header>
      <H1Headline
        v-if="blok.headline"
      >
        {{ blok.headline }}
      </H1Headline>
      <nav>
        <div class="mb-12 flex justify-center">
          <label for="search" class="sr-only">Search</label>
          <input
            id="search"
            v-model="searchTerm"
            type="search"
            name="search"
            placeholder="Search for anything"
            class="border-dark rounded-lg border-2 px-12 py-4 text-xl focus:outline-none"
            @keypress.enter="fetchArticles()"
          />
        </div>
        <div class="border-medium mb-12 flex flex-col rounded-lg border p-1 lg:flex-row">
          <button
            class="w-full cursor-pointer rounded-md px-6 py-3 text-center text-lg"
            :class=" !checkedCategory ? 'bg-primary-dark text-white' : 'text-primary-dark'"
            @click.prevent="resetCategories()"
          >
            All
          </button>
          <label
            v-for="category in categories"
            :key="category.uuid"
            :for="category.uuid"
            class="w-full cursor-pointer rounded-md px-6 py-3 text-center text-lg text-primary-dark"
            :class=" checkedCategory === category.uuid ? 'bg-primary-dark text-white' : 'text-primary-dark'"
          >
            <input
              :id="category.uuid"
              v-model="checkedCategory"
              type="radio"
              :name="category.uuid"
              :value="category.uuid"
              class="sr-only"
            />
            <span>{{ category.name }}</span>
          </label>
        </div>
      </nav>
    </header>
    <main class="pb-24">
      <section
        v-if="!loading && articles.length"
        :class="gridClasses"
      >
        <ArticleCardVertical
          v-for="article in articles"
          :key="article.uuid"
          :article="article.content"
          :slug="article.full_slug"
        />
      </section>

      <section v-else-if="!loading && !articles.length">
        Unfortunately, no articles matched your criteria.
      </section>
    </main>
  </section>
</template>
