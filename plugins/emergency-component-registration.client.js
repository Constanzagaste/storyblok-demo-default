import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('🚨 Starting emergency component registration...');
  
  // Wait for components to be available on window
  setTimeout(() => {
    if (process.client && window.__storyblokComponents) {
      console.log('🔧 Emergency registration using window.__storyblokComponents');
      
      const components = window.__storyblokComponents;
      
      // Register components with the exact names Storyblok expects
      const emergencyMappings = [
        { storyblokName: 'hero-section', componentName: 'HeroSection' },
        { storyblokName: 'hero_section', componentName: 'HeroSection' },
        { storyblokName: 'hero', componentName: 'HeroSection' },
        { storyblokName: 'herosection', componentName: 'HeroSection' },
        { storyblokName: 'site-config', componentName: 'SiteConfig' },
        { storyblokName: 'site_config', componentName: 'SiteConfig' },
        { storyblokName: 'page', componentName: 'Page' },
        { storyblokName: 'headline', componentName: 'Headline' },
        { storyblokName: 'Headline', componentName: 'Headline' }
      ];
      
      emergencyMappings.forEach(({ storyblokName, componentName }) => {
        const component = components[componentName];
        if (component) {
          try {
            nuxtApp.vueApp.component(storyblokName, component);
            console.log(`🚨 Emergency - Registered ${storyblokName} -> ${componentName}`);
          } catch (error) {
            console.warn(`⚠️ Emergency - Failed to register ${storyblokName}:`, error);
          }
        } else {
          console.warn(`⚠️ Emergency - Component ${componentName} not found in window.__storyblokComponents`);
        }
      });
      
      // Also register all components with their original names
      Object.keys(components).forEach(componentName => {
        const component = components[componentName];
        try {
          nuxtApp.vueApp.component(componentName, component);
          console.log(`🚨 Emergency - Registered ${componentName} -> ${componentName}`);
        } catch (error) {
          console.warn(`⚠️ Emergency - Failed to register ${componentName}:`, error);
        }
      });
      
      console.log('🎉 Emergency component registration complete!');
    } else {
      console.warn('⚠️ Emergency - window.__storyblokComponents not available');
    }
  }, 2000); // Wait 2 seconds for other plugins to finish
}); 