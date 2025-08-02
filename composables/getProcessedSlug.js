export default function () {
  return async () => {
    const getSlugFn = getSlug();
    const getLanguageFn = getLanguage();
    
    let slug = await getSlugFn();

    if (Array.isArray(slug) && slug.length > 0) {
      const language = await getLanguageFn(slug);
      /**
       * If a specific language is requested, the first part of the slug (the language code) needs to be removed
       */
      if (language && language !== 'default') {
        slug = slug.slice(1);
      }
      slug = slug.join('/');
    }
    else {
      slug = 'home';
    }
    
    if (slug === '') {
      slug = 'home';
    }

    return slug;
  };
}
