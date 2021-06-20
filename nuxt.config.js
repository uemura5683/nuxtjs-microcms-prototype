require('dotenv').config();
const { API_KEY, GOOGLE_ANALYTICS_ID } = process.env;
export default {
  server: {
    port: 2000, // デフォルト: 2000
    host: '0.0.0.0', // デフォルト: localhost,
    timing: false
  },
  env: {
    API_KEY,
    GOOGLE_ANALYTICS_ID
  },
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || 'フロントエンド うえむーのプロトタイプサイト',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || 'フロントエンドエンジニアのうえむーのプロトタイプのサイトです' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'twitter:card', content: 'summary'},
      { name: 'twitter:creator', content: 'うえむー'},
      { property: 'og:url', content: 'https://nu-blogsite.net/'},
      { property: 'og:title', content: 'フロントエンド うえむーのプロトタイプサイト'},
      { property: 'og:description', content: 'フロントエンドエンジニアのうえむーのプロトタイプのサイトです'},
      { property: 'og:image', content: 'https://nu-blogsite.net/twitter_logo.png'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap'},
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // プロジェクト内の SCSS ファイル
    '@/assets/css/foundation/reset.scss',
    '@/assets/css/layout/header.scss',
    '@/assets/css/layout/footer.scss',
    '@/assets/css/component/nav.scss',
    '@/assets/css/component/part.scss',
    '@/assets/css/page/inquiry.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/common.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [  
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js modules
  */
  modules: [
    // パッケージの名前を使用する
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics'  
  ],
  /*
  * google analytics
  **/
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
