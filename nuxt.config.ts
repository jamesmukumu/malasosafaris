// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/seo', 'nuxt-easy-lightbox', '@nuxt/icon', 'nuxt-mapbox'],
    css:['~/assets/css/main.css'],
      mapbox: {
    accessToken: 'pk.eyJ1IjoiamFtZXNtdWt1bXUiLCJhIjoiY21sa2w3ZTF6MDdtdjNjcXdndHVleXdidyJ9.ODqU-5qy3bktsPMUyFV4HQ'
  },
  
  app:{
    
    head:{
    titleTemplate:"%s | PJ Safaris",
    link:[
         {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        }
    ]
    }  
  },
  runtimeConfig:{
    public:{
     baseUrl:"https://pjsafarisserver-production.up.railway.app/api"
    },
    db:{
        host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password:process.env.DB_PASS,
      database: process.env.DB_DATABASE
    }
  }
})