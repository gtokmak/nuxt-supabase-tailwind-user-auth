// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss", '@pinia/nuxt', '@vee-validate/nuxt', 'nuxt-snackbar', 'nuxt-icon', 'nuxt-highcharts',],

  supabase: {
    // Options
    redirect: false,
    redirectOptions: {
      
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/register'],
      cookieRedirect: false,
    }
  },
  
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },


  snackbar: {
    duration: 5000,
  },
  buildModules: [
    // Simple usage
    '@nuxtjs/date-fns',

    // With options
    ['@nuxtjs/date-fns', { /* module options */ }]
  ]
  
})