export default function () {
  return () => {
    // Only call useRoute when we're in a proper context
    if (process.client) {
      const route = useRoute();
      if (route.query._storyblok_published !== undefined) {
        return 'published';
      }
      else {
        return 'draft';
      }
    }
    
    // During SSR or when not in client context, return draft version
    return 'draft';
  };
}
