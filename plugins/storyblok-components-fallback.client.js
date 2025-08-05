import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('🔧 Starting Storyblok fallback component registration...');
  
  // Import components directly
  const storyblokComponents = import.meta.glob('~/storyblok/*.vue', { eager: true });
  
  // Create a mapping of file names to components
  const fileToComponent = {};
  Object.keys(storyblokComponents).forEach(filePath => {
    const fileName = filePath.split('/').pop()?.replace('.vue', '');
    if (fileName) {
      fileToComponent[fileName] = storyblokComponents[filePath].default;
    }
  });

  // Wait a bit longer to ensure main registration is complete
  setTimeout(() => {
    console.log('🔧 Running fallback component registration...');
    
    // Check if critical components are missing and force register them
    const criticalComponents = [
      { name: 'herosection', file: 'Herosection' },
      { name: 'hero-section', file: 'Herosection' },
      { name: 'hero_section', file: 'Herosection' },
      { name: 'hero', file: 'Herosection' },
      { name: 'site-config', file: 'SiteConfig' },
      { name: 'site_config', file: 'SiteConfig' },
      { name: 'page', file: 'Page' },
      { name: 'headline', file: 'Headline' },
      { name: 'Headline', file: 'Headline' }
    ];

    criticalComponents.forEach(({ name, file }) => {
      const isRegistered = !!nuxtApp.vueApp._context.components[name];
      const componentExists = !!fileToComponent[file];
      
      console.log(`🔍 ${name}: registered=${isRegistered}, exists=${componentExists}`);
      
      if (!isRegistered && componentExists) {
        console.log(`🔧 Force registering ${name} -> ${file}`);
        try {
          nuxtApp.vueApp.component(name, fileToComponent[file]);
          console.log(`✅ Successfully registered ${name}`);
        } catch (error) {
          console.warn(`⚠️ Failed to register ${name}:`, error);
        }
      }
    });
    
    console.log('🎉 Fallback component registration complete!');
  }, 1000);
}); 