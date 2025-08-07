<script setup>
const props = defineProps({ config: Object });

// Contact information from config
const contactInfo = computed(() => {
  return {
    location: props.config?.content?.contact_location || '📍Allen, Texas',
    phone: props.config?.content?.contact_phone || '📞 (469) 365-9450',
    callToAction: props.config?.content?.contact_call_to_action || '📆 Book a Call Now'
  };
});

// Social media links from config
const socialLinks = computed(() => {
  return {
    linkedin: props.config?.content?.linkedin,
    facebook: props.config?.content?.facebook,
    instagram: props.config?.content?.instagram
  };
});
</script>

<template>
  <footer 
    class="w-full transition-all duration-300"
    :class="[
      props.config?.content?.footer_light 
        ? 'bg-gray-100 text-gray-900' 
        : 'bg-gray-900 text-white'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Footer Headline and Logo -->
        <div class="lg:col-span-2">
          <h2 
            v-if="props.config?.content?.footer_headline"
            class="text-3xl font-bold mb-4"
          >
            {{ props.config.content.footer_headline }}
          </h2>
          <div v-else class="text-3xl font-bold mb-4">
            Let's Build Your Next Winning Campaign
          </div>
          
          <img 
            v-if="props.config?.content?.footer_logo?.filename"
            :src="props.config.content.footer_logo.filename" 
            :alt="props.config.content.footer_logo.alt || 'Footer Logo'"
            class="h-12 w-auto mb-6"
          />
          
          <p class="text-lg opacity-90 mb-6">
            Ready to start your next project? Get in touch and let's create something extraordinary.
          </p>

          <!-- Contact Information -->
          <div class="space-y-2 mb-6">
            <p class="text-sm">{{ contactInfo.location }}</p>
            <p class="text-sm">{{ contactInfo.phone }}</p>
            <p class="text-sm font-semibold">{{ contactInfo.callToAction }}</p>
          </div>

          <!-- Social Media Links -->
          <div class="flex space-x-4">
            <a 
              v-if="socialLinks.linkedin"
              :href="socialLinks.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:opacity-75 transition-opacity"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              v-if="socialLinks.facebook"
              :href="socialLinks.facebook"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:opacity-75 transition-opacity"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              v-if="socialLinks.instagram"
              :href="socialLinks.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:opacity-75 transition-opacity"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.796-1.418-1.947-1.418-3.244s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Get to Know Me Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Get to Know Me</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink 
                to="/about" 
                class="hover:opacity-75 transition-opacity"
              >
                About Me
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/blog" 
                class="hover:opacity-75 transition-opacity"
              >
                Blog
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Learn Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Learn</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink 
                to="/" 
                class="hover:opacity-75 transition-opacity"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/services" 
                class="hover:opacity-75 transition-opacity"
              >
                Services
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/pricing" 
                class="hover:opacity-75 transition-opacity"
              >
                Pricing
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div 
      class="border-t py-6"
      :class="[
        props.config?.content?.footer_light 
          ? 'border-gray-300 bg-gray-200' 
          : 'border-gray-700 bg-gray-800'
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm opacity-75">
            © {{ new Date().getFullYear() }} Valeria Ramirez | Freelance PPC Specialist. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-sm hover:opacity-75 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" class="text-sm hover:opacity-75 transition-opacity">
              Terms of Service
            </a>
            <a href="#" class="text-sm hover:opacity-75 transition-opacity">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>