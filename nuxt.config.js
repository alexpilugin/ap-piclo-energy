const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  ssr: true, //Server Side Rendering
  target: 'server',
  ssrLog: true,
  telemetry: false, /* ignore the Nuxt.js starting question */
  dev: process.env.NODE_ENV !== 'production',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxt/http',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ]
  ],
  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api',
  },
  //issue: Nuxt is really slow: https://github.com/nuxt/nuxt.js/issues/6508
  vueMeta: {
    debounceWait: 250
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green,
          notverified: colors.blue.darken4,
          notverifiedsuccess: colors.green.darken3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    parallel: true,
    cache: true,
    transpile: ['vue-intersect'],
    buildDir: '.nuxt',
    publicPath: '/assets/',
    //https://github.com/nuxt/nuxt.js/issues/3828#issuecomment-508428611
    filenames: {
      app: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js'
    },
    babel: {
      presets({ isServer }) {
        let targets = isServer ? { node: '10' } : { ie: '11' }
        return [
          [require.resolve('@nuxt/babel-preset-app'),
          {
            // targets
            buildTarget: isServer ? 'server' : 'client',
            corejs: { version: 3 }
          }
          ]
        ]
      },
      'env': {
        'production': {
          'plugins': []
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
