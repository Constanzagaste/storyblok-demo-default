import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  // Manually register Storyblok components
  const storyblokComponents = import.meta.glob('~/storyblok/*.vue', { eager: true });

  // Create a mapping of component names to handle various naming conventions
  const componentMap = {
    // Original file names
    'Page': 'Page',
    'Herosection': 'Herosection',
    'Banner': 'Banner',
    'TextSection': 'TextSection',
    'GridSection': 'GridSection',
    'ImageCard': 'ImageCard',
    'ImageTextSection': 'ImageTextSection',
    'ContactFormSection': 'ContactFormSection',
    'FaqSection': 'FaqSection',
    'TestimonialsSection': 'TestimonialsSection',
    'NewsletterFormSection': 'NewsletterFormSection',
    'TwoColumnsSection': 'TwoColumnsSection',
    'TabbedContentSection': 'TabbedContentSection',
    'TabbedContentEntry': 'TabbedContentEntry',
    'ProductsSection': 'ProductsSection',
    'FeaturedArticlesSection': 'FeaturedArticlesSection',
    'LatestArticlesSection': 'LatestArticlesSection',
    'PersonalizedSection': 'PersonalizedSection',
    'LogoSection': 'LogoSection',
    'ArticleOverviewPage': 'ArticleOverviewPage',
    'ArticlePage': 'ArticlePage',
    'Category': 'Category',
    'DefaultPage': 'DefaultPage',
    'GridCard': 'GridCard',
    'PriceCard': 'PriceCard',
    'RichtextYoutube': 'RichtextYoutube',
    'SiteConfig': 'SiteConfig',
    'BannerReference': 'BannerReference',
    
    // Lowercase versions for Storyblok
    'page': 'Page',
    'herosection': 'Herosection',
    'banner': 'Banner',
    'textsection': 'TextSection',
    'gridsection': 'GridSection',
    'imagecardsection': 'ImageCard',
    'imagetextsection': 'ImageTextSection',
    'contactformsection': 'ContactFormSection',
    'faqsection': 'FaqSection',
    'testimonialssection': 'TestimonialsSection',
    'newsletterformsection': 'NewsletterFormSection',
    'twocolumnssection': 'TwoColumnsSection',
    'tabbedcontentsection': 'TabbedContentSection',
    'tabbedcontententry': 'TabbedContentEntry',
    'productsection': 'ProductsSection',
    'featuredarticlessection': 'FeaturedArticlesSection',
    'latestarticlessection': 'LatestArticlesSection',
    'personalizedsection': 'PersonalizedSection',
    'logosection': 'LogoSection',
    'articleoverviewpage': 'ArticleOverviewPage',
    'articlepage': 'ArticlePage',
    'category': 'Category',
    'defaultpage': 'DefaultPage',
    'gridcard': 'GridCard',
    'pricecard': 'PriceCard',
    'richtextyoutube': 'RichtextYoutube',
    'siteconfig': 'SiteConfig',
    'bannerreference': 'BannerReference',
    
    // Handle space-separated names from Storyblok
    'Tabbed Content Section': 'TabbedContentSection',
    'Tabbed Content Entry': 'TabbedContentEntry',
    'Text Section': 'TextSection',
    'Grid Section': 'GridSection',
    'Image Card': 'ImageCard',
    'Image Text Section': 'ImageTextSection',
    'Contact Form Section': 'ContactFormSection',
    'FAQ Section': 'FaqSection',
    'Testimonials Section': 'TestimonialsSection',
    'Newsletter Form Section': 'NewsletterFormSection',
    'Two Columns Section': 'TwoColumnsSection',
    'Products Section': 'ProductsSection',
    'Featured Articles Section': 'FeaturedArticlesSection',
    'Latest Articles Section': 'LatestArticlesSection',
    'Personalized Section': 'PersonalizedSection',
    'Logo Section': 'LogoSection',
    'Article Overview Page': 'ArticleOverviewPage',
    'Article Page': 'ArticlePage',
    'Default Page': 'DefaultPage',
    'Grid Card': 'GridCard',
    'Price Card': 'PriceCard',
    'Richtext Youtube': 'RichtextYoutube',
    'Site Config': 'SiteConfig',
    'Banner Reference': 'BannerReference',
  };

  // Register all components with their various name mappings
  Object.entries(componentMap).forEach(([storyblokName, fileName]) => {
    const componentPath = `/storyblok/${fileName}.vue`;
    const component = storyblokComponents[componentPath]?.default;
    
    if (component) {
      // Only register if not already registered to avoid duplicates
      if (!nuxtApp.vueApp._context.components[storyblokName]) {
        nuxtApp.vueApp.component(storyblokName, component);
      }
    }
  });
});
