<script setup>
const props = defineProps({ config: Object });

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Navigation items from the config
const navigationItems = computed(() => {
  if (props.config?.content?.header_nav) {
    return props.config.content.header_nav;
  }
  // Fallback navigation
  return [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Pricing', url: '/pricing' },
    { name: 'About Me', url: '/about' },
    { name: 'Blog', url: '/blog' }
  ];
});
</script>

<template>
  <nav 
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="[
      props.config?.content?.header_light 
        ? 'bg-white text-gray-900 shadow-md' 
        : 'bg-gray-900 text-white'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <img 
              v-if="props.config?.content?.header_logo?.filename"
              :src="props.config.content.header_logo.filename" 
              :alt="props.config.content.header_logo.alt || 'Logo'"
              class="h-8 w-auto"
            />
            <span v-else class="text-xl font-bold">Valeria Ramirez</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLink 
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.url" 
              class="px-3 py-2 rounded-md text-sm font-medium hover:opacity-75 transition-opacity"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Desktop Contact Button -->
        <div class="hidden md:block">
          <button 
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            :class="[
              props.config?.content?.header_light 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
            ]"
          >
            Get in Touch
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md hover:opacity-75 transition-opacity"
          >
            <svg 
              class="h-6 w-6" 
              :class="{ 'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen }"
              stroke="currentColor" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              class="h-6 w-6" 
              :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }"
              stroke="currentColor" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div 
      class="md:hidden"
      :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t"
           :class="[
             props.config?.content?.header_light 
               ? 'border-gray-200 bg-white' 
               : 'border-gray-700 bg-gray-900'
           ]"
      >
        <NuxtLink 
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.url" 
          class="block px-3 py-2 rounded-md text-base font-medium hover:opacity-75 transition-opacity"
          @click="isMobileMenuOpen = false"
        >
          {{ item.name }}
        </NuxtLink>
        <button 
          class="w-full text-left block px-3 py-2 rounded-md text-base font-medium transition-colors"
          :class="[
            props.config?.content?.header_light 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-white text-gray-900 hover:bg-gray-100'
          ]"
        >
          Get in Touch
        </button>
      </div>
    </div>
  </nav>
</template>