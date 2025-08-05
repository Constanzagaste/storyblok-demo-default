import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('🔧 Starting global component registration...');
  
  // Import all Storyblok components
  const storyblokComponents = import.meta.glob('~/storyblok/*.vue', { eager: true });
  
  // Create a mapping of file names to components
  const fileToComponent = {};
  Object.keys(storyblokComponents).forEach(filePath => {
    const fileName = filePath.split('/').pop()?.replace('.vue', '');
    if (fileName) {
      fileToComponent[fileName] = storyblokComponents[filePath].default;
    }
  });

  // Register critical components globally
  const criticalComponents = [
    { name: 'hero-section', file: 'Herosection' },
    { name: 'hero_section', file: 'Herosection' },
    { name: 'hero', file: 'Herosection' },
    { name: 'herosection', file: 'Herosection' },
    { name: 'site-config', file: 'SiteConfig' },
    { name: 'site_config', file: 'SiteConfig' },
    { name: 'page', file: 'Page' },
    { name: 'headline', file: 'Headline' },
    { name: 'Headline', file: 'Headline' }
  ];

  criticalComponents.forEach(({ name, file }) => {
    const component = fileToComponent[file];
    if (component) {
      try {
        // Register globally
        nuxtApp.vueApp.component(name, component);
        console.log(`✅ Global - Registered component: ${name} -> ${file}`);
      } catch (error) {
        console.warn(`⚠️ Global - Failed to register component ${name}:`, error);
      }
    }
  });

  // Also register on the global window object for emergency access
  if (process.client) {
    window.__storyblokComponents = fileToComponent;
    console.log('🔧 Global components available on window.__storyblokComponents');
  }

  console.log('🎉 Global component registration complete!');
}); 