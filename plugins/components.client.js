import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  // Manually register Storyblok components
  const storyblokComponents = import.meta.glob('~/storyblok/*.vue', { eager: true });

  console.log('Available Storyblok components:', Object.keys(storyblokComponents));

  Object.entries(storyblokComponents).forEach(([path, component]) => {
    const componentName = path.split('/').pop().replace('.vue', '');
    console.log('Registering component:', componentName, 'from path:', path);
    nuxtApp.vueApp.component(componentName, component.default);
  });
});
