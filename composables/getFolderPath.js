export default function () {
  return async () => {
    const getSlugFn = getSlug();
    const getLanguageFn = getLanguage();
    
    let slug = await getSlugFn();
    let folderPath = '';

    if (Array.isArray(slug) && slug.length > 0) {
      const language = await getLanguageFn(slug);

      // Remove language prefix if present
      if (language && language !== 'default') {
        slug = slug.slice(1);
      }

      // Remove the last segment (the actual story slug) if there are multiple segments
      if (slug.length > 1) {
        slug.pop();
      }

      folderPath = slug.join('/');
    }
    else {
      // During static generation or when no slug is available
      // Don't log warning as this is expected behavior
    }

    return folderPath;
  };
}
