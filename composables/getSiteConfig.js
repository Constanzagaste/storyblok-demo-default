export default function () {
  return async () => {
    const getFolderPathFn = getFolderPath();
    const getReleaseIdFn = getReleaseId();
    const getVersionFn = getVersion();
    
    const folderPathTest = await getFolderPathFn();
    const releaseId = await getReleaseIdFn();
    const siteConfig = ref(null);

    // Check if we're in a browser context before using useStoryblokApi
    if (!process.client) {
      // During SSR, return a fallback site config
      siteConfig.value = {
        id: 'fallback-site-config',
        content: {
          use_custom_fonts: false,
          use_custom_colors: false,
          disable_rounded_corners: false,
          colored_headlines: false,
          header_logo: null,
          header_nav: [],
          header_buttons: [],
          header_light: false,
          footer_headline: '',
          footer_text_color: '',
          footer_light: false,
          footer_decoration: null,
          footer_logo: null,
          footer_about: '',
          footer_nav_1_headline: '',
          footer_nav_2_headline: '',
          footer_nav_3_headline: '',
          footer_nav_1: [],
          footer_nav_2: [],
          footer_nav_3: [],
          x: '',
          instagram: '',
          youtube: '',
          facebook: '',
        },
      };
      return siteConfig;
    }

    try {
      const storyblokApi = useStoryblokApi();

      if (!storyblokApi) {
        console.warn('Storyblok API not available. Using fallback site config.');
        // Create a fallback site config to prevent null errors
        siteConfig.value = {
          id: 'fallback-site-config',
          content: {
            use_custom_fonts: false,
            use_custom_colors: false,
            disable_rounded_corners: false,
            colored_headlines: false,
            header_logo: null,
            header_nav: [],
            header_buttons: [],
            header_light: false,
            footer_headline: '',
            footer_text_color: '',
            footer_light: false,
            footer_decoration: null,
            footer_logo: null,
            footer_about: '',
            footer_nav_1_headline: '',
            footer_nav_2_headline: '',
            footer_nav_3_headline: '',
            footer_nav_1: [],
            footer_nav_2: [],
            footer_nav_3: [],
            x: '',
            instagram: '',
            youtube: '',
            facebook: '',
          },
        };
        return siteConfig;
      }

      const nestedSiteConfig = ref(false);

      const apiParams = {
        version: getVersionFn(),
        resolve_links: 'url',
        from_release: releaseId,
      };

      if (folderPathTest) {
        try {
          const { data } = await storyblokApi.get(
            `cdn/stories/${folderPathTest}/site-config`,
            apiParams,
          );

          if (data && data.story) {
            siteConfig.value = data.story;
            nestedSiteConfig.value = true;
          }
          else {
            console.warn('Nested site-config not found');
          }
        }
        catch (err) {
          console.warn('Error fetching nested site-config:', err.message);
        }
      }

      if (!nestedSiteConfig.value) {
        try {
          const { data } = await storyblokApi.get(
            'cdn/stories/site-config',
            apiParams,
          );

          if (data && data.story) {
            siteConfig.value = data.story;
          }
          else {
            console.warn('Default site-config not found - creating fallback');
            // Create a fallback site config to prevent null errors
            siteConfig.value = {
              id: 'fallback-site-config',
              content: {
                use_custom_fonts: false,
                use_custom_colors: false,
                disable_rounded_corners: false,
                colored_headlines: false,
                header_logo: null,
                header_nav: [],
                header_buttons: [],
                header_light: false,
                footer_headline: '',
                footer_text_color: '',
                footer_light: false,
                footer_decoration: null,
                footer_logo: null,
                footer_about: '',
                footer_nav_1_headline: '',
                footer_nav_2_headline: '',
                footer_nav_3_headline: '',
                footer_nav_1: [],
                footer_nav_2: [],
                footer_nav_3: [],
                x: '',
                instagram: '',
                youtube: '',
                facebook: '',
              },
            };
          }
        }
        catch (err) {
          console.warn('Error fetching default site config - creating fallback:', err.message);
          // Create a fallback site config to prevent null errors
          siteConfig.value = {
            id: 'fallback-site-config',
            content: {
              use_custom_fonts: false,
              use_custom_colors: false,
              disable_rounded_corners: false,
              colored_headlines: false,
              header_logo: null,
              header_nav: [],
              header_buttons: [],
              header_light: false,
              footer_headline: '',
              footer_text_color: '',
              footer_light: false,
              footer_decoration: null,
              footer_logo: null,
              footer_about: '',
              footer_nav_1_headline: '',
              footer_nav_2_headline: '',
              footer_nav_3_headline: '',
              footer_nav_1: [],
              footer_nav_2: [],
              footer_nav_3: [],
              x: '',
              instagram: '',
              youtube: '',
              facebook: '',
            },
          };
        }
      }
    }
    catch (err) {
      console.error('Error fetching site config:', err.message);
      // Create a fallback site config to prevent null errors
      siteConfig.value = {
        id: 'fallback-site-config',
        content: {
          use_custom_fonts: false,
          use_custom_colors: false,
          disable_rounded_corners: false,
          colored_headlines: false,
          header_logo: null,
          header_nav: [],
          header_buttons: [],
          header_light: false,
          footer_headline: '',
          footer_text_color: '',
          footer_light: false,
          footer_decoration: null,
          footer_logo: null,
          footer_about: '',
          footer_nav_1_headline: '',
          footer_nav_2_headline: '',
          footer_nav_3_headline: '',
          footer_nav_1: [],
          footer_nav_2: [],
          footer_nav_3: [],
          x: '',
          instagram: '',
          youtube: '',
          facebook: '',
        },
      };
    }

    return siteConfig;
  };
}
