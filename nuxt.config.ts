// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  colorMode:{
preference: 'light',
  fallback: 'light'
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/seo',
    'nuxt-easy-lightbox',
    '@nuxt/icon',
    'nuxt-mapbox',
    '@nuxtjs/sitemap',
    "@vercel/analytics",
    "@vercel/speed-insights",
    '@nuxtjs/leaflet',
    `@twicpics/components/nuxt3`,
    "@nuxt/fonts"
  ],
  twicpics:{
  domain:"https://pjsafaris.twic.pics"
  },
    css:['~/assets/css/main.css'],
      mapbox: {
    accessToken: 'pk.eyJ1IjoiamFtZXNtdWt1bXUiLCJhIjoiY21sa2w3ZTF6MDdtdjNjcXdndHVleXdidyJ9.ODqU-5qy3bktsPMUyFV4HQ'
  },
  sitemap:{
autoLastmod:true,
sources:[
  "/api/sitemaps"
]

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
    },
    cld:{
    name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
    }
  }
})