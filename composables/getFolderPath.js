export default async function () {
  let slug = await getSlug();
  let folderPath = '';

  if (Array.isArray(slug)) {
    const language = await getLanguage(slug);

    // Remove language prefix if present
    if (language) {
      slug = slug.slice(1);
    }

    // Remove the last segment (the actual story slug)
    slug.pop();

    folderPath = slug.join('/');
  }
  else {
    console.warn('⚠️ getSlug() did not return an array:', slug);
  }

  return folderPath;
}
