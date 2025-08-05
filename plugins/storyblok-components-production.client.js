import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('🔧 Starting production Storyblok component registration...');
  
  // Import components directly with multiple patterns to ensure they're found
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

  console.log('📁 Production - Available component paths:', Object.keys(allComponents));
  
  // Create a mapping of actual file names to components
  const fileToComponent = {};
  Object.keys(allComponents).forEach(filePath => {
    const fileName = filePath.split('/').pop()?.replace('.vue', '');
    if (fileName) {
      fileToComponent[fileName] = allComponents[filePath].default;
      console.log(`📄 Production - Found component file: ${fileName} -> ${filePath}`);
    }
  });

  // Critical components that must be registered for production
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

  // Force register critical components
  criticalComponents.forEach(({ name, file }) => {
    const component = fileToComponent[file];
    if (component) {
      try {
        nuxtApp.vueApp.component(name, component);
        console.log(`✅ Production - Registered component: ${name} -> ${file}`);
      } catch (error) {
        console.warn(`⚠️ Production - Failed to register component ${name}:`, error);
      }
    } else {
      console.warn(`⚠️ Production - Component file not found for ${file}. Available files:`, Object.keys(fileToComponent));
    }
  });

  // Double-check registration after a delay
  setTimeout(() => {
    console.log('🔍 Production - Final component check:');
    criticalComponents.forEach(({ name }) => {
      const isRegistered = !!nuxtApp.vueApp._context.components[name];
      console.log(`🔍 Production - ${name}: ${isRegistered ? '✅ Registered' : '❌ Not Found'}`);
      
      // If still not registered, try one more time
      if (!isRegistered && fileToComponent[criticalComponents.find(c => c.name === name)?.file]) {
        console.log(`🔧 Production - Force re-registering ${name}...`);
        try {
          nuxtApp.vueApp.component(name, fileToComponent[criticalComponents.find(c => c.name === name).file]);
          console.log(`✅ Production - Successfully force-registered ${name}`);
        } catch (error) {
          console.warn(`⚠️ Production - Failed to force register ${name}:`, error);
        }
      }
    });
  }, 1000);

  console.log('🎉 Production Storyblok component registration complete!');
}); 