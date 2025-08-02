export default function () {
  return () => {
    // Only call useRoute when we're in a proper context
    if (process.client) {
      const route = useRoute();
      const releaseId = route.query?._storyblok_release || 0;
      return releaseId;
    }
    
    // During SSR or when not in client context, return default value
    return 0;
  };
}
