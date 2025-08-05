import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('🔧 Starting Storyblok component registration...');
  
  // Import all Storyblok components with different patterns
  const storyblokComponents = import.meta.glob('~/storyblok/*.vue', { eager: true });
  const storyblokComponentsAlt = import.meta.glob('/storyblok/*.vue', { eager: true });
  const storyblokComponentsAlt2 = import.meta.glob('./storyblok/*.vue', { eager: true });
  const storyblokComponentsAlt3 = import.meta.glob('../storyblok/*.vue', { eager: true });
  const storyblokComponentsAlt4 = import.meta.glob('../../storyblok/*.vue', { eager: true });
  
  // Merge all component sources
  const allComponents = { 
    ...storyblokComponents, 
    ...storyblokComponentsAlt, 
    ...storyblokComponentsAlt2,
    ...storyblokComponentsAlt3,
    ...storyblokComponentsAlt4
  };

  console.log('📁 Available component paths:', Object.keys(allComponents));
  
  // Component name mappings for Storyblok
  const componentMap = {
    // Page components
    'page': 'Page',
    'Page': 'Page',
    'default-page': 'DefaultPage',
    'DefaultPage': 'DefaultPage',
    'article-page': 'ArticlePage',
    'ArticlePage': 'ArticlePage',
    'article-overview-page': 'ArticleOverviewPage',
    'ArticleOverviewPage': 'ArticleOverviewPage',
    
    // Section components
    'herosection': 'Herosection',
    'Herosection': 'Herosection',
    'hero-section': 'Herosection',
    'hero_section': 'Herosection',
    'Hero Section': 'Herosection',
    'Hero': 'Herosection',
    'hero': 'Herosection',
    'HeroSection': 'Herosection',
    'herosection': 'Herosection',
    
    'text-section': 'TextSection',
    'TextSection': 'TextSection',
    'Text Section': 'TextSection',
    
    'grid-section': 'GridSection',
    'GridSection': 'GridSection',
    'Grid Section': 'GridSection',
    
    'image-text-section': 'ImageTextSection',
    'ImageTextSection': 'ImageTextSection',
    'Image Text Section': 'ImageTextSection',
    
    'contact-form-section': 'ContactFormSection',
    'ContactFormSection': 'ContactFormSection',
    'Contact Form Section': 'ContactFormSection',
    
    'faq-section': 'FaqSection',
    'FaqSection': 'FaqSection',
    'FAQ Section': 'FaqSection',
    
    'testimonials-section': 'TestimonialsSection',
    'TestimonialsSection': 'TestimonialsSection',
    'Testimonials Section': 'TestimonialsSection',
    
    'newsletter-form-section': 'NewsletterFormSection',
    'NewsletterFormSection': 'NewsletterFormSection',
    'Newsletter Form Section': 'NewsletterFormSection',
    
    'two-columns-section': 'TwoColumnsSection',
    'TwoColumnsSection': 'TwoColumnsSection',
    'Two Columns Section': 'TwoColumnsSection',
    
    'tabbed-content-section': 'TabbedContentSection',
    'TabbedContentSection': 'TabbedContentSection',
    'Tabbed Content Section': 'TabbedContentSection',
    
    'products-section': 'ProductsSection',
    'ProductsSection': 'ProductsSection',
    'Products Section': 'ProductsSection',
    
    'featured-articles-section': 'FeaturedArticlesSection',
    'FeaturedArticlesSection': 'FeaturedArticlesSection',
    'Featured Articles Section': 'FeaturedArticlesSection',
    
    'latest-articles-section': 'LatestArticlesSection',
    'LatestArticlesSection': 'LatestArticlesSection',
    'Latest Articles Section': 'LatestArticlesSection',
    
    'personalized-section': 'PersonalizedSection',
    'PersonalizedSection': 'PersonalizedSection',
    'Personalized Section': 'PersonalizedSection',
    
    'logo-section': 'LogoSection',
    'LogoSection': 'LogoSection',
    'Logo Section': 'LogoSection',
    
    // Card components
    'image-card': 'ImageCard',
    'ImageCard': 'ImageCard',
    'Image Card': 'ImageCard',
    
    'grid-card': 'GridCard',
    'GridCard': 'GridCard',
    'Grid Card': 'GridCard',
    
    'price-card': 'PriceCard',
    'PriceCard': 'PriceCard',
    'Price Card': 'PriceCard',
    
    // Other components
    'banner': 'Banner',
    'Banner': 'Banner',
    
    'banner-reference': 'BannerReference',
    'BannerReference': 'BannerReference',
    'Banner Reference': 'BannerReference',
    
    'category': 'Category',
    'Category': 'Category',
    
    'tabbed-content-entry': 'TabbedContentEntry',
    'TabbedContentEntry': 'TabbedContentEntry',
    'Tabbed Content Entry': 'TabbedContentEntry',
    
    'richtext-youtube': 'RichtextYoutube',
    'RichtextYoutube': 'RichtextYoutube',
    'Richtext Youtube': 'RichtextYoutube',
    
    // Site Config
    'site-config': 'SiteConfig',
    'SiteConfig': 'SiteConfig',
    'Site Config': 'SiteConfig',
    'site_config': 'SiteConfig',
    
    // Headline component
    'Headline': 'Headline',
    'headline': 'Headline',
  };

  // Find the actual component files
  const availableFiles = Object.keys(allComponents);
  console.log('🔍 Available files:', availableFiles);
  
  // Create a mapping of actual file names to components
  const fileToComponent = {};
  availableFiles.forEach(filePath => {
    const fileName = filePath.split('/').pop()?.replace('.vue', '');
    if (fileName) {
      fileToComponent[fileName] = allComponents[filePath].default;
      console.log(`📄 Found component file: ${fileName} -> ${filePath}`);
    }
  });

  // Debug: Log all available files and their components
  console.log('🔍 All available files:', availableFiles);
  console.log('🔍 File to component mapping:', Object.keys(fileToComponent));

  // Register all components
  Object.entries(componentMap).forEach(([storyblokName, fileName]) => {
    const component = fileToComponent[fileName];
    
    if (component) {
      try {
        nuxtApp.vueApp.component(storyblokName, component);
        console.log(`✅ Registered component: ${storyblokName} -> ${fileName}`);
      } catch (error) {
        console.warn(`⚠️ Failed to register component ${storyblokName}:`, error);
      }
    } else {
      console.warn(`⚠️ Component file not found for ${fileName}. Available files:`, Object.keys(fileToComponent));
    }
  });

  // Debug: Check specific components
  console.log('🔍 Debug - Available files:', Object.keys(fileToComponent));
  console.log('🔍 Debug - Herosection in fileToComponent:', !!fileToComponent['Herosection']);
  console.log('🔍 Debug - SiteConfig in fileToComponent:', !!fileToComponent['SiteConfig']);
  
  // Additional debugging for production
  console.log('🔍 Debug - Component registration summary:');
  console.log('🔍 Debug - Total components to register:', Object.keys(componentMap).length);
  console.log('🔍 Debug - Total components found:', Object.keys(fileToComponent).length);
  console.log('🔍 Debug - Hero-related mappings:');
  ['herosection', 'Herosection', 'hero-section', 'hero_section', 'Hero Section', 'Hero', 'hero'].forEach(name => {
    console.log(`🔍 Debug - ${name} -> ${componentMap[name] || 'NOT MAPPED'}`);
  });
  

  
  console.log('🎉 Storyblok component registration complete!');
  
  // Double-check critical components are registered
  setTimeout(() => {
    console.log('🔍 Final component check:');
    console.log('🔍 Herosection available:', !!nuxtApp.vueApp._context.components['herosection']);
    console.log('🔍 SiteConfig available:', !!nuxtApp.vueApp._context.components['site-config']);
    console.log('🔍 Page available:', !!nuxtApp.vueApp._context.components['page']);
  }, 500);
}); 