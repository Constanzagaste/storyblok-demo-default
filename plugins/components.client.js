import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  // Manually register Storyblok components
  const storyblokComponents = import.meta.glob('~/storyblok/*.vue', { eager: true });

  Object.entries(storyblokComponents).forEach(([path, component]) => {
    const componentName = path.split('/').pop().replace('.vue', '');
    
    // Register with original name
    nuxtApp.vueApp.component(componentName, component.default);
    
    // Also register with lowercase name for Storyblok compatibility
    const lowercaseName = componentName.toLowerCase();
    if (lowercaseName !== componentName) {
      nuxtApp.vueApp.component(lowercaseName, component.default);
    }
  });

  // Explicitly register common Storyblok component names
  const commonComponents = {
    'page': storyblokComponents['/storyblok/Page.vue']?.default,
    'herosection': storyblokComponents['/storyblok/Herosection.vue']?.default,
    'banner': storyblokComponents['/storyblok/Banner.vue']?.default,
    'textsection': storyblokComponents['/storyblok/TextSection.vue']?.default,
    'gridsection': storyblokComponents['/storyblok/GridSection.vue']?.default,
    'imagecardsection': storyblokComponents['/storyblok/ImageCard.vue']?.default,
    'imagetextsection': storyblokComponents['/storyblok/ImageTextSection.vue']?.default,
    'contactformsection': storyblokComponents['/storyblok/ContactFormSection.vue']?.default,
    'faqsection': storyblokComponents['/storyblok/FaqSection.vue']?.default,
    'testimonialssection': storyblokComponents['/storyblok/TestimonialsSection.vue']?.default,
    'newsletterformsection': storyblokComponents['/storyblok/NewsletterFormSection.vue']?.default,
    'twocolumnssection': storyblokComponents['/storyblok/TwoColumnsSection.vue']?.default,
    'tabbedcontentsection': storyblokComponents['/storyblok/TabbedContentSection.vue']?.default,
    'productsection': storyblokComponents['/storyblok/ProductsSection.vue']?.default,
    'featuredarticlessection': storyblokComponents['/storyblok/FeaturedArticlesSection.vue']?.default,
    'latestarticlessection': storyblokComponents['/storyblok/LatestArticlesSection.vue']?.default,
    'personalizedsection': storyblokComponents['/storyblok/PersonalizedSection.vue']?.default,
    'logosection': storyblokComponents['/storyblok/LogoSection.vue']?.default,
  };

  Object.entries(commonComponents).forEach(([name, component]) => {
    if (component) {
      nuxtApp.vueApp.component(name, component);
    }
  });
});
