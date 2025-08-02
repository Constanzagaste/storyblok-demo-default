export default async function (slug) {
  let language = null;
  const languageCodes = ref([]);

  try {
    const storyblokApi = useStoryblokApi();

    if (!storyblokApi) {
      console.warn('Storyblok API not available. Using default language.');
      return 'default';
    }

    const { data } = await storyblokApi.get('cdn/spaces/me');
    if (data?.space?.language_codes) {
      languageCodes.value = data.space.language_codes;

      // Check if the slug's first part matches a language code
      if (languageCodes.value.includes(slug[0])) {
        language = slug[0];
      }
    }
    else {
      console.warn('No language codes found in space:', data);
    }
  }
  catch (err) {
    console.error('Error fetching language codes from Storyblok:', err);
    // Return default language on error
    return 'default';
  }

  return language || 'default'; // fallback language
}
