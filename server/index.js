const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()



// Require API routes
const test = require('../api/routes/test')
const bids = require('../api/routes/bids')
const buyers = require('../api/routes/buyers')
const competitions = require('../api/routes/competitions')
const sellers = require('../api/routes/sellers')

const apiRoute = '/api'
// Import API Routes
app.use(apiRoute, test)
app.use(apiRoute, bids)
app.use(apiRoute, buyers)
app.use(apiRoute, competitions)
app.use(apiRoute, sellers)

app.use(express.json())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
