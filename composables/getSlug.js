export default function () {
  return () => {
    // Only call useRoute when we're in a proper context
    if (process.client) {
      const route = useRoute();

      let slug = [];
      if (route.query.path) {
        /**
         * Check if the path URL parameter is provided.
         * Note: This is needed specifically for demo spaces created on the fly. Not needed in a usual project.
         */
        slug = route.query.path?.split('/');
      }
      else {
        /**
         * If there is no path parameter provided, retrieve the slug.
         */
        if (route.params?.slug) {
          slug = route.params.slug.slice();
        }
      }

      return slug;
    }
    
    // During SSR or when not in client context, return empty array
    return [];
  };
}
